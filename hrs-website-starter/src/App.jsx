import React, {useMemo, useState} from 'react'
import './index.css'
import inventory from './data/inventory.json'
import faqs from './data/faqs.json'
import { Card, CardContent, CardHeader, CardTitle, Button } from './components/ui.jsx'
import { Tabs } from './components/tabs.jsx'

function Money({ value }) {
  if (value == null || Number.isNaN(value)) return <span>-</span>;
  return <span>${Number(value).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</span>;
}

function Section({ title, children, className = "" }) {
  return (
    <Card className={className}>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function InventoryTable() {
  const [query, setQuery] = useState("");
  const [showPrices, setShowPrices] = useState(false);

  const rows = inventory.map(r => ({
    model: r["Model#"], serial: r["Serial#"], brand: r["Brand"], desc: r["Description"], cost: r["Cost"], list: r["List Price"]
  }));

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter(r => [r.model, r.serial, r.brand, r.desc].some(v => String(v).toLowerCase().includes(q)));
  }, [rows, query]);

  const totalCost = useMemo(()=> filtered.reduce((a,r)=> a + Number(r.cost||0),0), [filtered]);
  const totalList = useMemo(()=> filtered.reduce((a,r)=> a + Number(r.list||0),0), [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 flex items-center gap-2">
          <input className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Search model, brand, desc, serial…" value={query} onChange={(e)=>setQuery(e.target.value)} />
          <Button variant="outline" onClick={()=>setQuery("")}>Clear</Button>
        </div>
        <Button variant={showPrices? 'default':'outline'} onClick={()=>setShowPrices(v=>!v)}>
          {showPrices? 'Hide Prices':'Show Prices'}
        </Button>
      </div>
      <div className="overflow-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3 font-medium">Model#</th>
              <th className="p-3 font-medium">Serial#</th>
              <th className="p-3 font-medium">Brand</th>
              <th className="p-3 font-medium">Description</th>
              {showPrices && <th className="p-3 font-medium">Cost</th>}
              {showPrices && <th className="p-3 font-medium">List Price</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r,i)=>(
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 font-mono">{r.model}</td>
                <td className="p-3 font-mono">{r.serial}</td>
                <td className="p-3">{r.brand}</td>
                <td className="p-3">{r.desc}</td>
                {showPrices && <td className="p-3"><Money value={r.cost} /></td>}
                {showPrices && <td className="p-3"><Money value={r.list} /></td>}
              </tr>
            ))}
          </tbody>
          {showPrices && (
            <tfoot>
              <tr className="bg-gray-100 font-medium">
                <td className="p-3" colSpan={4}>Totals (filtered)</td>
                <td className="p-3"><Money value={totalCost} /></td>
                <td className="p-3"><Money value={totalList} /></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <div className="text-xs text-gray-500">Dataset imported from HRS-Inventory-List-1.xlsx. Toggle pricing for public vs. internal view.</div>
    </div>
  );
}

export default function App() {
  const tabs = [
    { value: 'home', label: 'Home', content: (
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Design • Build • Install">
          <p className="text-sm leading-relaxed">
            We specialize in kitchen and bath remodels across Phoenix, Scottsdale, Tucson, Las Vegas, and Albuquerque.
            Explore appliances, cabinets, lighting, and fixtures—all in one place.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Button>Browse Inventory</Button>
            <Button variant="outline">Get a Quote</Button>
          </div>
        </Section>
        <Section title="Project Portal (coming soon)">
          <p className="text-sm">Customers will be able to view estimates, invoices, schedules, and delivery windows here.</p>
        </Section>
      </div>
    )},
    { value: 'services', label: 'Services', content: (
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Remodeling & Trades">
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li>Full‑service kitchen & bath design</li>
            <li>Cabinet installation & refacing</li>
            <li>Plumbing & electrical coordination</li>
            <li>Delivery & on‑site installation</li>
          </ul>
          <div className="mt-4 text-xs text-gray-500">Pricing, minimums, and service descriptions will map to your FAQ and fee schedule.</div>
        </Section>
        <Section title="How It Works">
          <ol className="list-decimal pl-5 text-sm space-y-2">
            <li>Initial consult & measurements</li>
            <li>Design proposal & product selection</li>
            <li>Order, delivery scheduling, and installation</li>
            <li>Final walkthrough</li>
          </ol>
          <div className="mt-4"><Button>Schedule a Free Consult</Button></div>
        </Section>
      </div>
    )},
    { value: 'products', label: 'Products', content: (
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Product Categories">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {["Appliances","Cabinets","Lighting","Plumbing","Countertops & Tile"].map(c => (
              <Button key={c} variant="outline" className="justify-between">{c} <span>›</span></Button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">Link each category to brand pages and external manufacturer sites.</p>
        </Section>
        <Section title="Featured Brands">
          <div className="flex flex-wrap gap-2 text-sm">
            {["GE","Bosch","Sub‑Zero","Viking","Miele","Jenn‑Air","Thermador","Amana"].map(b=> (
              <span key={b} className="px-3 py-1 rounded-full bg-gray-100">{b}</span>
            ))}
          </div>
        </Section>
      </div>
    )},
    { value: 'inventory', label: 'Inventory', content: (
      <Section title="Available Inventory">
        <InventoryTable />
      </Section>
    )},
    { value: 'faq', label: 'FAQs', content: (
      <Section title="Frequently Asked Questions">
        <div className="space-y-3 text-sm">
          {faqs.slice(0,12).map((item, idx) => (
            <details key={idx} className="group border rounded-xl p-3">
              <summary className="font-medium cursor-pointer">{item.question}</summary>
              <p className="mt-2 text-gray-700">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Full FAQ content sourced from HDS-FAQs.docx.</p>
      </Section>
    )},
    { value: 'locations', label: 'Locations', content: (
      <Section title="Showrooms & Service Areas">
        <ul className="text-sm space-y-2 list-disc pl-5">
          <li>Phoenix (HQ) – 101 Sedalia Dr, Phoenix, AZ 85001</li>
          <li>Scottsdale – 901 S. Sedona Way, Scottsdale, AZ</li>
          <li>Tucson – 8023 Sedalia Dr, Tucson, AZ</li>
          <li>Las Vegas – Elite Home Renovations</li>
          <li>Albuquerque – IRB Home Supply</li>
        </ul>
      </Section>
    )},
    { value: 'contact', label: 'Contact', content: (
      <Section title="Contact Us">
        <form className="grid gap-3 max-w-xl">
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Your Name"/>
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Email"/>
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Phone"/>
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Project Type (Kitchen, Bath, etc.)"/>
          <Button>Send</Button>
        </form>
        <p className="text-xs text-gray-500 mt-3">This is a static form placeholder. Connect to your backend/email later.</p>
      </Section>
    )},
    { value: 'about', label: 'About', content: (
      <Section title="About HRS">
        <p className="text-sm leading-relaxed">Founded in 2007, HRS provides kitchen and bath design, showroom product selection, delivery, and installation across the Southwest. Our teams include certified designers and experienced installers focused on quality and schedule.</p>
      </Section>
    )},
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gray-900 text-white grid place-content-center font-bold">HRS</div>
            <div>
              <h1 className="text-xl font-semibold leading-tight">Home Renovation Solutions</h1>
              <p className="text-xs text-gray-500 leading-tight">Kitchens • Baths • Appliances • Design</p>
            </div>
          </div>
          <Button className="rounded-2xl">Request a Consult</Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Tabs tabs={tabs} initial="home" />
      </main>

      <footer className="border-t py-8 mt-8">
        <div className="mx-auto max-w-6xl px-4 text-xs text-gray-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Home Renovation Solutions</div>
          <div className="flex gap-4">
            <a className="hover:underline" href="#">Privacy</a>
            <a className="hover:underline" href="#">Terms</a>
            <a className="hover:underline" href="#">Employee Login (placeholder)</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
