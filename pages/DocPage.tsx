import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DOCS_CONTENT, SIDEBAR_NAV } from '../constants';

interface CodeBlockProps {
  code: string;
  lang: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang }) => {
  const [copied, setCopied] = useState(false);
  const normalizedCode = code
    .trim()
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(normalizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TOKEN_REGEX =
    /\b(fun|class|interface|val|var|private|public|override|import|package|suspend|return|async|launch|span)\b|\b(true|false|null)\b|(\/\/.*)|("[^"]*")|(@[a-zA-Z]+)/g;

  const getSegmentNode = (type: string, text: string, key: string): React.ReactNode => {
    if (type === 'keyword') return <span key={key} className="text-violet-400 font-bold">{text}</span>;
    if (type === 'literal') return <span key={key} className="text-amber-300">{text}</span>;
    if (type === 'comment') return <span key={key} className="text-slate-500 italic">{text}</span>;
    if (type === 'string') return <span key={key} className="text-emerald-400">{text}</span>;
    if (type === 'annotation') return <span key={key} className="text-fuchsia-400">{text}</span>;
    return text;
  };

  const highlightLine = (line: string): React.ReactNode[] => {
    const segments: React.ReactNode[] = [];
    let lastEnd = 0;
    let keyIdx = 0;
    for (const m of line.matchAll(TOKEN_REGEX)) {
      if (m.index! > lastEnd) {
        segments.push(line.slice(lastEnd, m.index!));
      }
      const type = m[1] ? 'keyword' : m[2] ? 'literal' : m[3] ? 'comment' : m[4] ? 'string' : 'annotation';
      segments.push(getSegmentNode(type, m[0], `t-${keyIdx++}`));
      lastEnd = m.index! + m[0].length;
    }
    if (lastEnd < line.length) {
      segments.push(line.slice(lastEnd));
    }
    return segments;
  };

  const highlight = (text: string) => {
    return text.split('\n').map((line, i) => (
      <div key={i} className="whitespace-pre min-h-[1.25rem]">
        {line ? highlightLine(line) : ' '}
      </div>
    ));
  };

  return (
    <div className="group relative my-10 overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0f172a] shadow-2xl">
      <div className="flex items-center justify-between bg-slate-800/60 px-6 py-3 border-b border-slate-700/80">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{lang || 'code'}</span>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-violet-300 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-6 sm:p-8 font-mono text-[13px] sm:text-sm leading-relaxed overflow-x-auto custom-scrollbar text-slate-300">
        {highlight(normalizedCode)}
      </div>
    </div>
  );
};

/** Build URL-safe id from heading text (strip markdown, lowercase, hyphenate). */
function headingToId(raw: string): string {
  const t = raw
    .replace(/^#+\s*/, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`[^`]*`/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return t || 'section';
}

/** Extract TOC entries (H2, H3) from markdown. */
function getTocFromMarkdown(md: string): { level: 2 | 3; text: string; id: string }[] {
  const entries: { level: 2 | 3; text: string; id: string }[] = [];
  const seen = new Map<string, number>();
  for (const line of md.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^##\s+/, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`[^`]*`/g, '').trim();
      let id = headingToId(trimmed);
      const count = (seen.get(id) ?? 0) + 1;
      seen.set(id, count);
      if (count > 1) id = `${id}-${count}`;
      entries.push({ level: 2, text, id });
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^###\s+/, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`[^`]*`/g, '').trim();
      let id = headingToId(trimmed);
      const count = (seen.get(id) ?? 0) + 1;
      seen.set(id, count);
      if (count > 1) id = `${id}-${count}`;
      entries.push({ level: 3, text, id });
    }
  }
  return entries;
}

/** Renders one segment (no **bold**): `code`, [links], images. Pushes to out and uses keyPrefix/keyIdx. */
function processSegment(
  segment: string,
  keyPrefix: string,
  keyIdxRef: { current: number },
  out: React.ReactNode[],
  allowBold: boolean
) {
  const parts = segment.split(/(`[^`]*`)/g);
  const push = (node: React.ReactNode) => {
    out.push(node);
    keyIdxRef.current += 1;
  };
  const k = () => `${keyPrefix}-${keyIdxRef.current}`;

  parts.forEach((part) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      push(
        <code key={k()} className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-sm sm:text-base font-mono font-bold">
          {part.slice(1, -1)}
        </code>
      );
      return;
    }

    const linkedImageRegex = /\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;

    const linkedImgMatches: { index: number; length: number; alt: string; imgUrl: string; linkUrl: string }[] = [];
    const linkMatches: { index: number; length: number; text: string; url: string }[] = [];
    const imageMatches: { index: number; length: number; alt: string; src: string }[] = [];
    const boldMatches: { index: number; length: number; inner: string }[] = [];
    let m;
    while ((m = linkedImageRegex.exec(part)) !== null) {
      linkedImgMatches.push({ index: m.index, length: m[0].length, alt: m[1], imgUrl: m[2], linkUrl: m[3] });
    }
    while ((m = linkRegex.exec(part)) !== null) {
      if (!linkedImgMatches.some(li => li.index <= m!.index && m!.index < li.index + li.length)) {
        linkMatches.push({ index: m.index, length: m[0].length, text: m[1], url: m[2] });
      }
    }
    while ((m = imageRegex.exec(part)) !== null) {
      if (!linkedImgMatches.some(li => li.index <= m!.index && m!.index < li.index + li.length)) {
        imageMatches.push({ index: m.index, length: m[0].length, alt: m[1], src: m[2] });
      }
    }
    if (allowBold) {
      while ((m = boldRegex.exec(part)) !== null) {
        boldMatches.push({ index: m.index, length: m[0].length, inner: m[1] });
      }
    }

    type InlineEv =
      | { type: 'linkedImage'; index: number; length: number; alt: string; imgUrl: string; linkUrl: string }
      | { type: 'link'; index: number; length: number; text: string; url: string }
      | { type: 'image'; index: number; length: number; alt: string; src: string }
      | { type: 'bold'; index: number; length: number; inner: string };
    const sorted: InlineEv[] = [
      ...linkedImgMatches.map((x) => ({ type: 'linkedImage' as const, ...x })),
      ...linkMatches.map((x) => ({ type: 'link' as const, ...x })),
      ...imageMatches.map((x) => ({ type: 'image' as const, ...x })),
      ...boldMatches.map((x) => ({ type: 'bold' as const, ...x })),
    ].sort((a, b) => a.index - b.index);

    let lastEnd = 0;
    for (const ev of sorted) {
      if (ev.index < lastEnd) continue;
      if (ev.index > lastEnd) out.push(part.slice(lastEnd, ev.index));
      if (ev.type === 'linkedImage') {
        const img = <img src={ev.imgUrl} alt={ev.alt} className="inline-block h-6 align-middle" />;
        if (ev.linkUrl.startsWith('http')) {
          push(
            <a key={k()} href={ev.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex align-middle mr-2">
              {img}
            </a>
          );
        } else {
          push(
            <Link key={k()} to={ev.linkUrl} className="inline-flex align-middle mr-2">
              {img}
            </Link>
          );
        }
      } else if (ev.type === 'link') {
        if (ev.url.startsWith('http')) {
          push(
            <a key={k()} href={ev.url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline hover:no-underline">
              {ev.text}
            </a>
          );
        } else {
          push(
            <Link key={k()} to={ev.url} className="text-primary font-bold underline hover:no-underline">
              {ev.text}
            </Link>
          );
        }
      } else if (ev.type === 'image') {
        push(
          <img key={k()} src={ev.src} alt={ev.alt} className="inline-block h-6 align-middle" />
        );
      } else {
        push(
          <strong key={k()} className="font-bold text-slate-900 dark:text-white">
            {ev.inner}
          </strong>
        );
      }
      lastEnd = ev.index + ev.length;
    }
    if (lastEnd < part.length) out.push(part.slice(lastEnd));
  });
}

/** Parses inline markdown: **bold**, `code`, and [text](url). Bold is processed first so **`code`** and **text** both render as bold. */
const processInlineMarkdown = (text: string, keyPrefix: string): React.ReactNode[] => {
  const segments: React.ReactNode[] = [];
  const keyIdxRef = { current: 0 };

  const boldParts = text.split(/\*\*/);
  for (let i = 0; i < boldParts.length; i++) {
    if (i % 2 === 1) {
      const inner: React.ReactNode[] = [];
      processSegment(boldParts[i], keyPrefix, keyIdxRef, inner, false);
      segments.push(
        <strong key={`${keyPrefix}-${keyIdxRef.current++}`} className="font-bold text-slate-900 dark:text-white">
          {inner}
        </strong>
      );
    } else {
      processSegment(boldParts[i], keyPrefix, keyIdxRef, segments, true);
    }
  }
  return segments;
};

const DocPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');

  const allPages = SIDEBAR_NAV.flatMap(section => section.items);
  const currentPage = slug ? allPages.find(p => p.path === slug) : null;
  const pageTitle = currentPage?.title ?? (slug ?? '').replace(/-/g, ' ');
  const currentIndex = allPages.findIndex(page => page.path === slug);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const tocEntries = useMemo(() => getTocFromMarkdown(content), [content]);

  useEffect(() => {
    if (slug && DOCS_CONTENT[slug]) {
      setContent(DOCS_CONTENT[slug]);
    } else {
      setContent("# Not Found\nSorry, this page doesn't exist yet.");
    }
    window.scrollTo(0, 0);
  }, [slug]);

  const renderContent = (md: string) => {
    const blocks: React.ReactNode[] = [];
    const lines = md.split('\n');
    let i = 0;
    let tocIndex = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.trim().startsWith('```')) {
        const lang = line.replace(/^```\s*/, '').trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        const code = codeLines.join('\n').trim();
        blocks.push(<CodeBlock key={i} code={code} lang={lang} />);
        i++;
        continue;
      }

      if (line.startsWith('# ')) {
        blocks.push(<h1 key={i} className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mt-12 mb-10 tracking-tighter leading-tight">{processInlineMarkdown(line.replace('# ', ''), `h1-${i}`)}</h1>);
      } else if (line.startsWith('## ')) {
        const entry = tocEntries[tocIndex++];
        const id = entry?.id ?? headingToId(line);
        blocks.push(
          <h2 key={i} id={id} className="text-3xl font-black text-slate-900 dark:text-white mt-20 mb-8 tracking-tight flex items-center gap-4 scroll-mt-24">
            <span className="h-10 w-2 rounded-full bg-primary shadow-sm shadow-primary/40 shrink-0" aria-hidden />
            <span className="min-w-0">{processInlineMarkdown(line.replace('## ', ''), `h2-${i}`)}</span>
            <a href={`#${id}`} className="heading-anchor shrink-0" aria-label={`Link to section: ${entry?.text ?? id}`}>#</a>
          </h2>
        );
      } else if (line.startsWith('### ')) {
        const entry = tocEntries[tocIndex++];
        const id = entry?.id ?? headingToId(line);
        blocks.push(
          <h3 key={i} id={id} className="text-2xl font-bold text-slate-900 dark:text-white mt-14 mb-6 flex items-center gap-3 scroll-mt-24">
            <span className="min-w-0">{processInlineMarkdown(line.replace('### ', ''), `h3-${i}`)}</span>
            <a href={`#${id}`} className="heading-anchor shrink-0" aria-label={`Link to section: ${entry?.text ?? id}`}>#</a>
          </h3>
        );
      }
      else if (line.startsWith('|')) {
        if (!lines[i-1]?.startsWith('|')) {
          const tableRows = [];
          while (i < lines.length && lines[i].startsWith('|')) {
            if (!lines[i].includes('---')) {
              const cells = lines[i].split('|').filter(c => c.trim()).map(c => c.trim());
              tableRows.push(cells);
            }
            i++;
          }
          blocks.push(
            <div key={i} className="my-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-xl shadow-slate-200/20 dark:shadow-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    {tableRows[0]?.map((cell, ci) => (
                      <th key={ci} className="p-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{processInlineMarkdown(cell, `th-${i}-${ci}`)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {tableRows.slice(1).map((row, ri) => (
                    <tr key={ri} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      {row.map((cell, ci) => (
                        <td key={ci} className={`p-5 text-base ${ci === 0 ? 'font-black text-primary italic' : 'text-slate-600 dark:text-slate-400 font-medium'}`}>
                          {processInlineMarkdown(cell, `cell-${ri}-${ci}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue; 
        }
      }
      else if (line.trim().startsWith('- ')) {
        blocks.push(
          <li key={i} className="ml-8 list-none relative text-slate-600 dark:text-slate-300 text-lg sm:text-xl mb-4 pl-8 before:content-[''] before:absolute before:left-0 before:top-3.5 before:size-2.5 before:bg-primary/20 before:border-2 before:border-primary before:rounded-full">
            {processInlineMarkdown(line.replace(/^\s*-\s+/, ''), `li-${i}`)}
          </li>
        );
      }
      else if (line.trim() !== '') {
        blocks.push(<p key={i} className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl leading-relaxed font-medium mb-8">{processInlineMarkdown(line, `p-${i}`)}</p>);
      }

      i++;
    }

    return blocks;
  };

  return (
    <div className="w-full max-w-[var(--docs-content-max,80rem)] mx-auto px-6 py-16 sm:px-10 lg:px-16 animate-in fade-in slide-in-from-bottom-6 duration-700 flex flex-col lg:flex-row gap-12 lg:gap-16">
      {/* Main column: breadcrumb + prose */}
      <div className="min-w-0 flex-1">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[16px] text-slate-300" aria-hidden>chevron_right</span>
          <Link to="/docs/introduction" className="hover:text-primary transition-colors">Docs</Link>
          <span className="material-symbols-outlined text-[16px] text-slate-300" aria-hidden>chevron_right</span>
          <span className="text-slate-900 dark:text-white truncate" aria-current="page">{pageTitle}</span>
        </nav>

        <article className="prose-doc prose dark:prose-invert max-w-none">
          {renderContent(content)}
        </article>

        <footer className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-10">
          {prevPage ? (
            <Link to={`/docs/${prevPage.path}`} className="group flex flex-col gap-3 text-left flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span> Previous
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{prevPage.title}</span>
            </Link>
          ) : (
            <div className="flex-1 hidden sm:block" />
          )}
          {nextPage ? (
            <Link to={`/docs/${nextPage.path}`} className="group flex flex-col gap-3 items-end text-right flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 group-hover:text-primary transition-colors">
                Next <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{nextPage.title}</span>
            </Link>
          ) : (
            <div className="flex-1 hidden sm:block" />
          )}
        </footer>
      </div>

      {/* On this page — sticky TOC */}
      {tocEntries.length > 0 && (
        <aside
          className="hidden xl:block w-56 shrink-0"
          aria-label="On this page"
        >
          <div className="sticky top-24">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">On this page</p>
            <nav className="flex flex-col gap-1.5 custom-scrollbar max-h-[calc(100vh-10rem)] overflow-y-auto">
              {tocEntries.map((entry) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className={`text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3 -ml-px`}
                  style={entry.level === 3 ? { paddingLeft: '1.25rem' } : undefined}
                >
                  {entry.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DocPage;
