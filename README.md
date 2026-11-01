# Fixtings POS

A point-of-sale system built for **Fixtings Ja** — a phone buy / sell / repair shop in Falmouth, Trelawny, Jamaica — and for any phone repair shop run by technicians, sales assistants and owners.

It tracks **customers, sales, repair tickets, parts inventory and phones for sale** in one place. All prices are in Jamaican dollars (JMD).

## Features

- **Dashboard** — today's sales total, open repair tickets, low-stock alerts, phones for sale, recent sales.
- **New Sale (POS)** — build a cart from parts inventory and phones for sale, pick a customer, take cash / card / transfer, complete the sale, print a receipt. Stock is decremented automatically.
- **Customers** — add, search and edit customers, with each customer's sales and repair history.
- **Repairs** — repair tickets with a status pipeline: Received → Diagnosing → Awaiting Parts → In Repair → Ready → Collected. Assign a technician, attach parts used (stock is decremented), take a deposit, and collect the final payment.
- **Parts & Inventory** — searchable catalog by brand, device and part type, with stock, cost, selling price and low-stock thresholds. Add or edit any part or model. Every part row shows which other devices it also fits.
- **Device Specs** — specs for every device in the catalog (display, battery, charging port, chipset, RAM, storage, release year — sourced from GSMArena), the parts in stock that fit the selected device, a "what fits what" lookup by part type, and a **Shared Parts** view listing every part that fits more than one device: confirmed shares first, spec-matched candidates (verify fit) kept separate.
- **Phones for Sale** — listings with brand, model, storage, condition, IMEI/serial, price and status (Available / Reserved / Sold).
- **Reports** — sales by day, top-selling parts, open tickets by technician, low-stock list.
- **Settings & roles** — shop name and contact, staff list, sample-data controls, JSON backup export/import, and a role switcher:
  - **Owner** — everything, including reports, settings and part costs.
  - **Sales Assistant** — sales, customers and phones for sale.
  - **Technician** — repair tickets and parts usage.
  - The role picker is a simple in-app switcher, not a login.

## Parts catalog

The app ships with a seeded catalog of the most common repair parts — display/screen assembly, battery, charging port, rear camera, front camera, earpiece speaker, loudspeaker, back glass and power/volume flex — for 95 devices:

- **Samsung Galaxy**: S10, S20, S21, S22, S23, S24, S25, A12, A13, A14, A15, A22, A23, A32, A33, A34, A52, A53, A54, A72, A73, Note 10, Note 20, Note 20 Ultra, Z Flip 3/4, Z Fold 3/4
- **Google Pixel**: 4, 4a, 5, 5a, 6, 6a, 7, 7a, 8, 8a, 9, 9 Pro
- **Apple iPhone**: 8, 8 Plus, X, XS, XS Max, XR, SE (2020), SE (2022), 11, 12, 13, 14, 15, 16, 17, including Pro and Pro Max models
- **Xiaomi Redmi Note**: 10, 10 Pro, 11, 11 Pro, 12, 12 Pro, 13, 13 Pro — **Poco**: X3, X4 Pro, X5 — **Huawei**: P30, P40, Nova 9 — **Motorola Moto G**: G20, G30, G50, G60 — **Infinix Note**: 10, 11, 12 — **Tecno**: Spark 10, Camon 20

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
| `app.js` | All app logic: POS, tickets, inventory, reports, roles, device specs |
| `parts.js` | Parts catalog seed (devices, part types, JMD prices) |
| `specs.js` | Device specs (GSMArena) and shared-part compatibility data |
| `.github/workflows/blank.yml` | Starter CI workflow (unchanged) |

## Tech

Plain HTML, CSS and JavaScript. No frameworks, no dependencies, no network calls. The look is a futuristic dark theme — near-black background, electric cyan/green neon accents with a soft glow, glass-style cards and a mono accent font for headings and numbers — built to stay readable on a phone in the shop.
