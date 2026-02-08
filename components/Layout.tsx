import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SIDEBAR_NAV, DOCS_CONTENT } from '../constants';

const THEME_KEY = 'docs-theme';
type Theme = 'light' | 'dark';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  window.localStorage.setItem(THEME_KEY, theme);
}

interface LayoutProps {
  children: React.ReactNode;
}

const ALL_DOC_ITEMS = SIDEBAR_NAV.flatMap((sec) => sec.items);

const GITHUB_REPO = 'santimattius/structured-coroutines';
const GITHUB_RELEASES_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    fetch(GITHUB_RELEASES_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { tag_name?: string }) => setLatestVersion(data?.tag_name ?? null))
      .catch(() => setLatestVersion(null));
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const isHome = location.pathname === '/';

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return ALL_DOC_ITEMS.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const body = (DOCS_CONTENT[item.path] ?? '').toLowerCase();
      const bodyMatch = body.includes(q);
      return titleMatch || bodyMatch;
    });
  }, [searchQuery]);

  const showSearchDropdown = searchFocused && searchQuery.trim().length >= 2;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectResult = (path: string) => {
    navigate(`/docs/${path}`);
    setSearchQuery('');
    setSearchFocused(false);
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 py-10 px-6 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-10">
        {SIDEBAR_NAV.map((sec, idx) => (
          <div key={idx}>
            <h3 className="px-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
              {sec.section}
            </h3>
            <div className="flex flex-col gap-1.5">
              {sec.items.map((item, i) => {
                const fullPath = `/docs/${item.path}`;
                const isActive = location.pathname === fullPath;
                return (
                  <Link
                    key={i}
                    to={fullPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold ${
                      isActive 
                        ? 'bg-primary/10 text-primary dark:text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {item.icon}
                    </span>
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-12 pb-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#1a1625] to-[#2d2a3b] p-5 text-white shadow-2xl border border-white/5">
          <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">Latest Release</p>
          <p className="text-sm font-bold mb-4 leading-tight">Structured Coroutines — Coming soon</p>
          <a href="#" className="text-xs font-bold text-primary hover:text-white transition-colors flex items-center gap-2 group">
            Release notes 
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16">
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-6 sm:px-10">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-3 text-slate-900 dark:text-white group">
              <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-[22px]">dataset</span>
              </div>
              <h2 className="text-xl font-black leading-tight tracking-tighter hidden sm:block italic">Structured</h2>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {latestVersion ? (
                <a
                  href={`https://github.com/${GITHUB_REPO}/releases/tag/${latestVersion}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  {latestVersion}
                </a>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest">Unreleased</span>
              )}
              <a className="text-xs font-bold text-slate-500 hover:text-primary transition-all" href={`https://github.com/${GITHUB_REPO}`}>GitHub</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div ref={searchRef} className="hidden sm:block relative w-64">
              <div className="flex w-full items-center rounded-xl bg-slate-100 dark:bg-slate-800 px-4 h-10 border border-transparent focus-within:border-primary/40 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0">search</span>
                <input
                  ref={searchInputRef}
                  type="search"
                  role="search"
                  aria-label="Search the docs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full min-w-0 bg-transparent border-none focus:ring-0 text-xs font-medium placeholder:text-slate-500 dark:placeholder:text-slate-400 text-slate-900 dark:text-white ml-2"
                  placeholder="Search the docs..."
                />
                <kbd className="hidden lg:flex items-center rounded-md border border-slate-200 dark:border-slate-700 px-1.5 font-sans text-[10px] font-bold text-slate-400 shrink-0">⌘K</kbd>
              </div>
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark shadow-xl overflow-hidden z-[100] max-h-[min(320px,70vh)] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <ul className="py-2" role="listbox">
                      {searchResults.map((item) => (
                        <li key={item.path} role="option">
                          <button
                            type="button"
                            onClick={() => handleSelectResult(item.path)}
                            className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <span className="material-symbols-outlined text-slate-400 text-[18px]">{item.icon}</span>
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-6 text-sm text-slate-500 dark:text-slate-400 text-center">No results for &quot;{searchQuery.trim()}&quot;</p>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="flex items-center justify-center size-10 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
            </button>
            <Link to="/docs/introduction" className="flex items-center justify-center rounded-xl h-10 px-5 bg-primary hover:bg-primary/90 transition-all text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
              Start
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center size-10 rounded-xl text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16 max-w-[1440px] mx-auto w-full relative">
        {/* Desktop Sidebar - Hidden on Home Page */}
        {!isHome && (
          <aside className="hidden lg:block w-72 fixed h-[calc(100vh-64px)] z-40">
            <Sidebar />
          </aside>
        )}

        {/* Mobile Sidebar Overlay - Always available if triggered */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="w-72 shadow-2xl animate-in slide-in-from-left duration-300">
              <Sidebar />
            </div>
            <div className="flex-1 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Main Content - Center on Home, Shift on Docs */}
        <main className={`flex-1 ${isHome ? 'lg:ml-0' : 'lg:ml-72'} min-h-[calc(100vh-64px)] overflow-x-hidden transition-[margin] duration-300`}>
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
