import React from 'react';
import { COMPARISON_DATA } from '../constants';

const StatusIcon = ({ status }: { status: 'check' | 'warning' | 'none' }) => {
  if (status === 'check') return <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>;
  if (status === 'warning') return <span className="material-symbols-outlined text-amber-500 text-lg">warning</span>;
  return <span className="material-symbols-outlined text-slate-300 text-sm">remove</span>;
};

const Table: React.FC = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm mt-8" role="region" aria-labelledby="comparison-table-caption">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <caption id="comparison-table-caption" className="sr-only">
            Feature comparison: Compiler Plugin, Detekt, Lint Rules, and IDE Plugin support per rule.
          </caption>
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white min-w-[200px]">Feature</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-400 text-center min-w-[100px]">Compiler</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-400 text-center min-w-[100px]">Detekt</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-400 text-center min-w-[100px]">Lint</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-primary text-center min-w-[100px]">IDE Plugin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {COMPARISON_DATA.map((row, idx) => (
              <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">{row.feature}</td>
                <td className="p-4 text-center"><StatusIcon status={row.compiler} /></td>
                <td className="p-4 text-center"><StatusIcon status={row.detekt} /></td>
                <td className="p-4 text-center"><StatusIcon status={row.lint} /></td>
                <td className="p-4 text-center bg-primary/5"><StatusIcon status={row.ide} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
