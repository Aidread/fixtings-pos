// ============================================================================
// Fixtings POS — phone repair shop point of sale
// Static app, no backend. All data lives in localStorage.
// ============================================================================

'use strict';

// ---------------- utils ----------------
var $ = function (s) { return document.querySelector(s); };
var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function fmt(n) { return 'J$' + Math.round(Number(n) || 0).toLocaleString('en-US'); }
function uid(p) { return p + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); }
function todayStr() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function daysAgo(n) {
  var d = new Date();
  d.setDate(d.getDate() - n);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function dstr(iso) {
  if (!iso) return '';
  var parts = String(iso).slice(0, 10).split('-');
  if (parts.length !== 3) return String(iso);
  return parts[2] + '/' + parts[1] + '/' + parts[0];
}
function dtime(iso) {
  var d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return dstr(iso) + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}
function num(v, fallback) {
  var n = parseFloat(v);
  return isNaN(n) ? (fallback || 0) : n;
}

// ---------------- data layer ----------------
var LS_KEY = 'fixtings_pos_v1';
var SEED_VERSION = 2; // bump when the seed changes; see onlySampleData
var DB = null;

function loadDB() {
  try { DB = JSON.parse(localStorage.getItem(LS_KEY)); } catch (e) { DB = null; }
  if (!DB || !DB.parts || !DB.parts.length) { DB = seedDB(); saveDB(); return; }
  // Seed changed (e.g. stock reset to 0, one sample per scenario): if this
  // install holds only sample data — no real customers, tickets, sales,
  // phones or custom parts — reseed so it picks up the new seed. Real data
  // is never touched.
  if (DB.seedVersion !== SEED_VERSION && onlySampleData(DB)) {
    var keepSettings = DB.settings, keepRole = DB.role;
    DB = seedDB();
    if (keepSettings) DB.settings = keepSettings;
    if (keepRole) DB.role = keepRole;
    saveDB();
  }
}

// True when every record is a sample and at least one sample exists.
function onlySampleData(db) {
  var lists = [db.customers || [], db.phones || [], db.tickets || [], db.sales || []];
  var hasSample = lists.some(function (l) { return l.some(function (r) { return r.isSample; }); });
  if (!hasSample) return false;
  if (!lists.every(function (l) { return l.every(function (r) { return r.isSample; }); })) return false;
  return (db.parts || []).every(function (p) { return p.isSeed; });
}
function saveDB() { localStorage.setItem(LS_KEY, JSON.stringify(DB)); }

function seedDB() {
  var parts = buildCatalog();
  var bySku = {};
  parts.forEach(function (p) { bySku[p.sku] = p; });

  // One sample per scenario, so every screen can be tried. All part stock
  // starts at 0 (see buildCatalog) — the owner adds real stock as it arrives.
  var customers = [
    { id: 'C-sample1', name: 'Kemar Brown', phone: '876-555-0142', email: 'kemar.b@gmail.com', notes: 'Regular — iPhone user', isSample: true, createdAt: daysAgo(20) }
  ];

  var phones = [
    { id: 'PH-sample1', brand: 'Apple', model: 'iPhone 13', storage: '128GB', condition: 'Good', imei: '354812091234567', price: 85000, status: 'Available', isSample: true, createdAt: daysAgo(12) }
  ];

  // Sample tickets. Parts used are taken out of stock at seed time.
  var tickets = [
    {
      id: 'T-sample2', customerId: 'C-sample1', customerName: 'Kemar Brown',
      brand: 'Samsung', model: 'Galaxy A54', issue: 'Battery drains fast, phone gets hot',
      quoted: 9500, deposit: 0, status: 'Awaiting Parts', technician: 'Kemar',
      partsUsed: [],
      createdAt: daysAgo(0), updatedAt: todayStr(), isSample: true
    }
  ];

  // Sample sales (today + yesterday) so the dashboard is alive on first load.
  var sales = [];
  function saleFor(date, customerId, customerName, payment, items) {
    var total = items.reduce(function (s, it) { return s + it.price * it.qty; }, 0);
    return { id: uid('S-'), date: date, customerId: customerId, customerName: customerName, payment: payment, items: items, total: total, isSample: true, createdAt: new Date().toISOString() };
  }
  var scr13 = bySku['APP-IP13-SCR'];
  if (scr13) { scr13.stock = Math.max(0, scr13.stock - 1); }
  sales.push(saleFor(todayStr(), 'C-sample1', 'Kemar Brown', 'Cash', [
    { kind: 'part', refId: scr13 ? scr13.id : '', label: 'Apple iPhone 13 — Display / Screen Assembly', price: scr13 ? scr13.price : 26000, qty: 1 }
  ]));

  return {
    seedVersion: SEED_VERSION,
    settings: {
      shopName: 'Fixtings POS',
      shopContact: 'Fixtings Ja, Falmouth, Trelawny',
      staff: ['Sheldon', 'Kemar']
    },
    role: 'owner',
    customers: customers,
    parts: parts,
    phones: phones,
    tickets: tickets,
    sales: sales
  };
}

// ---------------- roles & permissions ----------------
var ROLES = {
  owner: { label: 'Owner', sections: ['dashboard', 'pos', 'customers', 'repairs', 'parts', 'specs', 'phones', 'reports', 'settings'] },
  sales: { label: 'Sales Assistant', sections: ['dashboard', 'pos', 'customers', 'phones', 'specs'] },
  tech:  { label: 'Technician', sections: ['dashboard', 'repairs', 'parts', 'specs'] }
};
var SECTION_LABELS = {
  dashboard: 'Dashboard', pos: 'New Sale', customers: 'Customers', repairs: 'Repairs',
  parts: 'Parts & Inventory', specs: 'Device Specs', phones: 'Phones for Sale', reports: 'Reports', settings: 'Settings'
};
function role() { return DB.role || 'owner'; }
function canSee(section) { return ROLES[role()].sections.indexOf(section) !== -1; }
function canSeeCosts() { return role() === 'owner'; }

// ---------------- app state ----------------
var currentView = 'dashboard';
var cart = [];            // POS cart: {kind, refId, label, price, qty}
var posQuery = '';
var partsFilter = { brand: '', model: '', type: '', q: '', lowOnly: false };
var ticketFilter = '';
var reportDays = 14;
var specDevice = 'IP13';  // mcode of the device shown in Device Specs
var specTab = 'device';   // 'device' | 'shared'
var specType = '';        // part type selected in the compatibility lookup

// ---------------- modal helpers ----------------
function openModal(html) {
  var root = $('#modal-root');
  root.innerHTML = '<div class="modal-backdrop" onclick="if(event.target===this)App.closeModal()"><div class="modal">' + html + '</div></div>';
}
function closeModal() { $('#modal-root').innerHTML = ''; }
var confirmCb = null;
function openConfirm(msg, cb) {
  confirmCb = cb;
  openModal('<h3>Are you sure?</h3><p>' + esc(msg) + '</p>' +
    '<div class="row-end"><button class="btn" onclick="App.closeModal()">Cancel</button>' +
    '<button class="btn danger" onclick="App.confirmYes()">Yes, do it</button></div>');
}
function confirmYes() { var cb = confirmCb; confirmCb = null; closeModal(); if (cb) cb(); }

function toast(msg) {
  var t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function () { t.classList.add('show'); }, 10);
  setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 2600);
}

// ---------------- shell / navigation ----------------
function renderNav() {
  var nav = $('#nav');
  nav.innerHTML = Object.keys(SECTION_LABELS).map(function (key) {
    if (!canSee(key)) return '';
    return '<button class="nav-btn' + (currentView === key ? ' active' : '') + '" onclick="App.show(\'' + key + '\')">' + SECTION_LABELS[key] + '</button>';
  }).join('');
  var rs = $('#roleSelect');
  if (rs) rs.value = role();
  var sn = $('#shopName');
  if (sn) sn.textContent = DB.settings.shopName;
  var sc = $('#shopContact');
  if (sc) sc.textContent = DB.settings.shopContact;
}

function show(view) {
  if (!canSee(view)) { toast('Your role cannot open ' + (SECTION_LABELS[view] || view)); return; }
  currentView = view;
  renderNav();
  renderView();
  try { window.scrollTo(0, 0); } catch (e) { /* headless environments may not implement scrolling */ }
}

function renderView() {
  var v = $('#view');
  if (currentView === 'dashboard') v.innerHTML = viewDashboard();
  else if (currentView === 'pos') v.innerHTML = viewPOS();
  else if (currentView === 'customers') v.innerHTML = viewCustomers();
  else if (currentView === 'repairs') v.innerHTML = viewRepairs();
  else if (currentView === 'parts') v.innerHTML = viewParts();
  else if (currentView === 'specs') v.innerHTML = viewSpecs();
  else if (currentView === 'phones') v.innerHTML = viewPhones();
  else if (currentView === 'reports') v.innerHTML = viewReports();
  else if (currentView === 'settings') v.innerHTML = viewSettings();
  else v.innerHTML = viewDashboard();
  bindViewInputs();
  if (currentView === 'pos') { renderPOSResults(); renderCart(); }
  if (currentView === 'parts') { renderPartsTable(); }
}

function bindViewInputs() {
  var pq = $('#posSearch');
  if (pq) { pq.value = posQuery; pq.addEventListener('input', function () { posQuery = pq.value; renderPOSResults(); }); }
  var pf = $('#partsSearch');
  if (pf) { pf.value = partsFilter.q; pf.addEventListener('input', function () { partsFilter.q = pf.value; renderPartsTable(); }); }
}

// ---------------- dashboard ----------------
function salesOn(date) { return DB.sales.filter(function (s) { return s.date === date; }); }
function salesTotal(list) { return list.reduce(function (s, x) { return s + (x.total || 0); }, 0); }
function openTickets() { return DB.tickets.filter(function (t) { return t.status !== 'Collected'; }); }
function lowStock() { return DB.parts.filter(function (p) { return p.stock <= p.threshold; }); }
function availablePhones() { return DB.phones.filter(function (p) { return p.status === 'Available'; }); }

function viewDashboard() {
  var todaySales = salesOn(todayStr());
  var low = lowStock().slice(0, 8);
  var open = openTickets();
  var recent = DB.sales.slice().sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); }).slice(0, 6);
  return '' +
  '<h1>Dashboard</h1>' +
  '<p class="sub">' + esc(DB.settings.shopContact) + ' &middot; ' + dstr(todayStr()) + '</p>' +
  '<div class="cards">' +
    '<div class="card stat"><div class="stat-label">Today&rsquo;s sales</div><div class="stat-value">' + fmt(salesTotal(todaySales)) + '</div><div class="stat-note">' + todaySales.length + ' sale' + (todaySales.length === 1 ? '' : 's') + ' today</div></div>' +
    '<div class="card stat"><div class="stat-label">Open repair tickets</div><div class="stat-value">' + open.length + '</div><div class="stat-note">' + open.filter(function (t) { return t.status === 'Ready'; }).length + ' ready for collection</div></div>' +
    '<div class="card stat warn"><div class="stat-label">Low stock alerts</div><div class="stat-value">' + lowStock().length + '</div><div class="stat-note">parts at or below threshold</div></div>' +
    '<div class="card stat"><div class="stat-label">Phones for sale</div><div class="stat-value">' + availablePhones().length + '</div><div class="stat-note">' + DB.phones.length + ' listed in total</div></div>' +
  '</div>' +
  '<div class="grid-2">' +
    '<div class="card"><h2>Recent sales</h2>' + (recent.length ? '<table class="tbl"><thead><tr><th>Date</th><th>Customer</th><th>Payment</th><th class="r">Total</th></tr></thead><tbody>' +
      recent.map(function (s) { return '<tr><td>' + dstr(s.date) + '</td><td>' + esc(s.customerName || 'Walk-in') + '</td><td>' + esc(s.payment) + '</td><td class="r">' + fmt(s.total) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">No sales yet.</p>') +
      '<button class="btn" onclick="App.show(\'pos\')">New sale</button></div>' +
    '<div class="card"><h2>Low stock</h2>' + (low.length ? '<table class="tbl"><thead><tr><th>Part</th><th class="r">Stock</th><th class="r">Price</th></tr></thead><tbody>' +
      low.map(function (p) { return '<tr><td>' + esc(p.brand + ' ' + p.model + ' — ' + p.label) + '</td><td class="r bad">' + p.stock + '</td><td class="r">' + fmt(p.price) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">Nothing low on stock.</p>') +
      '<button class="btn" onclick="App.show(\'parts\')">Manage inventory</button></div>' +
  '</div>' +
  '<div class="card"><h2>Open repair tickets</h2>' + (open.length ? '<table class="tbl"><thead><tr><th>Customer</th><th>Device</th><th>Issue</th><th>Technician</th><th>Status</th><th class="r">Balance due</th></tr></thead><tbody>' +
    open.map(function (t) { return '<tr><td>' + esc(t.customerName) + '</td><td>' + esc(t.brand + ' ' + t.model) + '</td><td>' + esc(t.issue) + '</td><td>' + esc(t.technician || '—') + '</td><td><span class="badge st-' + t.status.replace(/ /g, '') + '">' + esc(t.status) + '</span></td><td class="r">' + fmt(Math.max(0, (t.quoted || 0) - (t.deposit || 0))) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">No open tickets.</p>') +
    '<button class="btn" onclick="App.show(\'repairs\')">Open repairs</button></div>';
}

// ---------------- POS ----------------
function cartTotal() { return cart.reduce(function (s, it) { return s + it.price * it.qty; }, 0); }

function matchesQuery(hay, q) {
  // Every word in the query must appear somewhere in the haystack,
  // so "iPhone 13 screen" matches "iPhone 13 — Display / Screen Assembly".
  var words = String(q || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  var h = String(hay || '').toLowerCase();
  for (var i = 0; i < words.length; i++) { if (h.indexOf(words[i]) === -1) return false; }
  return true;
}

function posSearchResults() {
  var q = posQuery.trim();
  var out = [];
  DB.parts.forEach(function (p) {
    if (p.stock <= 0) return;
    if (!matchesQuery(p.brand + ' ' + p.model + ' ' + p.label + ' ' + p.sku, q)) return;
    out.push({ kind: 'part', refId: p.id, label: p.brand + ' ' + p.model + ' — ' + p.label, price: p.price, stock: p.stock });
  });
  DB.phones.forEach(function (ph) {
    if (ph.status !== 'Available') return;
    if (!matchesQuery(ph.brand + ' ' + ph.model + ' ' + ph.storage + ' ' + ph.imei, q)) return;
    out.push({ kind: 'phone', refId: ph.id, label: ph.brand + ' ' + ph.model + ' ' + ph.storage + ' (' + ph.condition + ')', price: ph.price, stock: 1 });
  });
  return out.slice(0, 40);
}

function viewPOS() {
  return '' +
  '<h1>New Sale</h1><p class="sub">Add parts or phones for sale to the cart, pick a customer and payment method.</p>' +
  '<div class="grid-pos">' +
    '<div class="card"><h2>Find item</h2>' +
      '<input id="posSearch" class="input" type="search" placeholder="Search parts or phones — e.g. iPhone 13 screen" autocomplete="off">' +
      '<div id="posResults"></div></div>' +
    '<div class="card"><h2>Cart</h2><div id="cartBox"></div>' +
      '<label class="lbl">Customer</label>' +
      '<select id="posCustomer" class="input"><option value="">Walk-in customer</option>' +
      DB.customers.map(function (c) { return '<option value="' + c.id + '">' + esc(c.name) + ' — ' + esc(c.phone) + '</option>'; }).join('') + '</select>' +
      '<label class="lbl">Payment method</label>' +
      '<div class="pay-row">' +
        ['Cash', 'Card', 'Transfer'].map(function (m) { return '<label class="pay-opt"><input type="radio" name="payMethod" value="' + m + '"' + (m === 'Cash' ? ' checked' : '') + '> ' + m + '</label>'; }).join('') +
      '</div>' +
      '<div class="cart-total">Total: <strong>' + fmt(cartTotal()) + '</strong></div>' +
      '<button class="btn primary big" onclick="App.completeSale()">Complete sale</button> ' +
      '<button class="btn" onclick="App.clearCart()">Clear cart</button></div>' +
  '</div>';
}

function renderPOSResults() {
  var box = $('#posResults');
  if (!box) return;
  var res = posSearchResults();
  if (!res.length) { box.innerHTML = '<p class="muted">No matching items in stock. Try another search.</p>'; return; }
  box.innerHTML = res.map(function (r) {
    return '<div class="result-row"><div><strong>' + esc(r.label) + '</strong><div class="muted small">' + (r.kind === 'part' ? 'Part' : 'Phone for sale') + ' &middot; ' + r.stock + ' in stock &middot; ' + fmt(r.price) + '</div></div>' +
      '<button class="btn small" onclick="App.addToCart(\'' + r.kind + '\',\'' + r.refId + '\')">Add</button></div>';
  }).join('');
}

function renderCart() {
  var box = $('#cartBox');
  if (!box) return;
  if (!cart.length) { box.innerHTML = '<p class="muted">Cart is empty.</p>'; return; }
  box.innerHTML = '<table class="tbl"><thead><tr><th>Item</th><th class="r">Price</th><th class="r">Qty</th><th class="r">Amount</th><th></th></tr></thead><tbody>' +
    cart.map(function (it, i) {
      return '<tr><td>' + esc(it.label) + '</td><td class="r">' + fmt(it.price) + '</td>' +
        '<td class="r"><button class="btn tiny" onclick="App.cartQty(' + i + ',-1)">−</button> ' + it.qty + ' <button class="btn tiny" onclick="App.cartQty(' + i + ',1)">+</button></td>' +
        '<td class="r">' + fmt(it.price * it.qty) + '</td><td><button class="btn tiny danger" onclick="App.cartRemove(' + i + ')">×</button></td></tr>';
    }).join('') + '</tbody></table>';
}

function addToCart(kind, refId) {
  var item = null;
  if (kind === 'part') { var p = DB.parts.find(function (x) { return x.id === refId; }); if (p) item = { kind: kind, refId: p.id, label: p.brand + ' ' + p.model + ' — ' + p.label, price: p.price, max: p.stock }; }
  else { var ph = DB.phones.find(function (x) { return x.id === refId; }); if (ph) item = { kind: kind, refId: ph.id, label: ph.brand + ' ' + ph.model + ' ' + ph.storage + ' (' + ph.condition + ')', price: ph.price, max: 1 }; }
  if (!item) return;
  var ex = cart.find(function (c) { return c.kind === kind && c.refId === refId; });
  if (ex) {
    if (ex.qty + 1 > item.max) { toast('Only ' + item.max + ' in stock'); return; }
    ex.qty += 1;
  } else {
    cart.push({ kind: item.kind, refId: item.refId, label: item.label, price: item.price, qty: 1, max: item.max });
  }
  renderCart();
  var totalEl = document.querySelector('.cart-total strong');
  if (totalEl) totalEl.textContent = fmt(cartTotal());
}

function cartQty(i, d) {
  var it = cart[i];
  if (!it) return;
  it.qty += d;
  if (it.qty <= 0) cart.splice(i, 1);
  if (it.qty > it.max) { it.qty = it.max; toast('Only ' + it.max + ' in stock'); }
  renderCart();
  var totalEl = document.querySelector('.cart-total strong');
  if (totalEl) totalEl.textContent = fmt(cartTotal());
}
function cartRemove(i) { cart.splice(i, 1); renderCart(); var t = document.querySelector('.cart-total strong'); if (t) t.textContent = fmt(cartTotal()); }
function clearCart() { cart = []; renderCart(); var t = document.querySelector('.cart-total strong'); if (t) t.textContent = fmt(0); }

function completeSale() {
  if (!cart.length) { toast('Cart is empty — add an item first'); return; }
  var custSel = $('#posCustomer');
  var custId = custSel ? custSel.value : '';
  var cust = DB.customers.find(function (c) { return c.id === custId; });
  var pay = 'Cash';
  var checked = document.querySelector('input[name="payMethod"]:checked');
  if (checked) pay = checked.value;
  // Re-check stock before finalising.
  for (var i = 0; i < cart.length; i++) {
    var it = cart[i];
    if (it.kind === 'part') {
      var p = DB.parts.find(function (x) { return x.id === it.refId; });
      if (!p || p.stock < it.qty) { toast('Not enough stock: ' + it.label); return; }
    } else {
      var ph = DB.phones.find(function (x) { return x.id === it.refId; });
      if (!ph || ph.status !== 'Available') { toast('Phone no longer available: ' + it.label); return; }
    }
  }
  var items = cart.map(function (it) { return { kind: it.kind, refId: it.refId, label: it.label, price: it.price, qty: it.qty }; });
  var sale = { id: uid('S-'), date: todayStr(), customerId: custId || null, customerName: cust ? cust.name : 'Walk-in', payment: pay, items: items, total: cartTotal(), isSample: false, createdAt: new Date().toISOString() };
  items.forEach(function (it) {
    if (it.kind === 'part') { var p = DB.parts.find(function (x) { return x.id === it.refId; }); if (p) p.stock = Math.max(0, p.stock - it.qty); }
    else { var ph = DB.phones.find(function (x) { return x.id === it.refId; }); if (ph) ph.status = 'Sold'; }
  });
  DB.sales.push(sale);
  saveDB();
  cart = [];
  showReceipt(sale);
  renderView();
  toast('Sale recorded — ' + fmt(sale.total));
}

function showReceipt(sale) {
  var lines = sale.items.map(function (it) {
    return '<tr><td>' + esc(it.label) + '</td><td class="r">' + it.qty + '</td><td class="r">' + fmt(it.price) + '</td><td class="r">' + fmt(it.price * it.qty) + '</td></tr>';
  }).join('');
  var html = '<div class="receipt">' +
    '<h2>' + esc(DB.settings.shopName) + '</h2><p>' + esc(DB.settings.shopContact) + '</p>' +
    '<p>Receipt #' + esc(sale.id) + '<br>' + dtime(sale.createdAt) + '<br>Customer: ' + esc(sale.customerName) + '<br>Payment: ' + esc(sale.payment) + '</p>' +
    '<table class="tbl"><thead><tr><th>Item</th><th class="r">Qty</th><th class="r">Price</th><th class="r">Amount</th></tr></thead><tbody>' + lines + '</tbody></table>' +
    '<p class="receipt-total">Total: ' + fmt(sale.total) + '</p><p>Thank you for shopping with ' + esc(DB.settings.shopName) + '!</p></div>';
  $('#receipt-root').innerHTML = html;
  openModal(html + '<div class="row-end"><button class="btn" onclick="App.closeModal()">Close</button><button class="btn primary" onclick="window.print()">Print receipt</button></div>');
}

// ---------------- customers ----------------
function viewCustomers() {
  return '' +
  '<h1>Customers</h1><p class="sub">' + DB.customers.length + ' customers on file.</p>' +
  '<div class="row-end"><button class="btn primary" onclick="App.customerForm()">+ Add customer</button></div>' +
  '<div class="card"><table class="tbl"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Notes</th><th></th></tr></thead><tbody>' +
  DB.customers.map(function (c) {
    return '<tr><td><a href="javascript:void(0)" onclick="App.customerDetail(\'' + c.id + '\')"><strong>' + esc(c.name) + '</strong></a>' + (c.isSample ? ' <span class="tag">sample</span>' : '') + '</td>' +
      '<td>' + esc(c.phone) + '</td><td>' + esc(c.email || '—') + '</td><td>' + esc(c.notes || '') + '</td>' +
      '<td class="r"><button class="btn small" onclick="App.customerForm(\'' + c.id + '\')">Edit</button> ' +
      '<button class="btn small danger" onclick="App.deleteCustomer(\'' + c.id + '\')">Delete</button></td></tr>';
  }).join('') + '</tbody></table></div>';
}

function customerForm(id) {
  var c = id ? DB.customers.find(function (x) { return x.id === id; }) : null;
  openModal('<h3>' + (c ? 'Edit customer' : 'Add customer') + '</h3>' +
    '<form onsubmit="App.saveCustomer(event,\'' + (c ? c.id : '') + '\')">' +
    '<label class="lbl">Name *</label><input name="name" class="input" required value="' + esc(c ? c.name : '') + '">' +
    '<label class="lbl">Phone *</label><input name="phone" class="input" required value="' + esc(c ? c.phone : '') + '" placeholder="876-555-0000">' +
    '<label class="lbl">Email (optional)</label><input name="email" type="email" class="input" value="' + esc(c ? c.email : '') + '">' +
    '<label class="lbl">Notes</label><input name="notes" class="input" value="' + esc(c ? c.notes : '') + '">' +
    '<div class="row-end"><button type="button" class="btn" onclick="App.closeModal()">Cancel</button><button class="btn primary" type="submit">Save customer</button></div></form>');
}
function saveCustomer(ev, id) {
  ev.preventDefault();
  var f = ev.target;
  var data = { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), notes: f.notes.value.trim() };
  if (!data.name || !data.phone) { toast('Name and phone are required'); return; }
  if (id) {
    var c = DB.customers.find(function (x) { return x.id === id; });
    if (c) { c.name = data.name; c.phone = data.phone; c.email = data.email; c.notes = data.notes; }
  } else {
    DB.customers.push({ id: uid('C-'), name: data.name, phone: data.phone, email: data.email, notes: data.notes, isSample: false, createdAt: todayStr() });
  }
  saveDB(); closeModal(); renderView(); toast('Customer saved');
}
function deleteCustomer(id) {
  var c = DB.customers.find(function (x) { return x.id === id; });
  if (!c) return;
  openConfirm('Delete customer ' + c.name + '? Their sales and repair history will stay on record but lose the customer link.', function () {
    DB.customers = DB.customers.filter(function (x) { return x.id !== id; });
    saveDB(); renderView(); toast('Customer deleted');
  });
}
function customerDetail(id) {
  var c = DB.customers.find(function (x) { return x.id === id; });
  if (!c) return;
  var sales = DB.sales.filter(function (s) { return s.customerId === id; });
  var tickets = DB.tickets.filter(function (t) { return t.customerId === id; });
  var spent = salesTotal(sales);
  openModal('<h3>' + esc(c.name) + '</h3>' +
    '<p>' + esc(c.phone) + (c.email ? ' &middot; ' + esc(c.email) : '') + '</p>' +
    (c.notes ? '<p class="muted">' + esc(c.notes) + '</p>' : '') +
    '<p><strong>' + sales.length + ' sale(s)</strong> &middot; ' + fmt(spent) + ' spent &middot; <strong>' + tickets.length + ' repair ticket(s)</strong></p>' +
    '<h4>Sales history</h4>' + (sales.length ? '<table class="tbl"><thead><tr><th>Date</th><th>Items</th><th class="r">Total</th></tr></thead><tbody>' +
      sales.map(function (s) { return '<tr><td>' + dstr(s.date) + '</td><td>' + esc(s.items.map(function (i) { return i.label; }).join('; ')) + '</td><td class="r">' + fmt(s.total) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">No sales yet.</p>') +
    '<h4>Repair history</h4>' + (tickets.length ? '<table class="tbl"><thead><tr><th>Date</th><th>Device</th><th>Status</th><th class="r">Quoted</th></tr></thead><tbody>' +
      tickets.map(function (t) { return '<tr><td>' + dstr(t.createdAt) + '</td><td>' + esc(t.brand + ' ' + t.model) + '</td><td>' + esc(t.status) + '</td><td class="r">' + fmt(t.quoted) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">No repairs yet.</p>') +
    '<div class="row-end"><button class="btn" onclick="App.closeModal()">Close</button></div>');
}

// ---------------- repairs ----------------
var TICKET_STATUSES = ['Received', 'Diagnosing', 'Awaiting Parts', 'In Repair', 'Ready', 'Collected'];
var STATUS_CLASS = { 'Received': 'st-Received', 'Diagnosing': 'st-Diagnosing', 'Awaiting Parts': 'st-AwaitingParts', 'In Repair': 'st-InRepair', 'Ready': 'st-Ready', 'Collected': 'st-Collected' };

function viewRepairs() {
  var list = DB.tickets.slice().sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); });
  if (ticketFilter) list = list.filter(function (t) { return t.status === ticketFilter; });
  return '' +
  '<h1>Repair Tickets</h1><p class="sub">' + openTickets().length + ' open &middot; ' + DB.tickets.length + ' total.</p>' +
  '<div class="toolbar"><select class="input inline" onchange="App.setTicketFilter(this.value)"><option value="">All statuses</option>' +
    TICKET_STATUSES.map(function (s) { return '<option value="' + s + '"' + (ticketFilter === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select> ' +
    '<button class="btn primary" onclick="App.ticketForm()">+ New repair ticket</button></div>' +
  '<div class="card"><table class="tbl"><thead><tr><th>Customer</th><th>Device</th><th>Issue</th><th>Technician</th><th>Status</th><th class="r">Quoted</th><th class="r">Balance</th><th></th></tr></thead><tbody>' +
  (list.length ? list.map(function (t) {
    var bal = Math.max(0, (t.quoted || 0) - (t.deposit || 0));
    return '<tr><td>' + esc(t.customerName) + '</td><td>' + esc(t.brand + ' ' + t.model) + '</td><td>' + esc(t.issue) + '</td><td>' + esc(t.technician || '—') + '</td>' +
      '<td><span class="badge ' + (STATUS_CLASS[t.status] || '') + '">' + esc(t.status) + '</span></td><td class="r">' + fmt(t.quoted) + '</td><td class="r">' + fmt(bal) + '</td>' +
      '<td class="r"><button class="btn small" onclick="App.ticketDetail(\'' + t.id + '\')">Open</button></td></tr>';
  }).join('') : '<tr><td colspan="8" class="muted">No tickets match.</td></tr>') + '</tbody></table></div>';
}
function setTicketFilter(v) { ticketFilter = v; renderView(); }

function ticketForm() {
  openModal('<h3>New repair ticket</h3>' +
    '<form onsubmit="App.saveTicket(event)">' +
    '<label class="lbl">Customer *</label><select name="customerId" class="input" required><option value="">Select customer…</option>' +
    DB.customers.map(function (c) { return '<option value="' + c.id + '">' + esc(c.name) + ' — ' + esc(c.phone) + '</option>'; }).join('') + '</select>' +
    '<div class="grid-2col"><div><label class="lbl">Brand *</label><select name="brand" class="input" required><option value="">Select…</option><option>Apple</option><option>Samsung</option><option>Google</option><option>Xiaomi</option><option>Poco</option><option>Huawei</option><option>Motorola</option><option>Infinix</option><option>Tecno</option><option>Other</option></select></div>' +
    '<div><label class="lbl">Model *</label><input name="model" class="input" required placeholder="e.g. iPhone 13"></div></div>' +
    '<label class="lbl">Issue / problem *</label><textarea name="issue" class="input" rows="2" required placeholder="e.g. Cracked screen"></textarea>' +
    '<div class="grid-2col"><div><label class="lbl">Quoted price (JMD) *</label><input name="quoted" type="number" min="0" step="1" class="input" required></div>' +
    '<div><label class="lbl">Deposit paid (JMD)</label><input name="deposit" type="number" min="0" step="1" class="input" value="0"></div></div>' +
    '<label class="lbl">Assign technician</label><select name="technician" class="input">' + DB.settings.staff.map(function (s) { return '<option>' + esc(s) + '</option>'; }).join('') + '</select>' +
    '<div class="row-end"><button type="button" class="btn" onclick="App.closeModal()">Cancel</button><button class="btn primary" type="submit">Create ticket</button></div></form>');
}
function saveTicket(ev) {
  ev.preventDefault();
  var f = ev.target;
  var cust = DB.customers.find(function (c) { return c.id === f.customerId.value; });
  var t = {
    id: uid('T-'), customerId: f.customerId.value, customerName: cust ? cust.name : '',
    brand: f.brand.value, model: f.model.value.trim(), issue: f.issue.value.trim(),
    quoted: num(f.quoted.value), deposit: num(f.deposit.value), status: 'Received',
    technician: f.technician.value, partsUsed: [], createdAt: todayStr(), updatedAt: todayStr(), isSample: false
  };
  DB.tickets.push(t);
  saveDB(); closeModal(); renderView(); toast('Ticket created — ' + t.brand + ' ' + t.model);
}

function ticketDetail(id) {
  var t = DB.tickets.find(function (x) { return x.id === id; });
  if (!t) return;
  var bal = Math.max(0, (t.quoted || 0) - (t.deposit || 0));
  var partsTotal = t.partsUsed.reduce(function (s, p) { return s + p.price * p.qty; }, 0);
  var labour = Math.max(0, (t.quoted || 0) - partsTotal);
  openModal('<h3>' + esc(t.brand + ' ' + t.model) + ' — ' + esc(t.customerName) + '</h3>' +
    '<p class="muted">Ticket ' + esc(t.id) + ' &middot; opened ' + dstr(t.createdAt) + '</p>' +
    '<p><strong>Issue:</strong> ' + esc(t.issue) + '</p>' +
    '<p><strong>Status:</strong> <span class="badge ' + (STATUS_CLASS[t.status] || '') + '">' + esc(t.status) + '</span></p>' +
    '<div class="status-flow">' + TICKET_STATUSES.map(function (s) {
      return '<button class="btn small' + (t.status === s ? ' primary' : '') + '" onclick="App.setTicketStatus(\'' + t.id + '\',\'' + s + '\')">' + s + '</button>';
    }).join('') + '</div>' +
    '<div class="grid-2col"><div><label class="lbl">Technician</label><select id="techSel" class="input">' +
      DB.settings.staff.map(function (s) { return '<option' + (t.technician === s ? ' selected' : '') + '>' + esc(s) + '</option>'; }).join('') +
      '</select></div>' +
    '<div><label class="lbl">Quoted / Deposit / Balance</label><p><strong>' + fmt(t.quoted) + '</strong> / ' + fmt(t.deposit) + ' / <strong>' + fmt(bal) + '</strong></p></div></div>' +
    '<button class="btn small" onclick="App.saveTicketTech(\'' + t.id + '\')">Save technician</button>' +
    '<h4>Parts used (' + fmt(partsTotal) + ')</h4>' +
    (t.partsUsed.length ? '<table class="tbl"><thead><tr><th>Part</th><th class="r">Qty</th><th class="r">Price</th></tr></thead><tbody>' +
      t.partsUsed.map(function (p) { return '<tr><td>' + esc(p.label) + '</td><td class="r">' + p.qty + '</td><td class="r">' + fmt(p.price * p.qty) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">No parts attached yet.</p>') +
    (t.status !== 'Collected' ? (function () {
      var fitting = (typeof partFitsDevice === 'function') ? DB.parts.filter(function (p) { return p.stock > 0 && partFitsDevice(p, t.brand, t.model); }) : [];
      var own = fitting.filter(function (p) { return p.brand === t.brand && p.model === t.model; });
      var shared = fitting.filter(function (p) { return !(p.brand === t.brand && p.model === t.model); });
      var rows = '';
      function fitRow(p) {
        var kind = partFitsDevice(p, t.brand, t.model);
        return '<tr><td>' + esc(p.label) + '<div class="muted small">listed for ' + esc(p.brand + ' ' + p.model) + ' &middot; ' + p.stock + ' in stock</div></td><td>' + fitBadge(kind) + '</td><td class="r">' + fmt(p.price) + '</td><td class="r"><button class="btn small" onclick="App.attachPartById(\'' + t.id + '\',\'' + p.id + '\')">Attach</button></td></tr>';
      }
      if (own.length) rows += own.map(fitRow).join('');
      if (shared.length) rows += '<tr><td colspan="4" class="muted small"><strong>Shared parts from other models that fit this device:</strong></td></tr>' + shared.map(fitRow).join('');
      return '<h4>Parts that fit this ' + esc(t.brand + ' ' + t.model) + ' (' + fitting.length + ' in stock)</h4>' +
        (fitting.length ? '<table class="tbl"><thead><tr><th>Part</th><th>Fit</th><th class="r">Price</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>' : '<p class="muted">Nothing in stock fits this device.</p>');
    })() : '') +
    (t.status !== 'Collected' ? '<div class="row"><select id="attachPartSel" class="input"><option value="">Attach any other part…</option>' +
      DB.parts.filter(function (p) { return p.stock > 0; }).map(function (p) { return '<option value="' + p.id + '">' + esc(p.brand + ' ' + p.model + ' — ' + p.label + ' (' + p.stock + ' left) — ' + fmt(p.price)) + '</option>'; }).join('') +
      '</select><button class="btn" onclick="App.attachPart(\'' + t.id + '\')">Attach part</button></div>' : '') +
    '<p class="muted small">Labour portion of quote: ' + fmt(labour) + ' (quoted price less parts used).</p>' +
    '<div class="row-end">' +
      (t.status !== 'Collected' ? '<button class="btn primary" onclick="App.collectTicket(\'' + t.id + '\')">Mark collected &amp; take final payment</button>' : '<span class="tag">Collected</span>') +
      ' <button class="btn danger" onclick="App.deleteTicket(\'' + t.id + '\')">Delete ticket</button>' +
      ' <button class="btn" onclick="App.closeModal()">Close</button></div>');
}
function setTicketStatus(id, status) {
  var t = DB.tickets.find(function (x) { return x.id === id; });
  if (!t) return;
  t.status = status; t.updatedAt = todayStr();
  saveDB(); ticketDetail(id); renderView();
  toast('Ticket → ' + status);
}
function saveTicketTech(id) {
  var t = DB.tickets.find(function (x) { return x.id === id; });
  var sel = $('#techSel');
  if (!t || !sel) return;
  t.technician = sel.value; t.updatedAt = todayStr();
  saveDB(); renderView(); toast('Technician updated');
}
function attachPart(ticketId) {
  var sel = $('#attachPartSel');
  if (!sel || !sel.value) { toast('Pick a part first'); return; }
  attachPartById(ticketId, sel.value);
}
function attachPartById(ticketId, partId) {
  var t = DB.tickets.find(function (x) { return x.id === ticketId; });
  var p = DB.parts.find(function (x) { return x.id === partId; });
  if (!t || !p || p.stock <= 0) { toast('Part not available'); return; }
  p.stock -= 1;
  var ex = t.partsUsed.find(function (u) { return u.partId === p.id; });
  if (ex) ex.qty += 1;
  else t.partsUsed.push({ partId: p.id, sku: p.sku, label: p.brand + ' ' + p.model + ' — ' + p.label, price: p.price, qty: 1 });
  t.updatedAt = todayStr();
  saveDB(); ticketDetail(ticketId); renderView();
  toast('Part attached — stock updated');
}
function collectTicket(id) {
  var t = DB.tickets.find(function (x) { return x.id === id; });
  if (!t) return;
  var bal = Math.max(0, (t.quoted || 0) - (t.deposit || 0));
  var partsTotal = t.partsUsed.reduce(function (s, p) { return s + p.price * p.qty; }, 0);
  var items = t.partsUsed.map(function (p) { return { kind: 'part', refId: p.partId, label: p.label + ' (repair)', price: p.price, qty: p.qty }; });
  var labour = Math.max(0, (t.quoted || 0) - partsTotal);
  if (labour > 0) items.push({ kind: 'repair', refId: t.id, label: 'Repair labour — ' + t.brand + ' ' + t.model, price: labour, qty: 1 });
  openModal('<h3>Collect — ' + esc(t.brand + ' ' + t.model) + '</h3>' +
    '<p>Customer: <strong>' + esc(t.customerName) + '</strong><br>Quoted: ' + fmt(t.quoted) + ' &middot; Deposit paid: ' + fmt(t.deposit) + ' &middot; <strong>Balance due: ' + fmt(bal) + '</strong></p>' +
    '<form onsubmit="App.finishCollect(event,\'' + t.id + '\')">' +
    '<label class="lbl">Final payment method</label><div class="pay-row">' +
    ['Cash', 'Card', 'Transfer'].map(function (m) { return '<label class="pay-opt"><input type="radio" name="payMethod" value="' + m + '"' + (m === 'Cash' ? ' checked' : '') + '> ' + m + '</label>'; }).join('') + '</div>' +
    '<div class="row-end"><button type="button" class="btn" onclick="App.ticketDetail(\'' + t.id + '\')">Back</button><button class="btn primary" type="submit">Record payment &amp; mark collected</button></div></form>');
}
function finishCollect(ev, id) {
  ev.preventDefault();
  var t = DB.tickets.find(function (x) { return x.id === id; });
  if (!t) return;
  var pay = 'Cash';
  var checked = document.querySelector('input[name="payMethod"]:checked');
  if (checked) pay = checked.value;
  var bal = Math.max(0, (t.quoted || 0) - (t.deposit || 0));
  var partsTotal = t.partsUsed.reduce(function (s, p) { return s + p.price * p.qty; }, 0);
  var items = t.partsUsed.map(function (p) { return { kind: 'part', refId: p.partId, label: p.label + ' (repair)', price: p.price, qty: p.qty }; });
  var labour = Math.max(0, (t.quoted || 0) - partsTotal);
  if (labour > 0) items.push({ kind: 'repair', refId: t.id, label: 'Repair labour — ' + t.brand + ' ' + t.model, price: labour, qty: 1 });
  DB.sales.push({ id: uid('S-'), date: todayStr(), customerId: t.customerId, customerName: t.customerName, payment: pay, items: items, total: bal, isSample: false, createdAt: new Date().toISOString(), repairId: t.id });
  t.status = 'Collected'; t.updatedAt = todayStr();
  saveDB(); closeModal(); renderView();
  toast('Collected — ' + fmt(bal) + ' received');
}
function deleteTicket(id) {
  var t = DB.tickets.find(function (x) { return x.id === id; });
  if (!t) return;
  openConfirm('Delete ticket for ' + t.brand + ' ' + t.model + ' (' + t.customerName + ')? Parts already used will stay deducted from stock.', function () {
    DB.tickets = DB.tickets.filter(function (x) { return x.id !== id; });
    saveDB(); renderView(); toast('Ticket deleted');
  });
}

// ---------------- parts & inventory ----------------
function partModelsFor(brand) {
  var models = [];
  DB.parts.forEach(function (p) { if ((!brand || p.brand === brand) && models.indexOf(p.model) === -1) models.push(p.model); });
  return models.sort();
}
function filteredParts() {
  var f = partsFilter;
  var q = f.q.trim().toLowerCase();
  return DB.parts.filter(function (p) {
    if (f.brand && p.brand !== f.brand) return false;
    if (f.model && p.model !== f.model) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.lowOnly && p.stock > p.threshold) return false;
    if (!matchesQuery(p.brand + ' ' + p.model + ' ' + p.label + ' ' + p.sku, q)) return false;
    return true;
  });
}
function viewParts() {
  var brands = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'Poco', 'Huawei', 'Motorola', 'Infinix', 'Tecno'];
  return '' +
  '<h1>Parts &amp; Inventory</h1><p class="sub">' + DB.parts.length + ' parts in the catalog &middot; ' + lowStock().length + ' at or below threshold. ' +
  (canSeeCosts() ? 'Costs shown (owner only).' : 'Costs hidden for your role.') + '</p>' +
  '<div class="card filters"><div class="row wrap">' +
    '<select class="input inline" onchange="App.setPartsFilter(\'brand\',this.value)"><option value="">All brands</option>' +
    brands.map(function (b) { return '<option' + (partsFilter.brand === b ? ' selected' : '') + '>' + b + '</option>'; }).join('') + '</select>' +
    '<select class="input inline" onchange="App.setPartsFilter(\'model\',this.value)"><option value="">All models</option>' +
    partModelsFor(partsFilter.brand).map(function (m) { return '<option' + (partsFilter.model === m ? ' selected' : '') + '>' + esc(m) + '</option>'; }).join('') + '</select>' +
    '<select class="input inline" onchange="App.setPartsFilter(\'type\',this.value)"><option value="">All part types</option>' +
    PART_TYPES.map(function (t) { return '<option value="' + t.key + '"' + (partsFilter.type === t.key ? ' selected' : '') + '>' + t.label + '</option>'; }).join('') + '</select>' +
    '<input id="partsSearch" class="input inline grow" type="search" placeholder="Search SKU, model or part…">' +
    '<label class="chk"><input type="checkbox" ' + (partsFilter.lowOnly ? 'checked' : '') + ' onchange="App.setPartsFilter(\'lowOnly\',this.checked)"> Low stock only</label>' +
    (role() === 'owner' ? '<button class="btn primary" onclick="App.partForm()">+ Add part</button>' : '') +
  '</div></div>' +
  '<div class="card"><div id="partsTable"></div></div>';
}
function renderPartsTable() {
  var box = $('#partsTable');
  if (!box) return;
  var list = filteredParts().slice(0, 200);
  var costs = canSeeCosts();
  box.innerHTML = '<p class="muted small">Showing ' + list.length + ' of ' + DB.parts.length + ' parts' + (filteredParts().length > 200 ? ' (first 200 — narrow the filters)' : '') + '.</p>' +
  '<table class="tbl"><thead><tr><th>SKU</th><th>Part</th><th>Device</th><th>Also fits</th><th class="r">Stock</th>' + (costs ? '<th class="r">Cost</th>' : '') + '<th class="r">Price</th><th class="r">Threshold</th><th></th></tr></thead><tbody>' +
  (list.length ? list.map(function (p) {
    var low = p.stock <= p.threshold;
    var fits = (typeof fitsForPart === 'function') ? fitsForPart(p) : { confirmed: [], specMatched: [] };
    var fitsHtml = '<span class="muted">—</span>';
    if (fits.confirmed.length || fits.specMatched.length) {
      fitsHtml = '<span class="small">' + fits.confirmed.map(function (m) { return esc(m); }).join('<br>') + '</span>' +
        (fits.specMatched.length ? '<br><span class="small muted">verify: ' + fits.specMatched.map(function (m) { return esc(m); }).join(', ') + '</span>' : '');
    }
    return '<tr class="' + (low ? 'low-row' : '') + '"><td>' + esc(p.sku) + '</td><td>' + esc(p.label) + '</td><td>' + esc(p.brand + ' ' + p.model) + '</td><td>' + fitsHtml + '</td>' +
      '<td class="r"><button class="btn tiny" onclick="App.adjustStock(\'' + p.id + '\',-1)">−</button> <strong class="' + (low ? 'bad' : '') + '">' + p.stock + '</strong> <button class="btn tiny" onclick="App.adjustStock(\'' + p.id + '\',1)">+</button></td>' +
      (costs ? '<td class="r">' + fmt(p.cost) + '</td>' : '') +
      '<td class="r">' + fmt(p.price) + '</td><td class="r">' + p.threshold + '</td>' +
      '<td class="r">' + (role() === 'owner' ? '<button class="btn small" onclick="App.partForm(\'' + p.id + '\')">Edit</button> <button class="btn small danger" onclick="App.deletePart(\'' + p.id + '\')">Delete</button>' : '<span class="muted small">view only</span>') + '</td></tr>';
  }).join('') : '<tr><td colspan="9" class="muted">No parts match these filters.</td></tr>') + '</tbody></table>';
}
function setPartsFilter(k, v) {
  partsFilter[k] = v;
  if (k === 'brand') partsFilter.model = '';
  renderView();
}
function adjustStock(id, d) {
  var p = DB.parts.find(function (x) { return x.id === id; });
  if (!p) return;
  p.stock = Math.max(0, p.stock + d);
  saveDB(); renderPartsTable();
}
function partForm(id) {
  if (role() !== 'owner') { toast('Only the owner can add or edit parts'); return; }
  var p = id ? DB.parts.find(function (x) { return x.id === id; }) : null;
  var models = partModelsFor('');
  openModal('<h3>' + (p ? 'Edit part' : 'Add part') + '</h3>' +
    '<form onsubmit="App.savePart(event,\'' + (p ? p.id : '') + '\')">' +
    '<div class="grid-2col"><div><label class="lbl">Brand *</label><select name="brand" class="input" required><option value="">Select…</option>' +
    ['Apple', 'Samsung', 'Google', 'Xiaomi', 'Poco', 'Huawei', 'Motorola', 'Infinix', 'Tecno', 'Other'].map(function (b) { return '<option' + (p && p.brand === b ? ' selected' : '') + '>' + b + '</option>'; }).join('') + '</select></div>' +
    '<div><label class="lbl">Model *</label><input name="model" class="input" required list="modelList" value="' + esc(p ? p.model : '') + '" placeholder="e.g. iPhone 13"><datalist id="modelList">' +
    models.map(function (m) { return '<option value="' + esc(m) + '">'; }).join('') + '</datalist></div></div>' +
    '<label class="lbl">Part type *</label><select name="type" class="input" required>' +
    PART_TYPES.map(function (t) { return '<option value="' + t.key + '"' + (p && p.type === t.key ? ' selected' : '') + '>' + t.label + '</option>'; }).join('') + '</select>' +
    '<label class="lbl">Also fits — other devices this same part fits (optional)</label>' +
    '<select name="fits" class="input" multiple size="6">' +
    DEVICES.filter(function (d) { return !(p && d.brand === p.brand && d.model === p.model); }).map(function (d) {
      var name = d.brand + ' ' + d.model;
      var sel = p && p.fits && p.fits.indexOf(name) !== -1;
      return '<option value="' + esc(name) + '"' + (sel ? ' selected' : '') + '>' + esc(name) + '</option>';
    }).join('') + '</select>' +
    '<p class="muted small">Hold Ctrl (or Cmd on Mac) to pick more than one. Shared-part links from the catalog already apply on top of this.</p>' +
    '<div class="grid-2col"><div><label class="lbl">Cost (JMD)</label><input name="cost" type="number" min="0" step="1" class="input" value="' + (p ? p.cost : 0) + '"></div>' +
    '<div><label class="lbl">Selling price (JMD) *</label><input name="price" type="number" min="0" step="1" class="input" required value="' + (p ? p.price : '') + '"></div></div>' +
    '<div class="grid-2col"><div><label class="lbl">Stock on hand</label><input name="stock" type="number" min="0" step="1" class="input" value="' + (p ? p.stock : 0) + '"></div>' +
    '<div><label class="lbl">Low-stock threshold</label><input name="threshold" type="number" min="0" step="1" class="input" value="' + (p ? p.threshold : 2) + '"></div></div>' +
    (p ? '' : '<p class="muted small">A SKU is generated automatically from brand, model and part type.</p>') +
    '<div class="row-end"><button type="button" class="btn" onclick="App.closeModal()">Cancel</button><button class="btn primary" type="submit">Save part</button></div></form>');
}
function savePart(ev, id) {
  ev.preventDefault();
  var f = ev.target;
  var type = PART_TYPES.find(function (t) { return t.key === f.type.value; }) || PART_TYPES[0];
  var fits = [];
  if (f.fits && f.fits.options) {
    for (var i = 0; i < f.fits.options.length; i++) {
      if (f.fits.options[i].selected) fits.push(f.fits.options[i].value);
    }
  }
  var data = {
    brand: f.brand.value, model: f.model.value.trim(), type: type.key, label: type.label,
    cost: num(f.cost.value), price: num(f.price.value), stock: Math.max(0, Math.round(num(f.stock.value))), threshold: Math.max(0, Math.round(num(f.threshold.value, 2))),
    fits: fits
  };
  if (!data.brand || !data.model || data.price <= 0) { toast('Brand, model and a selling price are required'); return; }
  if (id) {
    var p = DB.parts.find(function (x) { return x.id === id; });
    if (p) { p.brand = data.brand; p.model = data.model; p.type = data.type; p.label = data.label; p.cost = data.cost; p.price = data.price; p.stock = data.stock; p.threshold = data.threshold; p.fits = data.fits; }
  } else {
    var bcode = { Apple: 'APP', Samsung: 'SAM', Google: 'GOO', Xiaomi: 'XIA', Poco: 'POC', Huawei: 'HUA', Motorola: 'MOT', Infinix: 'INF', Tecno: 'TEC' }[data.brand] || 'GEN';
    var mcode = data.model.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) || 'MOD';
    var sku = bcode + '-' + mcode + '-' + type.code;
    var n = 2;
    while (DB.parts.some(function (x) { return x.sku === sku; })) { sku = bcode + '-' + mcode + '-' + type.code + '-' + n; n += 1; }
    DB.parts.push({ id: uid('P-'), sku: sku, brand: data.brand, model: data.model, type: data.type, label: data.label, cost: data.cost, price: data.price, stock: data.stock, threshold: data.threshold, fits: data.fits, isSeed: false });
  }
  saveDB(); closeModal(); renderView(); toast('Part saved');
}
function deletePart(id) {
  var p = DB.parts.find(function (x) { return x.id === id; });
  if (!p) return;
  openConfirm('Delete part ' + p.sku + ' (' + p.brand + ' ' + p.model + ' — ' + p.label + ')?', function () {
    DB.parts = DB.parts.filter(function (x) { return x.id !== id; });
    saveDB(); renderView(); toast('Part deleted');
  });
}

// ---------------- device specs & shared parts ----------------
function specSelectOptions() {
  var brands = [];
  DEVICES.forEach(function (d) { if (brands.indexOf(d.brand) === -1) brands.push(d.brand); });
  return brands.map(function (b) {
    var opts = DEVICES.filter(function (d) { return d.brand === b; }).map(function (d) {
      return '<option value="' + d.mcode + '"' + (specDevice === d.mcode ? ' selected' : '') + '>' + esc(d.model) + '</option>';
    }).join('');
    return '<optgroup label="' + esc(b) + '">' + opts + '</optgroup>';
  }).join('');
}
function setSpecDevice(v) { specDevice = v; renderView(); }
function setSpecTab(v) { specTab = v; renderView(); }
function setSpecType(v) { specType = v; renderView(); }
function typeLabel(key) {
  var t = PART_TYPES.find(function (x) { return x.key === key; });
  return t ? t.label : key;
}
function fitBadge(kind) {
  if (kind === 'own') return '<span class="badge fit-own">This device</span>';
  if (kind === 'confirmed') return '<span class="badge fit-confirmed">Shared part</span>';
  if (kind === 'specMatched') return '<span class="badge fit-spec">Verify fit</span>';
  return '';
}

function viewSpecs() {
  var tabs = '<div class="tabs"><button class="btn small' + (specTab === 'device' ? ' primary' : '') + '" onclick="App.setSpecTab(\'device\')">Device Specs</button> ' +
    '<button class="btn small' + (specTab === 'shared' ? ' primary' : '') + '" onclick="App.setSpecTab(\'shared\')">Shared Parts</button></div>';
  if (specTab === 'shared') return '<h1>Shared Parts</h1><p class="sub">One part, several phones — what fits what.</p>' + tabs + viewSharedParts();
  return '<h1>Device Specs</h1><p class="sub">' + DEVICES.length + ' devices &middot; specs from GSMArena. Pick a device to see its specs and the parts in stock that fit it.</p>' + tabs + viewSpecDevice();
}

function viewSpecDevice() {
  var dev = DEVICES.find(function (d) { return d.mcode === specDevice; }) || DEVICES[0];
  var spec = (typeof specFor === 'function') ? specFor(dev.mcode) : null;
  var html = '<div class="card"><label class="lbl">Device</label>' +
    '<select class="input" onchange="App.setSpecDevice(this.value)">' + specSelectOptions() + '</select>';
  if (spec) {
    html += '<div class="spec-head"><div><h2>' + esc(spec.brand + ' ' + spec.model) + '</h2>' +
      '<p class="muted small">Released ' + spec.year + ' &middot; Specs: <a href="' + esc(spec.url) + '" target="_blank" rel="noopener">GSMArena</a></p></div></div>' +
      '<div class="spec-grid">' +
      '<div class="spec-cell"><div class="spec-label">Display</div><div class="spec-value">' + spec.display + '&Prime; ' + esc(spec.panel) + '</div><div class="muted small">' + esc(spec.resolution) + ' &middot; ' + (spec.refresh ? spec.refresh + 'Hz' : '—') + '</div></div>' +
      '<div class="spec-cell"><div class="spec-label">Battery</div><div class="spec-value">' + spec.battery.toLocaleString('en-US') + ' mAh</div><div class="muted small">' + (spec.chargingW ? spec.chargingW + 'W wired charging' : 'Wired charging (PD)') + '</div></div>' +
      '<div class="spec-cell"><div class="spec-label">Charging port</div><div class="spec-value">' + esc(spec.port) + '</div></div>' +
      '<div class="spec-cell"><div class="spec-label">Chipset</div><div class="spec-value">' + esc(spec.chipset) + '</div></div>' +
      '<div class="spec-cell"><div class="spec-label">RAM / Storage</div><div class="spec-value">' + esc(spec.ram) + '</div><div class="muted small">' + esc(spec.storage) + '</div></div>' +
      '<div class="spec-cell"><div class="spec-label">Released</div><div class="spec-value">' + spec.year + '</div></div>' +
      '</div>';
  } else {
    html += '<p class="muted">No specs on file for this device yet.</p>';
  }
  html += '</div>';

  // Parts in stock that fit this device (own parts + shared parts).
  var fitting = DB.parts.filter(function (p) {
    return p.stock > 0 && (typeof partFitsDevice === 'function') && partFitsDevice(p, dev.brand, dev.model);
  });
  html += '<div class="card"><h2>Parts in stock that fit the ' + esc(dev.brand + ' ' + dev.model) + ' (' + fitting.length + ')</h2>' +
    (fitting.length ? '<table class="tbl"><thead><tr><th>Part</th><th>Listed for</th><th>Fit</th><th class="r">Stock</th><th class="r">Price</th></tr></thead><tbody>' +
      fitting.map(function (p) {
        var kind = partFitsDevice(p, dev.brand, dev.model);
        return '<tr><td>' + esc(p.label) + '</td><td>' + esc(p.brand + ' ' + p.model) + '</td><td>' + fitBadge(kind) + '</td><td class="r">' + p.stock + '</td><td class="r">' + fmt(p.price) + '</td></tr>';
      }).join('') + '</tbody></table>' : '<p class="muted">Nothing in stock fits this device.</p>') + '</div>';

  // Compatibility lookup: pick a part type, see which devices share it.
  var groups = specType && (typeof sharedGroupsFor === 'function') ? sharedGroupsFor(specType) : [];
  html += '<div class="card"><h2>What fits what?</h2><p class="muted small">Pick a part type to see every device it fits — confirmed shares first, spec-matched (verify fit) after.</p>' +
    '<select class="input" onchange="App.setSpecType(this.value)"><option value="">Select a part type…</option>' +
    PART_TYPES.map(function (t) { return '<option value="' + t.key + '"' + (specType === t.key ? ' selected' : '') + '>' + t.label + '</option>'; }).join('') + '</select>' +
    (specType ? (groups.length ? groups.map(function (g) {
      return '<div class="compat-group' + (g.status === 'specMatched' ? ' spec' : '') + '"><strong>' + esc(typeLabel(g.part)) + '</strong> ' +
        (g.status === 'confirmed' ? '<span class="badge fit-confirmed">Confirmed shared</span>' : '<span class="badge fit-spec">Spec-matched — verify fit</span>') +
        '<div>' + g.models.map(function (m) { return esc(m); }).join(' &middot; ') + '</div>' +
        '<div class="muted small">' + esc(g.note) + '</div></div>';
    }).join('') : '<p class="muted">No shared parts recorded for ' + esc(typeLabel(specType)) + ' — every device uses its own.</p>') : '') +
    '</div>';
  return html;
}

function viewSharedParts() {
  var confirmed = (typeof SHARED_PARTS !== 'undefined') ? SHARED_PARTS.filter(function (g) { return g.status === 'confirmed'; }) : [];
  var specMatched = (typeof SHARED_PARTS !== 'undefined') ? SHARED_PARTS.filter(function (g) { return g.status === 'specMatched'; }) : [];
  function groupRows(list) {
    return list.map(function (g) {
      return '<tr><td><strong>' + esc(typeLabel(g.part)) + '</strong></td><td>' + g.models.map(function (m) { return esc(m); }).join('<br>') + '</td><td>' + esc(g.note) + '</td></tr>';
    }).join('');
  }
  return '' +
  '<div class="card"><h2>Confirmed shared parts (' + confirmed.length + ')</h2>' +
    '<p class="muted small">These parts are established in the repair trade as interchangeable between the listed models — same part, same fit.</p>' +
    (confirmed.length ? '<table class="tbl"><thead><tr><th>Part</th><th>Fits</th><th>Why</th></tr></thead><tbody>' + groupRows(confirmed) + '</tbody></table>' : '<p class="muted">None recorded yet.</p>') + '</div>' +
  '<div class="card spec-warn"><h2>Spec-matched only — verify fit before ordering (' + specMatched.length + ')</h2>' +
    '<p class="muted small">These models share the same size and type on paper (same screen size, same battery capacity), but the fit is NOT confirmed. Check connectors, brackets and shape before ordering or fitting.</p>' +
    (specMatched.length ? '<table class="tbl"><thead><tr><th>Part</th><th>Looks the same on</th><th>Why it is only a candidate</th></tr></thead><tbody>' + groupRows(specMatched) + '</tbody></table>' : '<p class="muted">None recorded yet.</p>') + '</div>';
}

// ---------------- phones for sale ----------------
function viewPhones() {
  return '' +
  '<h1>Phones for Sale</h1><p class="sub">' + availablePhones().length + ' available &middot; ' + DB.phones.length + ' listed.</p>' +
  '<div class="row-end"><button class="btn primary" onclick="App.phoneForm()">+ Add phone</button></div>' +
  '<div class="card"><table class="tbl"><thead><tr><th>Phone</th><th>Storage</th><th>Condition</th><th>IMEI / Serial</th><th class="r">Price</th><th>Status</th><th></th></tr></thead><tbody>' +
  DB.phones.map(function (ph) {
    return '<tr><td><strong>' + esc(ph.brand + ' ' + ph.model) + '</strong>' + (ph.isSample ? ' <span class="tag">sample</span>' : '') + '</td>' +
      '<td>' + esc(ph.storage) + '</td><td>' + esc(ph.condition) + '</td><td>' + esc(ph.imei || '—') + '</td>' +
      '<td class="r">' + fmt(ph.price) + '</td><td><span class="badge ph-' + ph.status + '">' + esc(ph.status) + '</span></td>' +
      '<td class="r"><button class="btn small" onclick="App.phoneForm(\'' + ph.id + '\')">Edit</button> ' +
      (ph.status !== 'Sold' ? '<button class="btn small" onclick="App.setPhoneStatus(\'' + ph.id + '\',\'Sold\')">Mark sold</button> ' : '') +
      (ph.status !== 'Available' ? '<button class="btn small" onclick="App.setPhoneStatus(\'' + ph.id + '\',\'Available\')">Make available</button> ' : '') +
      '<button class="btn small danger" onclick="App.deletePhone(\'' + ph.id + '\')">Delete</button></td></tr>';
  }).join('') + '</tbody></table></div>';
}
function phoneForm(id) {
  var ph = id ? DB.phones.find(function (x) { return x.id === id; }) : null;
  openModal('<h3>' + (ph ? 'Edit phone' : 'Add phone for sale') + '</h3>' +
    '<form onsubmit="App.savePhone(event,\'' + (ph ? ph.id : '') + '\')">' +
    '<div class="grid-2col"><div><label class="lbl">Brand *</label><select name="brand" class="input" required><option value="">Select…</option>' +
    ['Apple', 'Samsung', 'Google', 'Xiaomi', 'Poco', 'Huawei', 'Motorola', 'Infinix', 'Tecno', 'Other'].map(function (b) { return '<option' + (ph && ph.brand === b ? ' selected' : '') + '>' + b + '</option>'; }).join('') + '</select></div>' +
    '<div><label class="lbl">Model *</label><input name="model" class="input" required value="' + esc(ph ? ph.model : '') + '" placeholder="e.g. iPhone 13"></div></div>' +
    '<div class="grid-2col"><div><label class="lbl">Storage *</label><select name="storage" class="input" required>' +
    ['64GB', '128GB', '256GB', '512GB', '1TB'].map(function (s) { return '<option' + (ph && ph.storage === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div>' +
    '<div><label class="lbl">Condition *</label><select name="condition" class="input" required>' +
    ['Excellent', 'Good', 'Fair'].map(function (s) { return '<option' + (ph && ph.condition === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div></div>' +
    '<label class="lbl">IMEI / Serial</label><input name="imei" class="input" value="' + esc(ph ? ph.imei : '') + '">' +
    '<div class="grid-2col"><div><label class="lbl">Price (JMD) *</label><input name="price" type="number" min="0" step="1" class="input" required value="' + (ph ? ph.price : '') + '"></div>' +
    '<div><label class="lbl">Status</label><select name="status" class="input">' +
    ['Available', 'Reserved', 'Sold'].map(function (s) { return '<option' + (ph && ph.status === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div></div>' +
    '<div class="row-end"><button type="button" class="btn" onclick="App.closeModal()">Cancel</button><button class="btn primary" type="submit">Save phone</button></div></form>');
}
function savePhone(ev, id) {
  ev.preventDefault();
  var f = ev.target;
  var data = { brand: f.brand.value, model: f.model.value.trim(), storage: f.storage.value, condition: f.condition.value, imei: f.imei.value.trim(), price: num(f.price.value), status: f.status.value };
  if (!data.brand || !data.model || data.price <= 0) { toast('Brand, model and price are required'); return; }
  if (id) {
    var ph = DB.phones.find(function (x) { return x.id === id; });
    if (ph) { ph.brand = data.brand; ph.model = data.model; ph.storage = data.storage; ph.condition = data.condition; ph.imei = data.imei; ph.price = data.price; ph.status = data.status; }
  } else {
    DB.phones.push({ id: uid('PH-'), brand: data.brand, model: data.model, storage: data.storage, condition: data.condition, imei: data.imei, price: data.price, status: data.status, isSample: false, createdAt: todayStr() });
  }
  saveDB(); closeModal(); renderView(); toast('Phone saved');
}
function setPhoneStatus(id, status) {
  var ph = DB.phones.find(function (x) { return x.id === id; });
  if (!ph) return;
  ph.status = status;
  saveDB(); renderView(); toast('Phone marked ' + status.toLowerCase());
}
function deletePhone(id) {
  var ph = DB.phones.find(function (x) { return x.id === id; });
  if (!ph) return;
  openConfirm('Delete listing ' + ph.brand + ' ' + ph.model + ' ' + ph.storage + '?', function () {
    DB.phones = DB.phones.filter(function (x) { return x.id !== id; });
    saveDB(); renderView(); toast('Listing deleted');
  });
}

// ---------------- reports ----------------
function viewReports() {
  if (role() !== 'owner') return '<h1>Reports</h1><p class="muted">Reports are available to the owner role only.</p>';
  var days = [];
  for (var i = reportDays - 1; i >= 0; i--) days.push(daysAgo(i));
  var byDay = days.map(function (d) {
    var list = salesOn(d);
    return { date: d, count: list.length, total: salesTotal(list) };
  });
  var maxTotal = Math.max.apply(null, byDay.map(function (b) { return b.total; }).concat([1]));
  var last7 = byDay.slice(-7).reduce(function (s, b) { return s + b.total; }, 0);
  var last30 = DB.sales.filter(function (s) { return s.date >= daysAgo(29); }).reduce(function (s, x) { return s + (x.total || 0); }, 0);

  // Top-selling parts from sale items.
  var partSales = {};
  DB.sales.forEach(function (s) {
    s.items.forEach(function (it) {
      if (it.kind !== 'part') return;
      if (!partSales[it.label]) partSales[it.label] = { qty: 0, revenue: 0 };
      partSales[it.label].qty += it.qty;
      partSales[it.label].revenue += it.price * it.qty;
    });
  });
  var topParts = Object.keys(partSales).map(function (k) { return { label: k, qty: partSales[k].qty, revenue: partSales[k].revenue }; })
    .sort(function (a, b) { return b.qty - a.qty; }).slice(0, 10);

  // Open tickets by technician.
  var byTech = {};
  openTickets().forEach(function (t) {
    var tech = t.technician || 'Unassigned';
    byTech[tech] = (byTech[tech] || 0) + 1;
  });
  var low = lowStock();

  return '' +
  '<h1>Reports</h1><p class="sub">Sales, parts, tickets and stock.</p>' +
  '<div class="cards">' +
    '<div class="card stat"><div class="stat-label">Last 7 days</div><div class="stat-value">' + fmt(last7) + '</div></div>' +
    '<div class="card stat"><div class="stat-label">Last 30 days</div><div class="stat-value">' + fmt(last30) + '</div></div>' +
    '<div class="card stat"><div class="stat-label">All-time sales</div><div class="stat-value">' + fmt(salesTotal(DB.sales)) + '</div><div class="stat-note">' + DB.sales.length + ' sales recorded</div></div>' +
  '</div>' +
  '<div class="card"><h2>Sales by day — last ' + reportDays + ' days</h2>' +
    '<div class="row"><button class="btn small' + (reportDays === 7 ? ' primary' : '') + '" onclick="App.setReportDays(7)">7 days</button> ' +
    '<button class="btn small' + (reportDays === 14 ? ' primary' : '') + '" onclick="App.setReportDays(14)">14 days</button> ' +
    '<button class="btn small' + (reportDays === 30 ? ' primary' : '') + '" onclick="App.setReportDays(30)">30 days</button></div>' +
    '<div class="bars">' + byDay.map(function (b) {
      return '<div class="bar-row"><span class="bar-date">' + dstr(b.date) + '</span><div class="bar-track"><div class="bar-fill" style="width:' + Math.round((b.total / maxTotal) * 100) + '%"></div></div><span class="bar-val">' + fmt(b.total) + ' (' + b.count + ')</span></div>';
    }).join('') + '</div></div>' +
  '<div class="grid-2">' +
    '<div class="card"><h2>Top-selling parts</h2>' + (topParts.length ? '<table class="tbl"><thead><tr><th>Part</th><th class="r">Sold</th><th class="r">Revenue</th></tr></thead><tbody>' +
      topParts.map(function (p) { return '<tr><td>' + esc(p.label) + '</td><td class="r">' + p.qty + '</td><td class="r">' + fmt(p.revenue) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">No part sales recorded yet.</p>') + '</div>' +
    '<div class="card"><h2>Open tickets by technician</h2>' + (Object.keys(byTech).length ? '<table class="tbl"><thead><tr><th>Technician</th><th class="r">Open tickets</th></tr></thead><tbody>' +
      Object.keys(byTech).map(function (k) { return '<tr><td>' + esc(k) + '</td><td class="r">' + byTech[k] + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">No open tickets.</p>') + '</div>' +
  '</div>' +
  '<div class="card"><h2>Low stock list (' + low.length + ')</h2>' + (low.length ? '<table class="tbl"><thead><tr><th>SKU</th><th>Part</th><th class="r">Stock</th><th class="r">Threshold</th><th class="r">Price</th></tr></thead><tbody>' +
    low.map(function (p) { return '<tr><td>' + esc(p.sku) + '</td><td>' + esc(p.brand + ' ' + p.model + ' — ' + p.label) + '</td><td class="r bad">' + p.stock + '</td><td class="r">' + p.threshold + '</td><td class="r">' + fmt(p.price) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">Nothing low on stock.</p>') + '</div>';
}
function setReportDays(n) { reportDays = n; renderView(); }

// ---------------- settings ----------------
function viewSettings() {
  if (role() !== 'owner') return '<h1>Settings</h1><p class="muted">Settings are available to the owner role only.</p>';
  var sampleCount = DB.customers.filter(function (c) { return c.isSample; }).length +
    DB.tickets.filter(function (t) { return t.isSample; }).length +
    DB.sales.filter(function (s) { return s.isSample; }).length +
    DB.phones.filter(function (p) { return p.isSample; }).length;
  return '' +
  '<h1>Settings</h1><p class="sub">Shop details, staff and data.</p>' +
  '<div class="card"><h2>Shop details</h2>' +
    '<form onsubmit="App.saveSettings(event)">' +
    '<label class="lbl">Shop name</label><input name="shopName" class="input" value="' + esc(DB.settings.shopName) + '">' +
    '<label class="lbl">Shop contact / address</label><input name="shopContact" class="input" value="' + esc(DB.settings.shopContact) + '">' +
    '<label class="lbl">Technicians &amp; staff (one per line)</label><textarea name="staff" class="input" rows="3">' + esc(DB.settings.staff.join('\n')) + '</textarea>' +
    '<div class="row-end"><button class="btn primary" type="submit">Save settings</button></div></form></div>' +
  '<div class="card"><h2>Roles</h2><p><strong>Owner</strong> — everything, including reports, settings and part costs.<br>' +
    '<strong>Sales Assistant</strong> — sales, customers and phones for sale.<br>' +
    '<strong>Technician</strong> — repair tickets and parts usage (no prices editing, no costs shown).<br>' +
    'Switch roles from the picker at the top of the screen. This is a simple in-app switcher, not a login — anyone with the app open can change it.</p></div>' +
  '<div class="card"><h2>Sample data</h2><p>The app shipped with sample customers, tickets, sales and phones so you can try every screen. They are marked <span class="tag">sample</span> in the lists.</p>' +
    '<p>' + sampleCount + ' sample records on file.</p>' +
    '<button class="btn" onclick="App.clearSampleData()">Remove sample data</button> ' +
    '<button class="btn danger" onclick="App.resetAll()">Reset everything (back to fresh seed)</button></div>' +
  '<div class="card"><h2>Backup</h2><p>All data is stored in this browser (localStorage). Export a backup before clearing browser data.</p>' +
    '<button class="btn" onclick="App.exportData()">Export data (JSON)</button> ' +
    '<label class="btn">Import data (JSON)<input type="file" accept="application/json" style="display:none" onchange="App.importData(event)"></label></div>';
}
function saveSettings(ev) {
  ev.preventDefault();
  var f = ev.target;
  DB.settings.shopName = f.shopName.value.trim() || 'Fixtings POS';
  DB.settings.shopContact = f.shopContact.value.trim();
  DB.settings.staff = f.staff.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
  if (!DB.settings.staff.length) DB.settings.staff = ['Sheldon'];
  saveDB(); renderNav(); renderView(); toast('Settings saved');
}
function clearSampleData() {
  openConfirm('Remove all sample customers, tickets, sales and phones? Your real records stay untouched.', function () {
    DB.customers = DB.customers.filter(function (c) { return !c.isSample; });
    DB.tickets = DB.tickets.filter(function (t) { return !t.isSample; });
    DB.sales = DB.sales.filter(function (s) { return !s.isSample; });
    DB.phones = DB.phones.filter(function (p) { return !p.isSample; });
    saveDB(); renderView(); toast('Sample data removed');
  });
}
function resetAll() {
  openConfirm('Reset everything? This wipes ALL data and restores the fresh seed (parts catalog + sample records).', function () {
    localStorage.removeItem(LS_KEY);
    DB = seedDB();
    saveDB();
    cart = [];
    renderNav(); show('dashboard');
    toast('Reset complete — fresh seed loaded');
  });
}
function exportData() {
  var blob = new Blob([JSON.stringify(DB, null, 2)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'fixtings-pos-backup-' + todayStr() + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast('Backup downloaded');
}
function importData(ev) {
  var file = ev.target.files && ev.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function () {
    try {
      var data = JSON.parse(reader.result);
      if (!data || !Array.isArray(data.parts) || !Array.isArray(data.sales)) throw new Error('bad file');
      DB = data;
      if (!DB.settings) DB.settings = { shopName: 'Fixtings POS', shopContact: '', staff: ['Sheldon'] };
      if (!DB.role) DB.role = 'owner';
      saveDB(); renderNav(); show('dashboard');
      toast('Backup imported');
    } catch (e) { toast('That file is not a valid Fixtings POS backup'); }
  };
  reader.readAsText(file);
  ev.target.value = '';
}

// ---------------- App API + boot ----------------
function setRole(v) {
  if (!ROLES[v]) return;
  DB.role = v;
  saveDB();
  if (!canSee(currentView)) currentView = 'dashboard';
  renderNav(); renderView();
  toast('Role: ' + ROLES[v].label);
}

var App = {
  show: show, closeModal: closeModal, confirmYes: confirmYes,
  addToCart: addToCart, cartQty: cartQty, cartRemove: cartRemove, clearCart: clearCart, completeSale: completeSale,
  customerForm: customerForm, saveCustomer: saveCustomer, deleteCustomer: deleteCustomer, customerDetail: customerDetail,
  ticketForm: ticketForm, saveTicket: saveTicket, ticketDetail: ticketDetail, setTicketStatus: setTicketStatus,
  saveTicketTech: saveTicketTech, attachPart: attachPart, collectTicket: collectTicket, finishCollect: finishCollect,
  deleteTicket: deleteTicket, setTicketFilter: setTicketFilter,
  setPartsFilter: setPartsFilter, adjustStock: adjustStock, partForm: partForm, savePart: savePart, deletePart: deletePart,
  setSpecDevice: setSpecDevice, setSpecTab: setSpecTab, setSpecType: setSpecType, attachPartById: attachPartById,
  phoneForm: phoneForm, savePhone: savePhone, setPhoneStatus: setPhoneStatus, deletePhone: deletePhone,
  setReportDays: setReportDays, saveSettings: saveSettings, clearSampleData: clearSampleData, resetAll: resetAll,
  exportData: exportData, importData: importData, setRole: setRole
};

function boot() {
  loadDB();
  renderNav();
  renderView();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}

// Expose internals for automated checks.
if (typeof window !== 'undefined') {
  window.App = App;
  window.__fix = {
    get DB() { return DB; },
    seedDB: seedDB,
    buildCatalog: (typeof buildCatalog === 'function') ? buildCatalog : null,
    addToCart: addToCart,
    completeSale: completeSale,
    saveTicket: saveTicket,
    savePart: savePart,
    specFor: (typeof specFor === 'function') ? specFor : null,
    fitsForPart: (typeof fitsForPart === 'function') ? fitsForPart : null,
    partFitsDevice: (typeof partFitsDevice === 'function') ? partFitsDevice : null,
    deviceSpecs: (typeof DEVICE_SPECS !== 'undefined') ? DEVICE_SPECS : null,
    sharedParts: (typeof SHARED_PARTS !== 'undefined') ? SHARED_PARTS : null,
    devices: (typeof DEVICES !== 'undefined') ? DEVICES : null,
    fmt: fmt
  };
}
