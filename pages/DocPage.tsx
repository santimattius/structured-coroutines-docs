import React, { useEffect, useState } from 'react';
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

/** Parses inline markdown: **bold** and `code`, returns React nodes. */
const processInlineMarkdown = (text: string, keyPrefix: string): React.ReactNode[] => {
  const segments: React.ReactNode[] = [];
  let keyIdx = 0;
  const parts = text.split(/(`[^`]*`)/g);
  parts.forEach((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      segments.push(<code key={`${keyPrefix}-${keyIdx++}`} className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-sm sm:text-base font-mono font-bold">{part.slice(1, -1)}</code>);
      return;
    }
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastEnd = 0;
    let m;
    while ((m = boldRegex.exec(part)) !== null) {
      if (m.index > lastEnd) segments.push(part.slice(lastEnd, m.index));
      segments.push(<strong key={`${keyPrefix}-${keyIdx++}`} className="font-bold text-slate-900 dark:text-white">{m[1]}</strong>);
      lastEnd = boldRegex.lastIndex;
    }
    if (lastEnd < part.length) segments.push(part.slice(lastEnd));
  });
  return segments;
};

const DocPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');

  const allPages = SIDEBAR_NAV.flatMap(section => section.items);
  const currentIndex = allPages.findIndex(page => page.path === slug);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

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
        blocks.push(<h2 key={i} className="text-3xl font-black text-slate-900 dark:text-white mt-20 mb-8 tracking-tight flex items-center gap-4"><span className="h-10 w-2 rounded-full bg-primary shadow-sm shadow-primary/40"></span>{processInlineMarkdown(line.replace('## ', ''), `h2-${i}`)}</h2>);
      } else if (line.startsWith('### ')) {
        blocks.push(<h3 key={i} className="text-2xl font-bold text-slate-900 dark:text-white mt-14 mb-6">{processInlineMarkdown(line.replace('### ', ''), `h3-${i}`)}</h3>);
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
                      <th key={ci} className="p-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{cell}</th>
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
    <div className="w-full max-w-5xl mx-auto px-6 py-20 sm:px-12 lg:px-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="mb-12 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
        <Link to="/" className="hover:text-primary transition-colors">Docs</Link>
        <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
        <span className="text-slate-900 dark:text-white">{slug?.replace('-', ' ')}</span>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        {renderContent(content)}
      </div>

      <div className="mt-32 pt-16 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-10">
        {prevPage ? (
          <Link to={`/docs/${prevPage.path}`} className="group flex flex-col gap-3 text-left flex-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span> Previous
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{prevPage.title}</span>
          </Link>
        ) : (
          <div className="flex-1 hidden sm:block"></div>
        )}
        
        {nextPage ? (
          <Link to={`/docs/${nextPage.path}`} className="group flex flex-col gap-3 items-end text-right flex-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 group-hover:text-primary transition-colors">
              Next <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{nextPage.title}</span>
          </Link>
        ) : (
          <div className="flex-1 hidden sm:block"></div>
        )}
      </div>
    </div>
  );
};

export default DocPage;
