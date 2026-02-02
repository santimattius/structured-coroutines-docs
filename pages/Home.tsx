import React from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from '../constants';
import Table from '../components/Table';

const Home: React.FC = () => {
  return (
    <div className="w-full py-12 sm:py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-32 lg:mb-48 pt-8 sm:pt-12">
        <div className="flex-1 flex flex-col gap-8 lg:gap-10 text-left">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 w-fit">
            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live Documentation</span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
            Structured <br/><span className="text-primary">Coroutines</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl">
            The definitive toolkit for enforcing safety, predictability, and efficiency in Kotlin Coroutines.
          </p>
          <div className="flex flex-wrap gap-5 pt-4 lg:pt-6">
            <Link to="/docs/introduction" className="flex items-center justify-center rounded-2xl h-14 lg:h-16 px-8 lg:px-10 bg-primary hover:bg-primary/90 text-white text-sm lg:text-base font-black uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 hover:-translate-y-1">
              Start Learning
            </Link>
            <Link to="/docs/gradle-plugin" className="flex items-center justify-center rounded-2xl h-14 lg:h-16 px-8 lg:px-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm lg:text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1">
              <span className="material-symbols-outlined mr-3 text-[24px]">terminal</span>
              Quick Install
            </Link>
          </div>
        </div>
        
        <div className="w-full lg:w-[540px] bg-slate-900 rounded-[2rem] border border-white/10 p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="font-mono text-sm leading-8">
            <div className="flex gap-2.5 mb-8">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-700" />
              <div className="w-3.5 h-3.5 rounded-full bg-slate-700" />
              <div className="w-3.5 h-3.5 rounded-full bg-slate-700" />
            </div>
            <pre className="space-y-1.5 text-slate-300 font-mono text-sm leading-7 overflow-x-auto whitespace-pre" role="img" aria-label="Code sample: loadData with StructuredScope">
              <code className="block">
                <span className="text-violet-400 font-bold">fun</span>
                <span className="text-white font-bold"> loadData</span>
                <span className="text-slate-300">(</span>
                <span className="text-fuchsia-400">@StructuredScope</span>
                <span className="text-slate-300"> scope: </span>
                <span className="text-slate-400">CoroutineScope</span>
                <span className="text-slate-300">) </span>
                <span className="text-slate-400">{`{`}</span>
                {'\n'}
                <span className="text-slate-300">    scope.</span>
                <span className="text-violet-400 font-bold">launch</span>
                <span className="text-slate-300"> </span>
                <span className="text-slate-400">{`{`}</span>
                {'\n'}
                <span className="text-slate-300">        </span>
                <span className="text-white">fetchData()</span>
                {'\n'}
                <span className="text-slate-300">    </span>
                <span className="text-slate-400">{`}`}</span>
                {'\n'}
                <span className="text-slate-400">{`}`}</span>
              </code>
            </pre>
          </div>
          <div className="absolute top-0 right-0 p-8 text-slate-800 select-none">
            <span className="material-symbols-outlined text-[120px] opacity-10">code_blocks</span>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <section className="py-20 lg:py-32">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">Toolkit Modules</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xl max-w-3xl leading-relaxed">Integrated tools to safeguard your concurrency across the entire lifecycle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {MODULES.map((mod, i) => (
            <Link key={i} to={mod.path} className="group p-8 lg:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(128,82,255,0.1)] transition-all flex flex-col gap-6">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[32px]">{mod.icon}</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{mod.title}</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{mod.description}</p>
              </div>
              <div className="mt-auto pt-4 flex items-center text-primary text-sm font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                Explore <span className="material-symbols-outlined text-[18px] ml-2">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 lg:py-32">
        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Feature Comparison</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Detailed breakdown of which tools provide specific protections.</p>
        </div>
        <Table />
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 pt-20 pb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">dataset</span>
            </div>
            <span className="font-black text-xl text-slate-900 dark:text-white italic">Structured</span>
          </div>
          <p className="text-sm text-slate-400 font-medium max-w-xs leading-relaxed">Enforcing best practices in Kotlin Coroutines. Open Source and Community Driven.</p>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Apache 2.0 License • © 2026</p>
        </div>
        <div className="flex gap-16 lg:gap-24">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Connect</p>
            <a className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="https://github.com/santimattius/structured-coroutines">GitHub</a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Legal</p>
            <a className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
