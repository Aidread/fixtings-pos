# Fixtings POS

A point-of-sale system built for **Fixtings Ja** — a phone buy / sell / repair shop in Falmouth, Trelawny, Jamaica — and for any phone repair shop run by technicians, sales assistants and owners.

It tracks **customers, sales, repair tickets, parts inventory and phones for sale** in one place. All prices are in Jamaican dollars (JMD).

## Features

- **Dashboard** — today's sales total, open repair tickets, low-stock alerts, phones for sale, recent sales.
- **New Sale (POS)** — build a cart from parts inventory and phones for sale, pick a customer, take cash / card / transfer, complete the sale, print a receipt. Stock is decremented automatically.
- **Customers** — add, search and edit customers, with each customer's sales and repair history.
- **Repairs** — repair tickets with a status pipeline: Received → Diagnosing → Awaiting Parts → In Repair → Ready → Collected. Assign a technician, attach parts used (stock is decremented), take a deposit, and collect the final payment.
- **Parts & Inventory** — searchable catalog by brand, device and part type, with stock, cost, selling price and low-stock thresholds. Add or edit any part or model.
- **Phones for Sale** — listings with brand, model, storage, condition, IMEI/serial, price and status (Available / Reserved / Sold).
- **Reports** — sales by day, top-selling parts, open tickets by technician, low-stock list.
- **Settings & roles** — shop name and contact, staff list, sample-data controls, JSON backup export/import, and a role switcher:
  - **Owner** — everything, including reports, settings and part costs.
  - **Sales Assistant** — sales, customers and phones for sale.
  - **Technician** — repair tickets and parts usage.
  - The role picker is a simple in-app switcher, not a login.

## Parts catalog

The app ships with a seeded catalog of the most common repair parts — display/screen assembly, battery, charging port, rear camera, front camera, earpiece speaker, loudspeaker, back glass and power/volume flex — for:

- **Samsung Galaxy**: S21, S22, S23, S24, S25, A14, A15, A34, A54, Note 20 Ultra
- **Google Pixel**: 6, 7, 8
- **Apple iPhone**: 11, 12, 13, 14, 15, 16, 17, including Pro and Pro Max models

Every part has a SKU, cost and selling price in JMD, starting stock and a low-stock threshold. This is a starter seed, not literally every part ever made — add any missing part or model from the Parts & Inventory screen.

## How to run it

No backend, no build step, no accounts. Just static files.

**Option 1 — open it directly:** double-click `index.html` in any modern browser.

**Option 2 — serve the folder:**

```bash
cd fixtings-pos
python3 -m http.server 8000
# then open http://localhost:8000
```

All data is stored in the browser (localStorage) on the device that opens it. Use **Settings → Export data** for a JSON backup. Sample customers, tickets, sales and phones are included so every screen is alive on first load — they are marked `sample` and can be removed from Settings.

## Files

| File | What it is |
| --- | --- |
| `index.html` | App shell (sidebar, views, modals) |
| `styles.css` | All styling, mobile-friendly |
| `app.js` | All app logic: POS, tickets, inventory, reports, roles |
| `parts.js` | Parts catalog seed (devices, part types, JMD prices) |
| `.github/workflows/blank.yml` | Starter CI workflow (unchanged) |

## Tech

Plain HTML, CSS and JavaScript. No frameworks, no dependencies, no network calls.
