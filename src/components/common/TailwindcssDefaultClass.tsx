import React, { useEffect } from 'react';

import { tailwindcssColors, tailwindcssGradiant } from '@lib/constants';

const TailwindcssDefaultClass: React.FunctionComponent = () => {
  useEffect(() => {
    const classnames = [];

    for (const color of Object.values(tailwindcssColors)) {
      for (const gradiant of Object.values(tailwindcssGradiant)) {
        classnames.push(`text-${color}-${gradiant}`);
        classnames.push(`bg-${color}-${gradiant}`);
        classnames.push(`border-${color}-${gradiant}`);
      }
    }

    for (const classname of [...classnames]) {
      classnames.push(`hover:${classname}`);
    }
  }, []);

  return (
    <div className="text-slate-50 bg-slate-50 border-slate-50 text-slate-100 bg-slate-100 border-slate-100 text-slate-200 bg-slate-200 border-slate-200 text-slate-300 bg-slate-300 border-slate-300 text-slate-500 bg-slate-500 border-slate-500 text-slate-600 bg-slate-600 border-slate-600 text-slate-800 bg-slate-800 border-slate-800 text-slate-900 bg-slate-900 border-slate-900 text-gray-50 bg-gray-50 border-gray-50 text-gray-100 bg-gray-100 border-gray-100 text-gray-200 bg-gray-200 border-gray-200 text-gray-300 bg-gray-300 border-gray-300 text-gray-500 bg-gray-500 border-gray-500 text-gray-600 bg-gray-600 border-gray-600 text-gray-800 bg-gray-800 border-gray-800 text-gray-900 bg-gray-900 border-gray-900 text-zinc-50 bg-zinc-50 border-zinc-50 text-zinc-100 bg-zinc-100 border-zinc-100 text-zinc-200 bg-zinc-200 border-zinc-200 text-zinc-300 bg-zinc-300 border-zinc-300 text-zinc-500 bg-zinc-500 border-zinc-500 text-zinc-600 bg-zinc-600 border-zinc-600 text-zinc-800 bg-zinc-800 border-zinc-800 text-zinc-900 bg-zinc-900 border-zinc-900 text-neutral-50 bg-neutral-50 border-neutral-50 text-neutral-100 bg-neutral-100 border-neutral-100 text-neutral-200 bg-neutral-200 border-neutral-200 text-neutral-300 bg-neutral-300 border-neutral-300 text-neutral-500 bg-neutral-500 border-neutral-500 text-neutral-600 bg-neutral-600 border-neutral-600 text-neutral-800 bg-neutral-800 border-neutral-800 text-neutral-900 bg-neutral-900 border-neutral-900 text-stone-50 bg-stone-50 border-stone-50 text-stone-100 bg-stone-100 border-stone-100 text-stone-200 bg-stone-200 border-stone-200 text-stone-300 bg-stone-300 border-stone-300 text-stone-500 bg-stone-500 border-stone-500 text-stone-600 bg-stone-600 border-stone-600 text-stone-800 bg-stone-800 border-stone-800 text-stone-900 bg-stone-900 border-stone-900 text-red-50 bg-red-50 border-red-50 text-red-100 bg-red-100 border-red-100 text-red-200 bg-red-200 border-red-200 text-red-300 bg-red-300 border-red-300 text-red-500 bg-red-500 border-red-500 text-red-600 bg-red-600 border-red-600 text-red-800 bg-red-800 border-red-800 text-red-900 bg-red-900 border-red-900 text-orange-50 bg-orange-50 border-orange-50 text-orange-100 bg-orange-100 border-orange-100 text-orange-200 bg-orange-200 border-orange-200 text-orange-300 bg-orange-300 border-orange-300 text-orange-500 bg-orange-500 border-orange-500 text-orange-600 bg-orange-600 border-orange-600 text-orange-800 bg-orange-800 border-orange-800 text-orange-900 bg-orange-900 border-orange-900 text-amber-50 bg-amber-50 border-amber-50 text-amber-100 bg-amber-100 border-amber-100 text-amber-200 bg-amber-200 border-amber-200 text-amber-300 bg-amber-300 border-amber-300 text-amber-500 bg-amber-500 border-amber-500 text-amber-600 bg-amber-600 border-amber-600 text-amber-800 bg-amber-800 border-amber-800 text-amber-900 bg-amber-900 border-amber-900 text-yellow-50 bg-yellow-50 border-yellow-50 text-yellow-100 bg-yellow-100 border-yellow-100 text-yellow-200 bg-yellow-200 border-yellow-200 text-yellow-300 bg-yellow-300 border-yellow-300 text-yellow-500 bg-yellow-500 border-yellow-500 text-yellow-600 bg-yellow-600 border-yellow-600 text-yellow-800 bg-yellow-800 border-yellow-800 text-yellow-900 bg-yellow-900 border-yellow-900 text-lime-50 bg-lime-50 border-lime-50 text-lime-100 bg-lime-100 border-lime-100 text-lime-200 bg-lime-200 border-lime-200 text-lime-300 bg-lime-300 border-lime-300 text-lime-500 bg-lime-500 border-lime-500 text-lime-600 bg-lime-600 border-lime-600 text-lime-800 bg-lime-800 border-lime-800 text-lime-900 bg-lime-900 border-lime-900 text-green-50 bg-green-50 border-green-50 text-green-100 bg-green-100 border-green-100 text-green-200 bg-green-200 border-green-200 text-green-300 bg-green-300 border-green-300 text-green-500 bg-green-500 border-green-500 text-green-600 bg-green-600 border-green-600 text-green-800 bg-green-800 border-green-800 text-green-900 bg-green-900 border-green-900 text-emerald-50 bg-emerald-50 border-emerald-50 text-emerald-100 bg-emerald-100 border-emerald-100 text-emerald-200 bg-emerald-200 border-emerald-200 text-emerald-300 bg-emerald-300 border-emerald-300 text-emerald-500 bg-emerald-500 border-emerald-500 text-emerald-600 bg-emerald-600 border-emerald-600 text-emerald-800 bg-emerald-800 border-emerald-800 text-emerald-900 bg-emerald-900 border-emerald-900 text-teal-50 bg-teal-50 border-teal-50 text-teal-100 bg-teal-100 border-teal-100 text-teal-200 bg-teal-200 border-teal-200 text-teal-300 bg-teal-300 border-teal-300 text-teal-500 bg-teal-500 border-teal-500 text-teal-600 bg-teal-600 border-teal-600 text-teal-800 bg-teal-800 border-teal-800 text-teal-900 bg-teal-900 border-teal-900 text-cyan-50 bg-cyan-50 border-cyan-50 text-cyan-100 bg-cyan-100 border-cyan-100 text-cyan-200 bg-cyan-200 border-cyan-200 text-cyan-300 bg-cyan-300 border-cyan-300 text-cyan-500 bg-cyan-500 border-cyan-500 text-cyan-600 bg-cyan-600 border-cyan-600 text-cyan-800 bg-cyan-800 border-cyan-800 text-cyan-900 bg-cyan-900 border-cyan-900 text-sky-50 bg-sky-50 border-sky-50 text-sky-100 bg-sky-100 border-sky-100 text-sky-200 bg-sky-200 border-sky-200 text-sky-300 bg-sky-300 border-sky-300 text-sky-500 bg-sky-500 border-sky-500 text-sky-600 bg-sky-600 border-sky-600 text-sky-800 bg-sky-800 border-sky-800 text-sky-900 bg-sky-900 border-sky-900 text-blue-50 bg-blue-50 border-blue-50 text-blue-100 bg-blue-100 border-blue-100 text-blue-200 bg-blue-200 border-blue-200 text-blue-300 bg-blue-300 border-blue-300 text-blue-500 bg-blue-500 border-blue-500 text-blue-600 bg-blue-600 border-blue-600 text-blue-800 bg-blue-800 border-blue-800 text-blue-900 bg-blue-900 border-blue-900 text-indigo-50 bg-indigo-50 border-indigo-50 text-indigo-100 bg-indigo-100 border-indigo-100 text-indigo-200 bg-indigo-200 border-indigo-200 text-indigo-300 bg-indigo-300 border-indigo-300 text-indigo-500 bg-indigo-500 border-indigo-500 text-indigo-600 bg-indigo-600 border-indigo-600 text-indigo-800 bg-indigo-800 border-indigo-800 text-indigo-900 bg-indigo-900 border-indigo-900 text-violet-50 bg-violet-50 border-violet-50 text-violet-100 bg-violet-100 border-violet-100 text-violet-200 bg-violet-200 border-violet-200 text-violet-300 bg-violet-300 border-violet-300 text-violet-500 bg-violet-500 border-violet-500 text-violet-600 bg-violet-600 border-violet-600 text-violet-800 bg-violet-800 border-violet-800 text-violet-900 bg-violet-900 border-violet-900 text-purple-50 bg-purple-50 border-purple-50 text-purple-100 bg-purple-100 border-purple-100 text-purple-200 bg-purple-200 border-purple-200 text-purple-300 bg-purple-300 border-purple-300 text-purple-500 bg-purple-500 border-purple-500 text-purple-600 bg-purple-600 border-purple-600 text-purple-800 bg-purple-800 border-purple-800 text-purple-900 bg-purple-900 border-purple-900 text-fuchsia-50 bg-fuchsia-50 border-fuchsia-50 text-fuchsia-100 bg-fuchsia-100 border-fuchsia-100 text-fuchsia-200 bg-fuchsia-200 border-fuchsia-200 text-fuchsia-300 bg-fuchsia-300 border-fuchsia-300 text-fuchsia-500 bg-fuchsia-500 border-fuchsia-500 text-fuchsia-600 bg-fuchsia-600 border-fuchsia-600 text-fuchsia-800 bg-fuchsia-800 border-fuchsia-800 text-fuchsia-900 bg-fuchsia-900 border-fuchsia-900 text-pink-50 bg-pink-50 border-pink-50 text-pink-100 bg-pink-100 border-pink-100 text-pink-200 bg-pink-200 border-pink-200 text-pink-300 bg-pink-300 border-pink-300 text-pink-500 bg-pink-500 border-pink-500 text-pink-600 bg-pink-600 border-pink-600 text-pink-800 bg-pink-800 border-pink-800 text-pink-900 bg-pink-900 border-pink-900 text-rose-50 bg-rose-50 border-rose-50 text-rose-100 bg-rose-100 border-rose-100 text-rose-200 bg-rose-200 border-rose-200 text-rose-300 bg-rose-300 border-rose-300 text-rose-500 bg-rose-500 border-rose-500 text-rose-600 bg-rose-600 border-rose-600 text-rose-800 bg-rose-800 border-rose-800 text-rose-900 bg-rose-900 border-rose-900 hover:text-slate-50 hover:bg-slate-50 hover:border-slate-50 hover:text-slate-100 hover:bg-slate-100 hover:border-slate-100 hover:text-slate-200 hover:bg-slate-200 hover:border-slate-200 hover:text-slate-300 hover:bg-slate-300 hover:border-slate-300 hover:text-slate-500 hover:bg-slate-500 hover:border-slate-500 hover:text-slate-600 hover:bg-slate-600 hover:border-slate-600 hover:text-slate-800 hover:bg-slate-800 hover:border-slate-800 hover:text-slate-900 hover:bg-slate-900 hover:border-slate-900 hover:text-gray-50 hover:bg-gray-50 hover:border-gray-50 hover:text-gray-100 hover:bg-gray-100 hover:border-gray-100 hover:text-gray-200 hover:bg-gray-200 hover:border-gray-200 hover:text-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:text-gray-500 hover:bg-gray-500 hover:border-gray-500 hover:text-gray-600 hover:bg-gray-600 hover:border-gray-600 hover:text-gray-800 hover:bg-gray-800 hover:border-gray-800 hover:text-gray-900 hover:bg-gray-900 hover:border-gray-900 hover:text-zinc-50 hover:bg-zinc-50 hover:border-zinc-50 hover:text-zinc-100 hover:bg-zinc-100 hover:border-zinc-100 hover:text-zinc-200 hover:bg-zinc-200 hover:border-zinc-200 hover:text-zinc-300 hover:bg-zinc-300 hover:border-zinc-300 hover:text-zinc-500 hover:bg-zinc-500 hover:border-zinc-500 hover:text-zinc-600 hover:bg-zinc-600 hover:border-zinc-600 hover:text-zinc-800 hover:bg-zinc-800 hover:border-zinc-800 hover:text-zinc-900 hover:bg-zinc-900 hover:border-zinc-900 hover:text-neutral-50 hover:bg-neutral-50 hover:border-neutral-50 hover:text-neutral-100 hover:bg-neutral-100 hover:border-neutral-100 hover:text-neutral-200 hover:bg-neutral-200 hover:border-neutral-200 hover:text-neutral-300 hover:bg-neutral-300 hover:border-neutral-300 hover:text-neutral-500 hover:bg-neutral-500 hover:border-neutral-500 hover:text-neutral-600 hover:bg-neutral-600 hover:border-neutral-600 hover:text-neutral-800 hover:bg-neutral-800 hover:border-neutral-800 hover:text-neutral-900 hover:bg-neutral-900 hover:border-neutral-900 hover:text-stone-50 hover:bg-stone-50 hover:border-stone-50 hover:text-stone-100 hover:bg-stone-100 hover:border-stone-100 hover:text-stone-200 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-300 hover:bg-stone-300 hover:border-stone-300 hover:text-stone-500 hover:bg-stone-500 hover:border-stone-500 hover:text-stone-600 hover:bg-stone-600 hover:border-stone-600 hover:text-stone-800 hover:bg-stone-800 hover:border-stone-800 hover:text-stone-900 hover:bg-stone-900 hover:border-stone-900 hover:text-red-50 hover:bg-red-50 hover:border-red-50 hover:text-red-100 hover:bg-red-100 hover:border-red-100 hover:text-red-200 hover:bg-red-200 hover:border-red-200 hover:text-red-300 hover:bg-red-300 hover:border-red-300 hover:text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-red-800 hover:bg-red-800 hover:border-red-800 hover:text-red-900 hover:bg-red-900 hover:border-red-900 hover:text-orange-50 hover:bg-orange-50 hover:border-orange-50 hover:text-orange-100 hover:bg-orange-100 hover:border-orange-100 hover:text-orange-200 hover:bg-orange-200 hover:border-orange-200 hover:text-orange-300 hover:bg-orange-300 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-600 hover:border-orange-600 hover:text-orange-800 hover:bg-orange-800 hover:border-orange-800 hover:text-orange-900 hover:bg-orange-900 hover:border-orange-900 hover:text-amber-50 hover:bg-amber-50 hover:border-amber-50 hover:text-amber-100 hover:bg-amber-100 hover:border-amber-100 hover:text-amber-200 hover:bg-amber-200 hover:border-amber-200 hover:text-amber-300 hover:bg-amber-300 hover:border-amber-300 hover:text-amber-500 hover:bg-amber-500 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-600 hover:border-amber-600 hover:text-amber-800 hover:bg-amber-800 hover:border-amber-800 hover:text-amber-900 hover:bg-amber-900 hover:border-amber-900 hover:text-yellow-50 hover:bg-yellow-50 hover:border-yellow-50 hover:text-yellow-100 hover:bg-yellow-100 hover:border-yellow-100 hover:text-yellow-200 hover:bg-yellow-200 hover:border-yellow-200 hover:text-yellow-300 hover:bg-yellow-300 hover:border-yellow-300 hover:text-yellow-500 hover:bg-yellow-500 hover:border-yellow-500 hover:text-yellow-600 hover:bg-yellow-600 hover:border-yellow-600 hover:text-yellow-800 hover:bg-yellow-800 hover:border-yellow-800 hover:text-yellow-900 hover:bg-yellow-900 hover:border-yellow-900 hover:text-lime-50 hover:bg-lime-50 hover:border-lime-50 hover:text-lime-100 hover:bg-lime-100 hover:border-lime-100 hover:text-lime-200 hover:bg-lime-200 hover:border-lime-200 hover:text-lime-300 hover:bg-lime-300 hover:border-lime-300 hover:text-lime-500 hover:bg-lime-500 hover:border-lime-500 hover:text-lime-600 hover:bg-lime-600 hover:border-lime-600 hover:text-lime-800 hover:bg-lime-800 hover:border-lime-800 hover:text-lime-900 hover:bg-lime-900 hover:border-lime-900 hover:text-green-50 hover:bg-green-50 hover:border-green-50 hover:text-green-100 hover:bg-green-100 hover:border-green-100 hover:text-green-200 hover:bg-green-200 hover:border-green-200 hover:text-green-300 hover:bg-green-300 hover:border-green-300 hover:text-green-500 hover:bg-green-500 hover:border-green-500 hover:text-green-600 hover:bg-green-600 hover:border-green-600 hover:text-green-800 hover:bg-green-800 hover:border-green-800 hover:text-green-900 hover:bg-green-900 hover:border-green-900 hover:text-emerald-50 hover:bg-emerald-50 hover:border-emerald-50 hover:text-emerald-100 hover:bg-emerald-100 hover:border-emerald-100 hover:text-emerald-200 hover:bg-emerald-200 hover:border-emerald-200 hover:text-emerald-300 hover:bg-emerald-300 hover:border-emerald-300 hover:text-emerald-500 hover:bg-emerald-500 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 hover:text-emerald-800 hover:bg-emerald-800 hover:border-emerald-800 hover:text-emerald-900 hover:bg-emerald-900 hover:border-emerald-900 hover:text-teal-50 hover:bg-teal-50 hover:border-teal-50 hover:text-teal-100 hover:bg-teal-100 hover:border-teal-100 hover:text-teal-200 hover:bg-teal-200 hover:border-teal-200 hover:text-teal-300 hover:bg-teal-300 hover:border-teal-300 hover:text-teal-500 hover:bg-teal-500 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-600 hover:border-teal-600 hover:text-teal-800 hover:bg-teal-800 hover:border-teal-800 hover:text-teal-900 hover:bg-teal-900 hover:border-teal-900 hover:text-cyan-50 hover:bg-cyan-50 hover:border-cyan-50 hover:text-cyan-100 hover:bg-cyan-100 hover:border-cyan-100 hover:text-cyan-200 hover:bg-cyan-200 hover:border-cyan-200 hover:text-cyan-300 hover:bg-cyan-300 hover:border-cyan-300 hover:text-cyan-500 hover:bg-cyan-500 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-600 hover:border-cyan-600 hover:text-cyan-800 hover:bg-cyan-800 hover:border-cyan-800 hover:text-cyan-900 hover:bg-cyan-900 hover:border-cyan-900 hover:text-sky-50 hover:bg-sky-50 hover:border-sky-50 hover:text-sky-100 hover:bg-sky-100 hover:border-sky-100 hover:text-sky-200 hover:bg-sky-200 hover:border-sky-200 hover:text-sky-300 hover:bg-sky-300 hover:border-sky-300 hover:text-sky-500 hover:bg-sky-500 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-600 hover:border-sky-600 hover:text-sky-800 hover:bg-sky-800 hover:border-sky-800 hover:text-sky-900 hover:bg-sky-900 hover:border-sky-900 hover:text-blue-50 hover:bg-blue-50 hover:border-blue-50 hover:text-blue-100 hover:bg-blue-100 hover:border-blue-100 hover:text-blue-200 hover:bg-blue-200 hover:border-blue-200 hover:text-blue-300 hover:bg-blue-300 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-blue-800 hover:bg-blue-800 hover:border-blue-800 hover:text-blue-900 hover:bg-blue-900 hover:border-blue-900 hover:text-indigo-50 hover:bg-indigo-50 hover:border-indigo-50 hover:text-indigo-100 hover:bg-indigo-100 hover:border-indigo-100 hover:text-indigo-200 hover:bg-indigo-200 hover:border-indigo-200 hover:text-indigo-300 hover:bg-indigo-300 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-500 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-600 hover:border-indigo-600 hover:text-indigo-800 hover:bg-indigo-800 hover:border-indigo-800 hover:text-indigo-900 hover:bg-indigo-900 hover:border-indigo-900 hover:text-violet-50 hover:bg-violet-50 hover:border-violet-50 hover:text-violet-100 hover:bg-violet-100 hover:border-violet-100 hover:text-violet-200 hover:bg-violet-200 hover:border-violet-200 hover:text-violet-300 hover:bg-violet-300 hover:border-violet-300 hover:text-violet-500 hover:bg-violet-500 hover:border-violet-500 hover:text-violet-600 hover:bg-violet-600 hover:border-violet-600 hover:text-violet-800 hover:bg-violet-800 hover:border-violet-800 hover:text-violet-900 hover:bg-violet-900 hover:border-violet-900 hover:text-purple-50 hover:bg-purple-50 hover:border-purple-50 hover:text-purple-100 hover:bg-purple-100 hover:border-purple-100 hover:text-purple-200 hover:bg-purple-200 hover:border-purple-200 hover:text-purple-300 hover:bg-purple-300 hover:border-purple-300 hover:text-purple-500 hover:bg-purple-500 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-600 hover:border-purple-600 hover:text-purple-800 hover:bg-purple-800 hover:border-purple-800 hover:text-purple-900 hover:bg-purple-900 hover:border-purple-900 hover:text-fuchsia-50 hover:bg-fuchsia-50 hover:border-fuchsia-50 hover:text-fuchsia-100 hover:bg-fuchsia-100 hover:border-fuchsia-100 hover:text-fuchsia-200 hover:bg-fuchsia-200 hover:border-fuchsia-200 hover:text-fuchsia-300 hover:bg-fuchsia-300 hover:border-fuchsia-300 hover:text-fuchsia-500 hover:bg-fuchsia-500 hover:border-fuchsia-500 hover:text-fuchsia-600 hover:bg-fuchsia-600 hover:border-fuchsia-600 hover:text-fuchsia-800 hover:bg-fuchsia-800 hover:border-fuchsia-800 hover:text-fuchsia-900 hover:bg-fuchsia-900 hover:border-fuchsia-900 hover:text-pink-50 hover:bg-pink-50 hover:border-pink-50 hover:text-pink-100 hover:bg-pink-100 hover:border-pink-100 hover:text-pink-200 hover:bg-pink-200 hover:border-pink-200 hover:text-pink-300 hover:bg-pink-300 hover:border-pink-300 hover:text-pink-500 hover:bg-pink-500 hover:border-pink-500 hover:text-pink-600 hover:bg-pink-600 hover:border-pink-600 hover:text-pink-800 hover:bg-pink-800 hover:border-pink-800 hover:text-pink-900 hover:bg-pink-900 hover:border-pink-900 hover:text-rose-50 hover:bg-rose-50 hover:border-rose-50 hover:text-rose-100 hover:bg-rose-100 hover:border-rose-100 hover:text-rose-200 hover:bg-rose-200 hover:border-rose-200 hover:text-rose-300 hover:bg-rose-300 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-500 hover:border-rose-500 hover:text-rose-600 hover:bg-rose-600 hover:border-rose-600 hover:text-rose-800 hover:bg-rose-800 hover:border-rose-800 hover:text-rose-900 hover:bg-rose-900 hover:border-rose-900" />
  );
};

export default TailwindcssDefaultClass;