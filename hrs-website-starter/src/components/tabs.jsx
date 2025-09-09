import { useState } from 'react';
export function Tabs({ tabs, initial="home" }) {
  const [active, setActive] = useState(initial);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {tabs.map(t => (
          <button key={t.value} onClick={()=>setActive(t.value)}
            className={`px-3 py-2 rounded-xl text-sm border ${active===t.value ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find(t => t.value === active)?.content}
      </div>
    </div>
  );
}
