import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { profile as baseProfile } from '../data/profile';
import { projects as baseProjects } from '../data/projects';
import type { Profile, Project } from '../types';
import { readJson, removeStorage, writeStorage } from './storage';

/**
 * Content = data files (src/data) + optional local edits made on /#/edit.
 * Local edits live only in this browser's localStorage; the data files stay the source of truth.
 */
const STORAGE_KEY = 'mza-content-edits-v1';

export type EditableProfile = Pick<
  Profile,
  'name' | 'headline' | 'valueStatement' | 'about' | 'location' | 'badge' | 'phoneDisplay'
> & { email: string; github: string; linkedin: string; whatsapp: string };

export type EditableProject = Pick<
  Project,
  | 'title'
  | 'tagline'
  | 'category'
  | 'featured'
  | 'status'
  | 'period'
  | 'problem'
  | 'solution'
  | 'features'
  | 'tech'
  | 'role'
  | 'results'
  | 'githubUrl'
  | 'liveUrl'
  | 'demoVideoUrl'
>;

export interface ContentEdits {
  profile?: Partial<EditableProfile>;
  projects?: Record<string, Partial<EditableProject>>;
}

interface ContentValue {
  profile: Profile;
  projects: Project[];
  edits: ContentEdits;
  storageAvailable: boolean;
  hasEdits: boolean;
  updateProfile: (patch: Partial<EditableProfile>) => void;
  updateProject: (id: string, patch: Partial<EditableProject>) => void;
  resetEdits: () => void;
}

const ContentContext = createContext<ContentValue | null>(null);

function applyProfile(edits: ContentEdits): Profile {
  const p = edits.profile;
  if (!p) return baseProfile;
  const { email, github, linkedin, whatsapp, ...rest } = p;
  return {
    ...baseProfile,
    ...rest,
    socials: {
      ...baseProfile.socials,
      ...(email !== undefined && { email }),
      ...(github !== undefined && { github }),
      ...(linkedin !== undefined && { linkedin }),
      ...(whatsapp !== undefined && { whatsapp }),
    },
  };
}

function applyProjects(edits: ContentEdits): Project[] {
  const list = baseProjects.map((project) => ({ ...project, ...(edits.projects?.[project.id] ?? {}) }));
  // Featured project always comes first, then the original order.
  return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
}

function probeStorage(): boolean {
  const ok = writeStorage('mza-probe', '1');
  removeStorage('mza-probe');
  return ok;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [edits, setEdits] = useState<ContentEdits>(() => readJson<ContentEdits>(STORAGE_KEY, {}));
  const [storageAvailable] = useState(probeStorage);

  useEffect(() => {
    if (!edits.profile && !edits.projects) {
      removeStorage(STORAGE_KEY);
      return;
    }
    writeStorage(STORAGE_KEY, JSON.stringify(edits));
  }, [edits]);

  const updateProfile = useCallback((patch: Partial<EditableProfile>) => {
    setEdits((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }, []);

  const updateProject = useCallback((id: string, patch: Partial<EditableProject>) => {
    setEdits((prev) => ({
      ...prev,
      projects: { ...prev.projects, [id]: { ...prev.projects?.[id], ...patch } },
    }));
  }, []);

  const resetEdits = useCallback(() => setEdits({}), []);

  const value = useMemo<ContentValue>(
    () => ({
      profile: applyProfile(edits),
      projects: applyProjects(edits),
      edits,
      storageAvailable,
      hasEdits: Boolean(edits.profile || edits.projects),
      updateProfile,
      updateProject,
      resetEdits,
    }),
    [edits, storageAvailable, updateProfile, updateProject, resetEdits],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}
