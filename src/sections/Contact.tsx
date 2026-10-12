import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MessageCircle, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Highlight } from '../components/Highlight';
import { Reveal } from '../components/Reveal';
import { useContent } from '../lib/content';

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers/contexts without the async clipboard API.
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand('copy');
      el.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/** "https://www.linkedin.com/in/name/" -> "linkedin.com/in/name" */
function shortUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '');
}

function ChannelCard({ href, icon: Icon, label, value }: { href: string; icon: LucideIcon; label: string; value: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-20 items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-200 hover:border-lime/60 hover:bg-white/10"
    >
      <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime text-ink">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-white/70">{label}</span>
        <span className="block truncate font-semibold text-white">{value}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-white/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Contact() {
  const { profile } = useContent();
  const { email, linkedin, github, whatsapp } = profile.socials;
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const t = window.setTimeout(() => setStatus('idle'), 2500);
    return () => window.clearTimeout(t);
  }, [status]);

  const onCopy = async () => setStatus((await copyText(email)) ? 'copied' : 'failed');

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white ring-1 ring-transparent sm:p-10 lg:p-14 dark:bg-surface dark:ring-line">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime/20 blur-3xl" />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-lime" /> Contact
                </p>
                <h2 id="contact-title" className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
                  <Highlight text="Let's connect & build something *smart*" />
                </h2>
                <p className="mt-5 max-w-md text-base text-white/80 sm:text-lg">
                  Building something with AI agents, automation or machine learning? Email is the fastest way to reach me.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4" /> Email me
                  </a>
                  <button
                    type="button"
                    onClick={onCopy}
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:border-lime"
                  >
                    {status === 'copied' ? <Check aria-hidden="true" className="h-4 w-4 text-lime" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                    {status === 'copied' ? 'Copied!' : 'Copy email'}
                  </button>
                </div>
                <p className="mt-3 break-all text-sm text-white/70">{email}</p>
                <p role="status" aria-live="polite" className="sr-only">
                  {status === 'copied' ? 'Email address copied to clipboard' : status === 'failed' ? 'Could not copy. The email address is shown on the page.' : ''}
                </p>
                {status === 'failed' && <p className="mt-2 text-sm text-lime">Couldn&apos;t copy automatically. Please copy the address above.</p>}
              </div>

              <div className="grid grid-cols-1 gap-3">
                <ChannelCard href={linkedin} icon={Linkedin} label="LinkedIn" value={shortUrl(linkedin)} />
                <ChannelCard href={github} icon={Github} label="GitHub" value={shortUrl(github)} />
                {whatsapp && (
                  <ChannelCard href={`https://wa.me/${whatsapp}`} icon={MessageCircle} label="WhatsApp" value={profile.phoneDisplay} />
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
