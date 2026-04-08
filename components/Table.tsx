import React from 'react';
import { COMPARISON_DATA } from '../constants';

const StatusIcon = ({ status }: { status: 'check' | 'warning' | 'none' }) => {
  if (status === 'check') return <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>;
  if (status === 'warning') return <span className="material-symbols-outlined text-amber-500 text-lg">warning</span>;
  return <span className="material-symbols-outlined text-slate-300 text-sm">remove</span>;
};

const Table: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm mt-8 overflow-hidden" role="region" aria-labelledby="comparison-table-caption">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[560px] text-left border-collapse">
          <caption id="comparison-table-caption" className="sr-only">
            Feature comparison: Compiler Plugin, Detekt, Lint Rules, and IDE Plugin support per rule.
          </caption>
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 min-w-[220px]">Feature</th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-400 text-center whitespace-nowrap min-w-[90px]">Compiler</th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-400 text-center whitespace-nowrap min-w-[90px]">Detekt</th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-400 text-center whitespace-nowrap min-w-[90px]">Lint</th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-primary text-center whitespace-nowrap min-w-[100px]">IDE Plugin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {COMPARISON_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">{row.feature}</td>
                <td className="px-5 py-4 text-center"><StatusIcon status={row.compiler} /></td>
                <td className="px-5 py-4 text-center"><StatusIcon status={row.detekt} /></td>
                <td className="px-5 py-4 text-center"><StatusIcon status={row.lint} /></td>
                <td className="px-5 py-4 text-center bg-primary/5 dark:bg-primary/10"><StatusIcon status={row.ide} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
