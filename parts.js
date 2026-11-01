// ============================================================================
// Fixtings POS — Parts catalog seed
// A starter catalog covering the most common repair parts for Samsung Galaxy,
// Google Pixel and Apple iPhone devices. Prices are realistic Jamaican retail
// (JMD). This is a seed, not an exhaustive list: owners can add any part or
// model from the Parts & Inventory screen.
// ============================================================================

var PART_TYPES = [
  { key: 'screen',      label: 'Display / Screen Assembly', code: 'SCR'  },
  { key: 'battery',     label: 'Battery',                   code: 'BAT'  },
  { key: 'chargeport',  label: 'Charging Port',             code: 'CHG'  },
  { key: 'rearcam',     label: 'Rear Camera',               code: 'RCAM' },
  { key: 'frontcam',    label: 'Front Camera',              code: 'FCAM' },
  { key: 'earpiece',    label: 'Earpiece Speaker',          code: 'EAR'  },
  { key: 'loudspeaker', label: 'Loudspeaker',               code: 'SPK'  },
  { key: 'backglass',   label: 'Back Glass',                code: 'BGL'  },
  { key: 'flex',        label: 'Power / Volume Flex',       code: 'FLX'  }
];

// { cost, price } in JMD per part type, per device tier.
var PRICE_TABLE = {
  flagship: {
    screen:      { cost: 34000, price: 58000 },
    battery:     { cost: 6500,  price: 14000 },
    chargeport:  { cost: 3800,  price: 9000  },
    rearcam:     { cost: 12000, price: 24000 },
    frontcam:    { cost: 6000,  price: 12000 },
    earpiece:    { cost: 2200,  price: 5000  },
    loudspeaker: { cost: 2600,  price: 5800  },
    backglass:   { cost: 9000,  price: 18000 },
    flex:        { cost: 2400,  price: 5500  }
  },
  mid: {
    screen:      { cost: 16000, price: 29000 },
    battery:     { cost: 4500,  price: 9500  },
    chargeport:  { cost: 2800,  price: 6500  },
    rearcam:     { cost: 7000,  price: 15000 },
    frontcam:    { cost: 3500,  price: 7500  },
    earpiece:    { cost: 1600,  price: 3800  },
    loudspeaker: { cost: 1800,  price: 4200  },
    backglass:   { cost: 5000,  price: 11000 },
    flex:        { cost: 1700,  price: 4000  }
  },
  budget: {
    screen:      { cost: 9000,  price: 17000 },
    battery:     { cost: 3200,  price: 7000  },
    chargeport:  { cost: 2000,  price: 5000  },
    rearcam:     { cost: 4000,  price: 9000  },
    frontcam:    { cost: 2200,  price: 5000  },
    earpiece:    { cost: 1100,  price: 2800  },
    loudspeaker: { cost: 1200,  price: 3000  },
    backglass:   { cost: 3000,  price: 7000  },
    flex:        { cost: 1200,  price: 3000  }
  }
};

// Devices covered by the seed catalog.
// tier: flagship | mid | budget — drives the price band above.
var DEVICES = [
  // Samsung Galaxy
  { brand: 'Samsung', model: 'Galaxy S21',          tier: 'mid',      bcode: 'SAM', mcode: 'S21'  },
  { brand: 'Samsung', model: 'Galaxy S22',          tier: 'mid',      bcode: 'SAM', mcode: 'S22'  },
  { brand: 'Samsung', model: 'Galaxy S23',          tier: 'flagship', bcode: 'SAM', mcode: 'S23'  },
  { brand: 'Samsung', model: 'Galaxy S24',          tier: 'flagship', bcode: 'SAM', mcode: 'S24'  },
  { brand: 'Samsung', model: 'Galaxy S25',          tier: 'flagship', bcode: 'SAM', mcode: 'S25'  },
  { brand: 'Samsung', model: 'Galaxy A14',          tier: 'budget',   bcode: 'SAM', mcode: 'A14'  },
  { brand: 'Samsung', model: 'Galaxy A15',          tier: 'budget',   bcode: 'SAM', mcode: 'A15'  },
  { brand: 'Samsung', model: 'Galaxy A34',          tier: 'budget',   bcode: 'SAM', mcode: 'A34'  },
  { brand: 'Samsung', model: 'Galaxy A54',          tier: 'mid',      bcode: 'SAM', mcode: 'A54'  },
  { brand: 'Samsung', model: 'Galaxy Note 20 Ultra', tier: 'flagship', bcode: 'SAM', mcode: 'N20U' },
  // Google Pixel
  { brand: 'Google', model: 'Pixel 6', tier: 'mid',      bcode: 'GOO', mcode: 'PX6' },
  { brand: 'Google', model: 'Pixel 7', tier: 'mid',      bcode: 'GOO', mcode: 'PX7' },
  { brand: 'Google', model: 'Pixel 8', tier: 'flagship', bcode: 'GOO', mcode: 'PX8' },
  // Apple iPhone
  { brand: 'Apple', model: 'iPhone 11',          tier: 'budget',   bcode: 'APP', mcode: 'IP11'   },
  { brand: 'Apple', model: 'iPhone 11 Pro',      tier: 'mid',      bcode: 'APP', mcode: 'IP11P'  },
  { brand: 'Apple', model: 'iPhone 12',          tier: 'budget',   bcode: 'APP', mcode: 'IP12'   },
  { brand: 'Apple', model: 'iPhone 12 Pro',      tier: 'mid',      bcode: 'APP', mcode: 'IP12P'  },
  { brand: 'Apple', model: 'iPhone 12 Pro Max',  tier: 'mid',      bcode: 'APP', mcode: 'IP12PM' },
  { brand: 'Apple', model: 'iPhone 13',          tier: 'mid',      bcode: 'APP', mcode: 'IP13'   },
  { brand: 'Apple', model: 'iPhone 13 Pro',      tier: 'flagship', bcode: 'APP', mcode: 'IP13P'  },
  { brand: 'Apple', model: 'iPhone 13 Pro Max',  tier: 'flagship', bcode: 'APP', mcode: 'IP13PM' },
  { brand: 'Apple', model: 'iPhone 14',          tier: 'mid',      bcode: 'APP', mcode: 'IP14'   },
  { brand: 'Apple', model: 'iPhone 14 Pro',      tier: 'flagship', bcode: 'APP', mcode: 'IP14P'  },
  { brand: 'Apple', model: 'iPhone 14 Pro Max',  tier: 'flagship', bcode: 'APP', mcode: 'IP14PM' },
  { brand: 'Apple', model: 'iPhone 15',          tier: 'mid',      bcode: 'APP', mcode: 'IP15'   },
  { brand: 'Apple', model: 'iPhone 15 Pro',      tier: 'flagship', bcode: 'APP', mcode: 'IP15P'  },
  { brand: 'Apple', model: 'iPhone 15 Pro Max',  tier: 'flagship', bcode: 'APP', mcode: 'IP15PM' },
  { brand: 'Apple', model: 'iPhone 16',          tier: 'flagship', bcode: 'APP', mcode: 'IP16'   },
  { brand: 'Apple', model: 'iPhone 16 Pro',      tier: 'flagship', bcode: 'APP', mcode: 'IP16P'  },
  { brand: 'Apple', model: 'iPhone 16 Pro Max',  tier: 'flagship', bcode: 'APP', mcode: 'IP16PM' },
  { brand: 'Apple', model: 'iPhone 17',          tier: 'flagship', bcode: 'APP', mcode: 'IP17'   },
  { brand: 'Apple', model: 'iPhone 17 Pro',      tier: 'flagship', bcode: 'APP', mcode: 'IP17P'  },
  { brand: 'Apple', model: 'iPhone 17 Pro Max',  tier: 'flagship', bcode: 'APP', mcode: 'IP17PM' }
];

// Deterministic 0..1 hash so seeded stock levels are stable across installs.
function skuHash(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
  return (h % 1000) / 1000;
}

// Build the full seed catalog: one entry per device x part type.
function buildCatalog() {
  var parts = [];
  for (var d = 0; d < DEVICES.length; d++) {
    var dev = DEVICES[d];
    for (var t = 0; t < PART_TYPES.length; t++) {
      var type = PART_TYPES[t];
      var p = PRICE_TABLE[dev.tier][type.key];
      var h = skuHash(dev.mcode + type.code);
      var stock = 3 + Math.floor(h * 7); // 3..9 units on hand
      parts.push({
        id: 'P-' + dev.mcode + '-' + type.code,
        sku: dev.bcode + '-' + dev.mcode + '-' + type.code,
        brand: dev.brand,
        model: dev.model,
        type: type.key,
        label: type.label,
        cost: p.cost,
        price: p.price,
        stock: stock,
        threshold: (type.key === 'screen' || type.key === 'battery') ? 3 : 2,
        isSeed: true
      });
    }
  }
  return parts;
}
