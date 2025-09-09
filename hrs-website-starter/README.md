# HRS Website Starter (Vite + React + Tailwind)

## Quick start
1. Install Node.js (LTS) from https://nodejs.org
2. In a terminal:
```bash
cd hrs-website-starter
npm install
npm run dev
```
Open the printed URL (usually http://localhost:5173).

## Deploy (meets "must be hosted")
- Netlify: new site from Git, build: `npm run build`, publish dir: `dist`
- Vercel: import repo, one‑click deploy
- GitHub Pages: `npm run build` then publish `dist`

### Data
- `src/data/inventory.json` – parsed from HRS-Inventory-List-1.xlsx
- `src/data/faqs.json` – parsed from HDS-FAQs.docx
