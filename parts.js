// ============================================================================
// Fixtings POS — Parts catalog seed
// A starter catalog covering the most common repair parts for Samsung Galaxy,
// Google Pixel, Apple iPhone, Xiaomi Redmi, Poco, Huawei, Motorola, Infinix
// and Tecno devices. Prices are realistic Jamaican retail (JMD). This is a
// seed, not an exhaustive list: owners can add any part or model from the
// Parts & Inventory screen.
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
  { brand: 'Samsung', model: 'Galaxy S20',          tier: 'mid',      bcode: 'SAM', mcode: 'S20'  },
  { brand: 'Samsung', model: 'Galaxy S20+',         tier: 'mid',      bcode: 'SAM', mcode: 'S20P' },
  { brand: 'Samsung', model: 'Galaxy S20 Ultra',    tier: 'flagship', bcode: 'SAM', mcode: 'S20U' },
  { brand: 'Samsung', model: 'Galaxy S10',          tier: 'budget',   bcode: 'SAM', mcode: 'S10'  },
  { brand: 'Samsung', model: 'Galaxy S10+',         tier: 'mid',      bcode: 'SAM', mcode: 'S10P' },
  { brand: 'Samsung', model: 'Galaxy Note 10',      tier: 'mid',      bcode: 'SAM', mcode: 'N10'  },
  { brand: 'Samsung', model: 'Galaxy Note 10+',     tier: 'flagship', bcode: 'SAM', mcode: 'N10P' },
  { brand: 'Samsung', model: 'Galaxy Note 20',      tier: 'mid',      bcode: 'SAM', mcode: 'N20'  },
  { brand: 'Samsung', model: 'Galaxy A12',          tier: 'budget',   bcode: 'SAM', mcode: 'A12'  },
  { brand: 'Samsung', model: 'Galaxy A13',          tier: 'budget',   bcode: 'SAM', mcode: 'A13'  },
  { brand: 'Samsung', model: 'Galaxy A22',          tier: 'budget',   bcode: 'SAM', mcode: 'A22'  },
  { brand: 'Samsung', model: 'Galaxy A23',          tier: 'budget',   bcode: 'SAM', mcode: 'A23'  },
  { brand: 'Samsung', model: 'Galaxy A32',          tier: 'budget',   bcode: 'SAM', mcode: 'A32'  },
  { brand: 'Samsung', model: 'Galaxy A33',          tier: 'budget',   bcode: 'SAM', mcode: 'A33'  },
  { brand: 'Samsung', model: 'Galaxy A52',          tier: 'mid',      bcode: 'SAM', mcode: 'A52'  },
  { brand: 'Samsung', model: 'Galaxy A53',          tier: 'mid',      bcode: 'SAM', mcode: 'A53'  },
  { brand: 'Samsung', model: 'Galaxy A72',          tier: 'mid',      bcode: 'SAM', mcode: 'A72'  },
  { brand: 'Samsung', model: 'Galaxy A73',          tier: 'mid',      bcode: 'SAM', mcode: 'A73'  },
  { brand: 'Samsung', model: 'Galaxy Z Flip 3',     tier: 'flagship', bcode: 'SAM', mcode: 'ZFL3' },
  { brand: 'Samsung', model: 'Galaxy Z Flip 4',     tier: 'flagship', bcode: 'SAM', mcode: 'ZFL4' },
  { brand: 'Samsung', model: 'Galaxy Z Fold 3',     tier: 'flagship', bcode: 'SAM', mcode: 'ZFO3' },
  { brand: 'Samsung', model: 'Galaxy Z Fold 4',     tier: 'flagship', bcode: 'SAM', mcode: 'ZFO4' },
  // Google Pixel
  { brand: 'Google', model: 'Pixel 6', tier: 'mid',      bcode: 'GOO', mcode: 'PX6' },
  { brand: 'Google', model: 'Pixel 7', tier: 'mid',      bcode: 'GOO', mcode: 'PX7' },
  { brand: 'Google', model: 'Pixel 8', tier: 'flagship', bcode: 'GOO', mcode: 'PX8' },
  { brand: 'Google', model: 'Pixel 4',  tier: 'budget',   bcode: 'GOO', mcode: 'PX4'  },
  { brand: 'Google', model: 'Pixel 4a', tier: 'budget',   bcode: 'GOO', mcode: 'PX4A' },
  { brand: 'Google', model: 'Pixel 5',  tier: 'budget',   bcode: 'GOO', mcode: 'PX5'  },
  { brand: 'Google', model: 'Pixel 5a', tier: 'budget',   bcode: 'GOO', mcode: 'PX5A' },
  { brand: 'Google', model: 'Pixel 6a', tier: 'mid',      bcode: 'GOO', mcode: 'PX6A' },
  { brand: 'Google', model: 'Pixel 7a', tier: 'mid',      bcode: 'GOO', mcode: 'PX7A' },
  { brand: 'Google', model: 'Pixel 8a', tier: 'mid',      bcode: 'GOO', mcode: 'PX8A' },
  { brand: 'Google', model: 'Pixel 9',  tier: 'flagship', bcode: 'GOO', mcode: 'PX9'  },
  { brand: 'Google', model: 'Pixel 9 Pro', tier: 'flagship', bcode: 'GOO', mcode: 'PX9P' },
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
  { brand: 'Apple', model: 'iPhone 17 Pro Max',  tier: 'flagship', bcode: 'APP', mcode: 'IP17PM' },
  // Apple iPhone (older)
  { brand: 'Apple', model: 'iPhone 8',       tier: 'budget', bcode: 'APP', mcode: 'IP8'    },
  { brand: 'Apple', model: 'iPhone 8 Plus',  tier: 'budget', bcode: 'APP', mcode: 'IP8P'   },
  { brand: 'Apple', model: 'iPhone X',       tier: 'budget', bcode: 'APP', mcode: 'IPX'    },
  { brand: 'Apple', model: 'iPhone XS',      tier: 'mid',    bcode: 'APP', mcode: 'IPXS'   },
  { brand: 'Apple', model: 'iPhone XS Max',  tier: 'mid',    bcode: 'APP', mcode: 'IPXSM'  },
  { brand: 'Apple', model: 'iPhone XR',      tier: 'budget', bcode: 'APP', mcode: 'IPXR'   },
  { brand: 'Apple', model: 'iPhone SE (2020)', tier: 'budget', bcode: 'APP', mcode: 'IPSE20' },
  { brand: 'Apple', model: 'iPhone SE (2022)', tier: 'budget', bcode: 'APP', mcode: 'IPSE22' },
  // Xiaomi Redmi
  { brand: 'Xiaomi', model: 'Redmi Note 10',      tier: 'budget', bcode: 'XIA', mcode: 'RN10'  },
  { brand: 'Xiaomi', model: 'Redmi Note 10 Pro',  tier: 'mid',    bcode: 'XIA', mcode: 'RN10P' },
  { brand: 'Xiaomi', model: 'Redmi Note 11',      tier: 'budget', bcode: 'XIA', mcode: 'RN11'  },
  { brand: 'Xiaomi', model: 'Redmi Note 11 Pro',  tier: 'mid',    bcode: 'XIA', mcode: 'RN11P' },
  { brand: 'Xiaomi', model: 'Redmi Note 12',      tier: 'budget', bcode: 'XIA', mcode: 'RN12'  },
  { brand: 'Xiaomi', model: 'Redmi Note 12 Pro',  tier: 'mid',    bcode: 'XIA', mcode: 'RN12P' },
  { brand: 'Xiaomi', model: 'Redmi Note 13',      tier: 'budget', bcode: 'XIA', mcode: 'RN13'  },
  { brand: 'Xiaomi', model: 'Redmi Note 13 Pro',  tier: 'mid',    bcode: 'XIA', mcode: 'RN13P' },
  // Poco
  { brand: 'Poco', model: 'X3',     tier: 'budget', bcode: 'POC', mcode: 'PCX3'  },
  { brand: 'Poco', model: 'X4 Pro', tier: 'mid',    bcode: 'POC', mcode: 'PCX4P' },
  { brand: 'Poco', model: 'X5',     tier: 'mid',    bcode: 'POC', mcode: 'PCX5'  },
  // Huawei
  { brand: 'Huawei', model: 'P30',    tier: 'mid', bcode: 'HUA', mcode: 'HP30' },
  { brand: 'Huawei', model: 'P40',    tier: 'mid', bcode: 'HUA', mcode: 'HP40' },
  { brand: 'Huawei', model: 'Nova 9', tier: 'mid', bcode: 'HUA', mcode: 'HNV9' },
  // Motorola
  { brand: 'Motorola', model: 'G20', tier: 'budget', bcode: 'MOT', mcode: 'MG20' },
  { brand: 'Motorola', model: 'G30', tier: 'budget', bcode: 'MOT', mcode: 'MG30' },
  { brand: 'Motorola', model: 'G50', tier: 'budget', bcode: 'MOT', mcode: 'MG50' },
  { brand: 'Motorola', model: 'G60', tier: 'budget', bcode: 'MOT', mcode: 'MG60' },
  // Infinix
  { brand: 'Infinix', model: 'Note 10', tier: 'budget', bcode: 'INF', mcode: 'IN10' },
  { brand: 'Infinix', model: 'Note 11', tier: 'budget', bcode: 'INF', mcode: 'IN11' },
  { brand: 'Infinix', model: 'Note 12', tier: 'budget', bcode: 'INF', mcode: 'IN12' },
  // Tecno
  { brand: 'Tecno', model: 'Spark 10', tier: 'budget', bcode: 'TEC', mcode: 'TS10' },
  { brand: 'Tecno', model: 'Camon 20', tier: 'budget', bcode: 'TEC', mcode: 'TC20' }
];

// Build the full seed catalog: one entry per device x part type.
// Stock starts at 0 — the owner adds real stock as parts are bought in.
function buildCatalog() {
  var parts = [];
  for (var d = 0; d < DEVICES.length; d++) {
    var dev = DEVICES[d];
    for (var t = 0; t < PART_TYPES.length; t++) {
      var type = PART_TYPES[t];
      var p = PRICE_TABLE[dev.tier][type.key];
      var stock = 0;
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
