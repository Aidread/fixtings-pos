// ============================================================================
// Fixtings POS — Device specs & component compatibility
// Specs: GSMArena (m.gsmarena.com), fetched Nov 1, 2026. A blank chargingW or
// refresh means GSMArena does not publish that figure for the model — it is
// left blank rather than guessed. "port" is the charging port type.
// Compatibility: "confirmed" groups are parts well established in the repair
// trade as interchangeable between the listed models. "specMatched" groups
// only share the same size/type on paper — VERIFY FIT before ordering.
// Source note: specs courtesy of GSMArena (gsmarena.com).
// ============================================================================

var DEVICE_SPECS = {
  // Samsung Galaxy
  'S21':  { brand: 'Samsung', model: 'Galaxy S21', display: 6.2, panel: 'Dynamic AMOLED 2X', resolution: '1080x2400', refresh: 120, battery: 4000, chargingW: 25, port: 'USB-C 3.2', chipset: 'Exynos 2100 / Snapdragon 888 5G', ram: '8GB', storage: '128GB, 256GB', year: 2021, url: 'https://m.gsmarena.com/samsung_galaxy_s21_5g-10626.php', source: 'gsmarena' },
  'S22':  { brand: 'Samsung', model: 'Galaxy S22', display: 6.1, panel: 'Dynamic AMOLED 2X', resolution: '1080x2340', refresh: 120, battery: 3700, chargingW: 25, port: 'USB-C 3.2', chipset: 'Exynos 2200 / Snapdragon 8 Gen 1', ram: '8GB', storage: '128GB, 256GB', year: 2022, url: 'https://m.gsmarena.com/samsung_galaxy_s22_5g-11253.php', source: 'gsmarena' },
  'S23':  { brand: 'Samsung', model: 'Galaxy S23', display: 6.1, panel: 'Dynamic AMOLED 2X', resolution: '1080x2340', refresh: 120, battery: 3900, chargingW: 25, port: 'USB-C 3.2', chipset: 'Snapdragon 8 Gen 2', ram: '8GB', storage: '128GB, 256GB, 512GB', year: 2023, url: 'https://m.gsmarena.com/samsung_galaxy_s23-12082.php', source: 'gsmarena' },
  'S24':  { brand: 'Samsung', model: 'Galaxy S24', display: 6.2, panel: 'Dynamic LTPO AMOLED 2X', resolution: '1080x2340', refresh: 120, battery: 4000, chargingW: 25, port: 'USB-C 3.2', chipset: 'Snapdragon 8 Gen 3 / Exynos 2400', ram: '8GB, 12GB', storage: '128GB, 256GB, 512GB', year: 2024, url: 'https://m.gsmarena.com/samsung_galaxy_s24-12773.php', source: 'gsmarena' },
  'S25':  { brand: 'Samsung', model: 'Galaxy S25', display: 6.2, panel: 'Dynamic LTPO AMOLED 2X', resolution: '1080x2340', refresh: 120, battery: 4000, chargingW: 25, port: 'USB-C', chipset: 'Snapdragon 8 Elite', ram: '12GB', storage: '128GB, 256GB, 512GB', year: 2025, url: 'https://www.gsmarena.com/samsung_galaxy_s25-review-2794.php', source: 'gsmarena' },
  'S20':  { brand: 'Samsung', model: 'Galaxy S20', display: 6.2, panel: 'Dynamic AMOLED 2X', resolution: '1440x3200', refresh: 120, battery: 4000, chargingW: 25, port: 'USB-C 3.2', chipset: 'Exynos 990 / Snapdragon 865 5G', ram: '8GB', storage: '128GB', year: 2020, url: 'https://m.gsmarena.com/samsung_galaxy_s20-10081.php', source: 'gsmarena' },
  'S20P': { brand: 'Samsung', model: 'Galaxy S20+', display: 6.7, panel: 'Dynamic AMOLED 2X', resolution: '1440x3200', refresh: 120, battery: 4500, chargingW: 25, port: 'USB-C 3.2', chipset: 'Exynos 990 / Snapdragon 865 5G', ram: '8GB', storage: '128GB', year: 2020, url: 'https://m.gsmarena.com/samsung_galaxy_s20+-10080.php', source: 'gsmarena' },
  'S20U': { brand: 'Samsung', model: 'Galaxy S20 Ultra', display: 6.9, panel: 'Dynamic AMOLED 2X', resolution: '1440x3200', refresh: 120, battery: 5000, chargingW: 45, port: 'USB-C 3.2', chipset: 'Exynos 990 / Snapdragon 865 5G', ram: '12GB, 16GB', storage: '128GB, 512GB', year: 2020, url: 'https://m.gsmarena.com/samsung_galaxy_s20_ultra-10084.php', source: 'gsmarena' },
  'S10':  { brand: 'Samsung', model: 'Galaxy S10', display: 6.1, panel: 'Dynamic AMOLED', resolution: '1440x3040', refresh: 60, battery: 3400, chargingW: 15, port: 'USB-C 3.1', chipset: 'Exynos 9820 / Snapdragon 855', ram: '6GB, 8GB', storage: '128GB, 512GB', year: 2019, url: 'https://m.gsmarena.com/samsung_galaxy_s10-9536.php', source: 'gsmarena' },
  'S10P': { brand: 'Samsung', model: 'Galaxy S10+', display: 6.4, panel: 'Dynamic AMOLED', resolution: '1440x3040', refresh: 60, battery: 4100, chargingW: 15, port: 'USB-C 3.1', chipset: 'Exynos 9820 / Snapdragon 855', ram: '6GB, 8GB, 12GB', storage: '128GB, 512GB, 1TB', year: 2019, url: 'https://m.gsmarena.com/samsung_galaxy_s10+-9535.php', source: 'gsmarena' },
  'N10':  { brand: 'Samsung', model: 'Galaxy Note 10', display: 6.3, panel: 'Dynamic AMOLED', resolution: '1080x2280', refresh: 60, battery: 3500, chargingW: 25, port: 'USB-C 3.1', chipset: 'Exynos 9825 / Snapdragon 855', ram: '8GB', storage: '256GB', year: 2019, url: 'https://m.gsmarena.com/samsung_galaxy_note10-9788.php', source: 'gsmarena' },
  'N10P': { brand: 'Samsung', model: 'Galaxy Note 10+', display: 6.8, panel: 'Dynamic AMOLED', resolution: '1440x3040', refresh: 60, battery: 4300, chargingW: 45, port: 'USB-C 3.1', chipset: 'Exynos 9825 / Snapdragon 855', ram: '12GB', storage: '256GB, 512GB', year: 2019, url: 'https://m.gsmarena.com/samsung_galaxy_note10+-9732.php', source: 'gsmarena' },
  'N20':  { brand: 'Samsung', model: 'Galaxy Note 20', display: 6.7, panel: 'Super AMOLED Plus', resolution: '1080x2400', refresh: 60, battery: 4300, chargingW: 25, port: 'USB-C 3.2', chipset: 'Exynos 990 / Snapdragon 865 5G', ram: '8GB', storage: '256GB', year: 2020, url: 'https://m.gsmarena.com/samsung_galaxy_note20-10338.php', source: 'gsmarena' },
  'N20U': { brand: 'Samsung', model: 'Galaxy Note 20 Ultra', display: 6.9, panel: 'Dynamic AMOLED 2X', resolution: '1440x3088', refresh: 120, battery: 4500, chargingW: 25, port: 'USB-C 3.2', chipset: 'Exynos 990 / Snapdragon 865+ 5G', ram: '8GB, 12GB', storage: '128GB, 256GB, 512GB', year: 2020, url: 'https://m.gsmarena.com/samsung_galaxy_note20_ultra_5g-10261.php', source: 'gsmarena' },
  'A12':  { brand: 'Samsung', model: 'Galaxy A12', display: 6.5, panel: 'PLS LCD', resolution: '720x1600', refresh: 60, battery: 5000, chargingW: 15, port: 'USB-C 2.0', chipset: 'Helio P35', ram: '2GB, 3GB, 4GB, 6GB', storage: '32GB, 64GB, 128GB', year: 2020, url: 'https://m.gsmarena.com/samsung_galaxy_a12-10604.php', source: 'gsmarena' },
  'A13':  { brand: 'Samsung', model: 'Galaxy A13', display: 6.6, panel: 'PLS LCD', resolution: '1080x2408', refresh: 60, battery: 5000, chargingW: 15, port: 'USB-C 2.0', chipset: 'Exynos 850', ram: '3GB, 4GB, 6GB', storage: '32GB, 64GB, 128GB', year: 2022, url: 'https://m.gsmarena.com/samsung_galaxy_a13-11402.php', source: 'gsmarena' },
  'A14':  { brand: 'Samsung', model: 'Galaxy A14', display: 6.6, panel: 'PLS LCD', resolution: '1080x2408', refresh: 60, battery: 5000, chargingW: 15, port: 'USB-C 2.0', chipset: 'Helio G80 / Exynos 850', ram: '4GB, 6GB, 8GB', storage: '64GB, 128GB', year: 2023, url: 'https://m.gsmarena.com/samsung_galaxy_a14-12151.php', source: 'gsmarena' },
  'A15':  { brand: 'Samsung', model: 'Galaxy A15', display: 6.5, panel: 'Super AMOLED', resolution: '1080x2340', refresh: 90, battery: 5000, chargingW: 25, port: 'USB-C 2.0', chipset: 'Helio G99', ram: '4GB, 6GB, 8GB', storage: '128GB, 256GB', year: 2023, url: 'https://m.gsmarena.com/samsung_galaxy_a15-12637.php', source: 'gsmarena' },
  'A22':  { brand: 'Samsung', model: 'Galaxy A22', display: 6.4, panel: 'Super AMOLED', resolution: '720x1600', refresh: 90, battery: 5000, chargingW: 15, port: 'USB-C 2.0', chipset: 'Helio G80', ram: '4GB, 6GB', storage: '64GB, 128GB', year: 2021, url: 'https://m.gsmarena.com/samsung_galaxy_a22-10948.php', source: 'gsmarena' },
  'A23':  { brand: 'Samsung', model: 'Galaxy A23', display: 6.6, panel: 'PLS LCD', resolution: '1080x2408', refresh: 90, battery: 5000, chargingW: 25, port: 'USB-C 2.0', chipset: 'Snapdragon 680 4G', ram: '4GB, 6GB, 8GB', storage: '64GB, 128GB', year: 2022, url: 'https://m.gsmarena.com/samsung_galaxy_a23-11373.php', source: 'gsmarena' },
  'A32':  { brand: 'Samsung', model: 'Galaxy A32', display: 6.4, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 90, battery: 5000, chargingW: 15, port: 'USB-C 2.0', chipset: 'Helio G80', ram: '4GB, 6GB, 8GB', storage: '64GB, 128GB', year: 2021, url: 'https://m.gsmarena.com/samsung_galaxy_a32-10753.php', source: 'gsmarena' },
  'A33':  { brand: 'Samsung', model: 'Galaxy A33', display: 6.4, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 90, battery: 5000, chargingW: 25, port: 'USB-C 2.0', chipset: 'Exynos 1280', ram: '4GB, 6GB, 8GB', storage: '128GB, 256GB', year: 2022, url: 'https://m.gsmarena.com/samsung_galaxy_a33_5g-11429.php', source: 'gsmarena' },
  'A34':  { brand: 'Samsung', model: 'Galaxy A34', display: 6.6, panel: 'Super AMOLED', resolution: '1080x2340', refresh: 120, battery: 5000, chargingW: 25, port: 'USB-C 2.0', chipset: 'Dimensity 1080', ram: '4GB, 6GB, 8GB', storage: '128GB, 256GB', year: 2023, url: 'https://m.gsmarena.com/samsung_galaxy_a34-12074.php', source: 'gsmarena' },
  'A52':  { brand: 'Samsung', model: 'Galaxy A52', display: 6.5, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 90, battery: 4500, chargingW: 25, port: 'USB-C 2.0', chipset: 'Snapdragon 720G', ram: '4GB, 6GB, 8GB', storage: '128GB, 256GB', year: 2021, url: 'https://m.gsmarena.com/samsung_galaxy_a52-10641.php', source: 'gsmarena' },
  'A53':  { brand: 'Samsung', model: 'Galaxy A53', display: 6.5, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 120, battery: 5000, chargingW: 25, port: 'USB-C 2.0', chipset: 'Exynos 1280', ram: '4GB, 6GB, 8GB', storage: '128GB, 256GB', year: 2022, url: 'https://m.gsmarena.com/samsung_galaxy_a53_5g-11268.php', source: 'gsmarena' },
  'A54':  { brand: 'Samsung', model: 'Galaxy A54', display: 6.4, panel: 'Super AMOLED', resolution: '1080x2340', refresh: 120, battery: 5000, chargingW: 25, port: 'USB-C 2.0', chipset: 'Exynos 1380', ram: '4GB, 6GB, 8GB', storage: '128GB, 256GB', year: 2023, url: 'https://m.gsmarena.com/samsung_galaxy_a54-12070.php', source: 'gsmarena' },
  'A72':  { brand: 'Samsung', model: 'Galaxy A72', display: 6.7, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 90, battery: 5000, chargingW: 25, port: 'USB-C 2.0', chipset: 'Snapdragon 720G', ram: '6GB, 8GB', storage: '128GB, 256GB', year: 2021, url: 'https://m.gsmarena.com/samsung_galaxy_a72-10469.php', source: 'gsmarena' },
  'A73':  { brand: 'Samsung', model: 'Galaxy A73', display: 6.7, panel: 'Super AMOLED Plus', resolution: '1080x2400', refresh: 120, battery: 5000, chargingW: 25, port: 'USB-C 2.0', chipset: 'Snapdragon 778G 5G', ram: '6GB, 8GB', storage: '128GB, 256GB', year: 2022, url: 'https://m.gsmarena.com/samsung_galaxy_a73_5g-11257.php', source: 'gsmarena' },
  'ZFL3': { brand: 'Samsung', model: 'Galaxy Z Flip 3', display: 6.7, panel: 'Foldable Dynamic AMOLED 2X', resolution: '1080x2640', refresh: 120, battery: 3300, chargingW: 15, port: 'USB-C 2.0', chipset: 'Snapdragon 888 5G', ram: '8GB', storage: '128GB, 256GB', year: 2021, url: 'https://m.gsmarena.com/samsung_galaxy_z_flip3_5g-11044.php', source: 'gsmarena' },
  'ZFL4': { brand: 'Samsung', model: 'Galaxy Z Flip 4', display: 6.7, panel: 'Foldable Dynamic AMOLED 2X', resolution: '1080x2640', refresh: 120, battery: 3700, chargingW: 25, port: 'USB-C 2.0', chipset: 'Snapdragon 8+ Gen 1', ram: '8GB', storage: '128GB, 256GB, 512GB', year: 2022, url: 'https://m.gsmarena.com/samsung_galaxy_z_flip4-11538.php', source: 'gsmarena' },
  'ZFO3': { brand: 'Samsung', model: 'Galaxy Z Fold 3', display: 7.6, panel: 'Foldable Dynamic AMOLED 2X', resolution: '1768x2208', refresh: 120, battery: 4400, chargingW: 25, port: 'USB-C 3.2', chipset: 'Snapdragon 888 5G', ram: '12GB', storage: '256GB, 512GB', year: 2021, url: 'https://m.gsmarena.com/samsung_galaxy_z_fold3_5g-10906.php', source: 'gsmarena' },
  'ZFO4': { brand: 'Samsung', model: 'Galaxy Z Fold 4', display: 7.6, panel: 'Foldable Dynamic AMOLED 2X', resolution: '1812x2176', refresh: 120, battery: 4400, chargingW: 25, port: 'USB-C 3.2', chipset: 'Snapdragon 8+ Gen 1', ram: '12GB', storage: '256GB, 512GB, 1TB', year: 2022, url: 'https://m.gsmarena.com/samsung_galaxy_z_fold4-11737.php', source: 'gsmarena' },
  // Google Pixel
  'PX4':  { brand: 'Google', model: 'Pixel 4', display: 5.7, panel: 'P-OLED', resolution: '1080x2280', refresh: 90, battery: 2800, chargingW: 18, port: 'USB-C', chipset: 'Snapdragon 855', ram: '6GB', storage: '64GB, 128GB', year: 2019, url: 'https://m.gsmarena.com/google_pixel_4-9896.php', source: 'gsmarena' },
  'PX4A': { brand: 'Google', model: 'Pixel 4a', display: 5.81, panel: 'OLED', resolution: '1080x2340', refresh: 60, battery: 3140, chargingW: 18, port: 'USB-C', chipset: 'Snapdragon 730G', ram: '6GB', storage: '128GB', year: 2020, url: 'https://m.gsmarena.com/google_pixel_4a-10123.php', source: 'gsmarena' },
  'PX5':  { brand: 'Google', model: 'Pixel 5', display: 6.0, panel: 'OLED', resolution: '1080x2340', refresh: 90, battery: 4080, chargingW: 18, port: 'USB-C', chipset: 'Snapdragon 765G 5G', ram: '8GB', storage: '128GB', year: 2020, url: 'https://m.gsmarena.com/google_pixel_5-10386.php', source: 'gsmarena' },
  'PX5A': { brand: 'Google', model: 'Pixel 5a', display: 6.34, panel: 'OLED', resolution: '1080x2400', refresh: 60, battery: 4680, chargingW: 18, port: 'USB-C', chipset: 'Snapdragon 765G 5G', ram: '6GB', storage: '128GB', year: 2021, url: 'https://m.gsmarena.com/google_pixel_5a_5g-11059.php', source: 'gsmarena' },
  'PX6':  { brand: 'Google', model: 'Pixel 6', display: 6.4, panel: 'AMOLED', resolution: '1080x2400', refresh: 90, battery: 4614, chargingW: 30, port: 'USB-C', chipset: 'Google Tensor', ram: '8GB', storage: '128GB, 256GB', year: 2021, url: 'https://m.gsmarena.com/google_pixel_6-11037.php', source: 'gsmarena' },
  'PX6A': { brand: 'Google', model: 'Pixel 6a', display: 6.1, panel: 'OLED', resolution: '1080x2400', refresh: 60, battery: 4410, chargingW: 18, port: 'USB-C', chipset: 'Google Tensor', ram: '6GB', storage: '128GB', year: 2022, url: 'https://m.gsmarena.com/google_pixel_6a-11229.php', source: 'gsmarena' },
  'PX7':  { brand: 'Google', model: 'Pixel 7', display: 6.3, panel: 'AMOLED', resolution: '1080x2400', refresh: 90, battery: 4355, chargingW: 20, port: 'USB-C', chipset: 'Google Tensor G2', ram: '8GB', storage: '128GB, 256GB', year: 2022, url: 'https://m.gsmarena.com/google_pixel_7-11903.php', source: 'gsmarena' },
  'PX7A': { brand: 'Google', model: 'Pixel 7a', display: 6.1, panel: 'OLED', resolution: '1080x2400', refresh: 90, battery: 4385, chargingW: 18, port: 'USB-C', chipset: 'Google Tensor G2', ram: '8GB', storage: '128GB', year: 2023, url: 'https://m.gsmarena.com/google_pixel_7a-12170.php', source: 'gsmarena' },
  'PX8':  { brand: 'Google', model: 'Pixel 8', display: 6.2, panel: 'OLED', resolution: '1080x2400', refresh: 120, battery: 4575, chargingW: 27, port: 'USB-C', chipset: 'Google Tensor G3', ram: '8GB', storage: '128GB, 256GB', year: 2023, url: 'https://m.gsmarena.com/google_pixel_8-12546.php', source: 'gsmarena' },
  'PX8A': { brand: 'Google', model: 'Pixel 8a', display: 6.1, panel: 'OLED', resolution: '1080x2400', refresh: 120, battery: 4492, chargingW: 18, port: 'USB-C', chipset: 'Google Tensor G3', ram: '8GB', storage: '128GB, 256GB', year: 2024, url: 'https://m.gsmarena.com/google_pixel_8a-12937.php', source: 'gsmarena' },
  'PX9':  { brand: 'Google', model: 'Pixel 9', display: 6.3, panel: 'OLED', resolution: '1080x2424', refresh: 120, battery: 4700, chargingW: 27, port: 'USB-C', chipset: 'Google Tensor G4', ram: '12GB', storage: '128GB, 256GB', year: 2024, url: 'https://m.gsmarena.com/google_pixel_9-13219.php', source: 'gsmarena' },
  'PX9P': { brand: 'Google', model: 'Pixel 9 Pro', display: 6.3, panel: 'LTPO OLED', resolution: '1280x2856', refresh: 120, battery: 4700, chargingW: 27, port: 'USB-C', chipset: 'Google Tensor G4', ram: '16GB', storage: '128GB, 256GB, 512GB, 1TB', year: 2024, url: 'https://m.gsmarena.com/google_pixel_9_pro-13218.php', source: 'gsmarena' },
  // Apple iPhone
  'IP8':    { brand: 'Apple', model: 'iPhone 8', display: 4.7, panel: 'Retina IPS LCD', resolution: '750x1334', refresh: 60, battery: 1821, chargingW: 15, port: 'Lightning', chipset: 'Apple A11 Bionic', ram: '2GB', storage: '64GB, 128GB, 256GB', year: 2017, url: 'https://m.gsmarena.com/apple_iphone_8-8573.php', source: 'gsmarena' },
  'IP8P':   { brand: 'Apple', model: 'iPhone 8 Plus', display: 5.5, panel: 'Retina IPS LCD', resolution: '1080x1920', refresh: 60, battery: 2691, chargingW: 15, port: 'Lightning', chipset: 'Apple A11 Bionic', ram: '3GB', storage: '64GB, 128GB, 256GB', year: 2017, url: 'https://m.gsmarena.com/apple_iphone_8_plus-8131.php', source: 'gsmarena' },
  'IPX':    { brand: 'Apple', model: 'iPhone X', display: 5.8, panel: 'Super Retina OLED', resolution: '1125x2436', refresh: 60, battery: 2716, chargingW: 15, port: 'Lightning', chipset: 'Apple A11 Bionic', ram: '3GB', storage: '64GB, 256GB', year: 2017, url: 'https://m.gsmarena.com/apple_iphone_x-8858.php', source: 'gsmarena' },
  'IPXS':   { brand: 'Apple', model: 'iPhone XS', display: 5.8, panel: 'Super Retina OLED', resolution: '1125x2436', refresh: 60, battery: 2658, chargingW: 15, port: 'Lightning', chipset: 'Apple A12 Bionic', ram: '4GB', storage: '64GB, 256GB, 512GB', year: 2018, url: 'https://m.gsmarena.com/apple_iphone_xs-9318.php', source: 'gsmarena' },
  'IPXSM':  { brand: 'Apple', model: 'iPhone XS Max', display: 6.5, panel: 'Super Retina OLED', resolution: '1242x2688', refresh: 60, battery: 3174, chargingW: 15, port: 'Lightning', chipset: 'Apple A12 Bionic', ram: '4GB', storage: '64GB, 256GB, 512GB', year: 2018, url: 'https://m.gsmarena.com/apple_iphone_xs_max-9319.php', source: 'gsmarena' },
  'IPXR':   { brand: 'Apple', model: 'iPhone XR', display: 6.1, panel: 'Liquid Retina IPS LCD', resolution: '828x1792', refresh: 60, battery: 2942, chargingW: 15, port: 'Lightning', chipset: 'Apple A12 Bionic', ram: '3GB', storage: '64GB, 128GB, 256GB', year: 2018, url: 'https://m.gsmarena.com/apple_iphone_xr-9320.php', source: 'gsmarena' },
  'IPSE20': { brand: 'Apple', model: 'iPhone SE (2020)', display: 4.7, panel: 'Retina IPS LCD', resolution: '750x1334', refresh: 60, battery: 1821, chargingW: 18, port: 'Lightning', chipset: 'Apple A13 Bionic', ram: '3GB', storage: '64GB, 128GB, 256GB', year: 2020, url: 'https://m.gsmarena.com/apple_iphone_se_(2020)-10170.php', source: 'gsmarena' },
  'IPSE22': { brand: 'Apple', model: 'iPhone SE (2022)', display: 4.7, panel: 'Retina IPS LCD', resolution: '750x1334', refresh: 60, battery: 2018, chargingW: 20, port: 'Lightning', chipset: 'Apple A15 Bionic', ram: '4GB', storage: '64GB, 128GB, 256GB', year: 2022, url: 'https://m.gsmarena.com/apple_iphone_se_(2022)-11410.php', source: 'gsmarena' },
  'IP11':   { brand: 'Apple', model: 'iPhone 11', display: 6.1, panel: 'Liquid Retina IPS LCD', resolution: '828x1792', refresh: 60, battery: 3110, chargingW: 18, port: 'Lightning', chipset: 'Apple A13 Bionic', ram: '4GB', storage: '64GB, 128GB, 256GB', year: 2019, url: 'https://m.gsmarena.com/apple_iphone_11-9848.php', source: 'gsmarena' },
  'IP11P':  { brand: 'Apple', model: 'iPhone 11 Pro', display: 5.8, panel: 'Super Retina XDR OLED', resolution: '1125x2436', refresh: 60, battery: 3046, chargingW: 18, port: 'Lightning', chipset: 'Apple A13 Bionic', ram: '4GB', storage: '64GB, 256GB, 512GB', year: 2019, url: 'https://m.gsmarena.com/apple_iphone_11_pro-9847.php', source: 'gsmarena' },
  'IP12':   { brand: 'Apple', model: 'iPhone 12', display: 6.1, panel: 'Super Retina XDR OLED', resolution: '1170x2532', refresh: 60, battery: 2815, chargingW: 20, port: 'Lightning', chipset: 'Apple A14 Bionic', ram: '4GB', storage: '64GB, 128GB, 256GB', year: 2020, url: 'https://m.gsmarena.com/apple_iphone_12-10509.php', source: 'gsmarena' },
  'IP12P':  { brand: 'Apple', model: 'iPhone 12 Pro', display: 6.1, panel: 'Super Retina XDR OLED', resolution: '1170x2532', refresh: 60, battery: 2815, chargingW: 20, port: 'Lightning', chipset: 'Apple A14 Bionic', ram: '6GB', storage: '128GB, 256GB, 512GB', year: 2020, url: 'https://m.gsmarena.com/apple_iphone_12_pro-10508.php', source: 'gsmarena' },
  'IP12PM': { brand: 'Apple', model: 'iPhone 12 Pro Max', display: 6.7, panel: 'Super Retina XDR OLED', resolution: '1284x2778', refresh: 60, battery: 3687, chargingW: 20, port: 'Lightning', chipset: 'Apple A14 Bionic', ram: '6GB', storage: '128GB, 256GB, 512GB', year: 2020, url: 'https://m.gsmarena.com/apple_iphone_12_pro_max-10237.php', source: 'gsmarena' },
  'IP13':   { brand: 'Apple', model: 'iPhone 13', display: 6.1, panel: 'Super Retina XDR OLED', resolution: '1170x2532', refresh: 60, battery: 3240, chargingW: 20, port: 'Lightning', chipset: 'Apple A15 Bionic', ram: '4GB', storage: '128GB, 256GB, 512GB', year: 2021, url: 'https://m.gsmarena.com/apple_iphone_13-11103.php', source: 'gsmarena' },
  'IP13P':  { brand: 'Apple', model: 'iPhone 13 Pro', display: 6.1, panel: 'Super Retina XDR OLED', resolution: '1170x2532', refresh: 120, battery: 3095, chargingW: 20, port: 'Lightning', chipset: 'Apple A15 Bionic', ram: '6GB', storage: '128GB, 256GB, 512GB, 1TB', year: 2021, url: 'https://m.gsmarena.com/apple_iphone_13_pro-11102.php', source: 'gsmarena' },
  'IP13PM': { brand: 'Apple', model: 'iPhone 13 Pro Max', display: 6.7, panel: 'Super Retina XDR OLED', resolution: '1284x2778', refresh: 120, battery: 4352, chargingW: 20, port: 'Lightning', chipset: 'Apple A15 Bionic', ram: '6GB', storage: '128GB, 256GB, 512GB, 1TB', year: 2021, url: 'https://m.gsmarena.com/apple_iphone_13_pro_max-11089.php', source: 'gsmarena' },
  'IP14':   { brand: 'Apple', model: 'iPhone 14', display: 6.1, panel: 'Super Retina XDR OLED', resolution: '1170x2532', refresh: 60, battery: 3279, chargingW: null, port: 'Lightning', chipset: 'Apple A15 Bionic', ram: '6GB', storage: '128GB, 256GB, 512GB', year: 2022, url: 'https://m.gsmarena.com/apple_iphone_14-11861.php', source: 'gsmarena' },
  'IP14P':  { brand: 'Apple', model: 'iPhone 14 Pro', display: 6.1, panel: 'LTPO Super Retina XDR OLED', resolution: '1179x2556', refresh: 120, battery: 3200, chargingW: null, port: 'Lightning', chipset: 'Apple A16 Bionic', ram: '6GB', storage: '128GB, 256GB, 512GB, 1TB', year: 2022, url: 'https://m.gsmarena.com/apple_iphone_14_pro-11860.php', source: 'gsmarena' },
  'IP14PM': { brand: 'Apple', model: 'iPhone 14 Pro Max', display: 6.7, panel: 'LTPO Super Retina XDR OLED', resolution: '1290x2796', refresh: 120, battery: 4323, chargingW: null, port: 'Lightning', chipset: 'Apple A16 Bionic', ram: '6GB', storage: '128GB, 256GB, 512GB, 1TB', year: 2022, url: 'https://m.gsmarena.com/apple_iphone_14_pro_max-11773.php', source: 'gsmarena' },
  'IP15':   { brand: 'Apple', model: 'iPhone 15', display: 6.1, panel: 'Super Retina XDR OLED', resolution: '1179x2556', refresh: 60, battery: 3349, chargingW: null, port: 'USB-C', chipset: 'Apple A16 Bionic', ram: '6GB', storage: '128GB, 256GB, 512GB', year: 2023, url: 'https://m.gsmarena.com/apple_iphone_15-12559.php', source: 'gsmarena' },
  'IP15P':  { brand: 'Apple', model: 'iPhone 15 Pro', display: 6.1, panel: 'LTPO Super Retina XDR OLED', resolution: '1179x2556', refresh: 120, battery: 3274, chargingW: null, port: 'USB-C', chipset: 'Apple A17 Pro', ram: '8GB', storage: '128GB, 256GB, 512GB, 1TB', year: 2023, url: 'https://m.gsmarena.com/apple_iphone_15_pro-12557.php', source: 'gsmarena' },
  'IP15PM': { brand: 'Apple', model: 'iPhone 15 Pro Max', display: 6.7, panel: 'LTPO Super Retina XDR OLED', resolution: '1290x2796', refresh: 120, battery: 4441, chargingW: null, port: 'USB-C', chipset: 'Apple A17 Pro', ram: '8GB', storage: '256GB, 512GB, 1TB', year: 2023, url: 'https://m.gsmarena.com/apple_iphone_15_pro_max-12548.php', source: 'gsmarena' },
  'IP16':   { brand: 'Apple', model: 'iPhone 16', display: 6.1, panel: 'Super Retina XDR OLED', resolution: '1179x2556', refresh: 60, battery: 3561, chargingW: null, port: 'USB-C', chipset: 'Apple A18', ram: '8GB', storage: '128GB, 256GB, 512GB', year: 2024, url: 'https://m.gsmarena.com/apple_iphone_16-13317.php', source: 'gsmarena' },
  'IP16P':  { brand: 'Apple', model: 'iPhone 16 Pro', display: 6.3, panel: 'LTPO Super Retina XDR OLED', resolution: '1206x2622', refresh: 120, battery: 3582, chargingW: null, port: 'USB-C', chipset: 'Apple A18 Pro', ram: '8GB', storage: '128GB, 256GB, 512GB, 1TB', year: 2024, url: 'https://m.gsmarena.com/apple_iphone_16_pro-13315.php', source: 'gsmarena' },
  'IP16PM': { brand: 'Apple', model: 'iPhone 16 Pro Max', display: 6.9, panel: 'LTPO Super Retina XDR OLED', resolution: '1320x2868', refresh: 120, battery: 4685, chargingW: null, port: 'USB-C', chipset: 'Apple A18 Pro', ram: '8GB', storage: '256GB, 512GB, 1TB', year: 2024, url: 'https://m.gsmarena.com/apple_iphone_16_pro_max-13123.php', source: 'gsmarena' },
  'IP17':   { brand: 'Apple', model: 'iPhone 17', display: 6.3, panel: 'LTPO Super Retina XDR OLED', resolution: '1206x2622', refresh: 120, battery: 3692, chargingW: 25, port: 'USB-C', chipset: 'Apple A19', ram: '8GB', storage: '256GB, 512GB', year: 2025, url: 'https://m.gsmarena.com/apple_iphone_17-14050.php', source: 'gsmarena' },
  'IP17P':  { brand: 'Apple', model: 'iPhone 17 Pro', display: 6.3, panel: 'LTPO Super Retina XDR OLED', resolution: '1206x2622', refresh: 120, battery: 3998, chargingW: 25, port: 'USB-C', chipset: 'Apple A19 Pro', ram: '12GB', storage: '256GB, 512GB, 1TB', year: 2025, url: 'https://m.gsmarena.com/apple_iphone_17_pro-14049.php', source: 'gsmarena' },
  'IP17PM': { brand: 'Apple', model: 'iPhone 17 Pro Max', display: 6.9, panel: 'LTPO Super Retina XDR OLED', resolution: '1320x2868', refresh: 120, battery: 4823, chargingW: 25, port: 'USB-C', chipset: 'Apple A19 Pro', ram: '12GB', storage: '256GB, 512GB, 1TB, 2TB', year: 2025, url: 'https://m.gsmarena.com/apple_iphone_17_pro_max-13964.php', source: 'gsmarena' },
  // Xiaomi Redmi
  'RN10':  { brand: 'Xiaomi', model: 'Redmi Note 10', display: 6.43, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 60, battery: 5000, chargingW: 33, port: 'USB-C 2.0', chipset: 'Snapdragon 678', ram: '4GB, 6GB', storage: '64GB, 128GB', year: 2021, url: 'https://m.gsmarena.com/xiaomi_redmi_note_10-10247.php', source: 'gsmarena' },
  'RN10P': { brand: 'Xiaomi', model: 'Redmi Note 10 Pro', display: 6.67, panel: 'AMOLED', resolution: '1080x2400', refresh: 120, battery: 5020, chargingW: 33, port: 'USB-C 2.0', chipset: 'Snapdragon 732G', ram: '6GB, 8GB', storage: '64GB, 128GB, 256GB', year: 2021, url: 'https://m.gsmarena.com/xiaomi_redmi_note_10_pro-10662.php', source: 'gsmarena' },
  'RN11':  { brand: 'Xiaomi', model: 'Redmi Note 11', display: 6.43, panel: 'AMOLED', resolution: '1080x2400', refresh: 90, battery: 5000, chargingW: 33, port: 'USB-C 2.0', chipset: 'Snapdragon 680 4G', ram: '4GB, 6GB', storage: '64GB, 128GB', year: 2022, url: 'https://m.gsmarena.com/xiaomi_redmi_note_11-11336.php', source: 'gsmarena' },
  'RN11P': { brand: 'Xiaomi', model: 'Redmi Note 11 Pro', display: 6.67, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 120, battery: 5000, chargingW: 67, port: 'USB-C 2.0', chipset: 'Helio G96', ram: '4GB, 6GB, 8GB', storage: '64GB, 128GB', year: 2022, url: 'https://m.gsmarena.com/xiaomi_redmi_note_11_pro-11334.php', source: 'gsmarena' },
  'RN12':  { brand: 'Xiaomi', model: 'Redmi Note 12', display: 6.67, panel: 'AMOLED', resolution: '1080x2400', refresh: 120, battery: 5000, chargingW: 33, port: 'USB-C 2.0', chipset: 'Snapdragon 4 Gen 1', ram: '4GB, 6GB, 8GB', storage: '128GB, 256GB', year: 2023, url: 'https://m.gsmarena.com/xiaomi_redmi_note_12-12063.php', source: 'gsmarena' },
  'RN12P': { brand: 'Xiaomi', model: 'Redmi Note 12 Pro', display: 6.67, panel: 'AMOLED', resolution: '1080x2400', refresh: 120, battery: 5000, chargingW: 67, port: 'USB-C 2.0', chipset: 'Dimensity 1080', ram: '6GB, 8GB, 12GB', storage: '128GB, 256GB', year: 2022, url: 'https://m.gsmarena.com/xiaomi_redmi_note_12_pro-11955.php', source: 'gsmarena' },
  'RN13':  { brand: 'Xiaomi', model: 'Redmi Note 13', display: 6.67, panel: 'AMOLED', resolution: '1080x2400', refresh: 120, battery: 5000, chargingW: 33, port: 'USB-C 2.0', chipset: 'Dimensity 6080', ram: '6GB, 8GB, 12GB', storage: '128GB, 256GB, 512GB', year: 2024, url: 'https://m.gsmarena.com/xiaomi_redmi_note_13-12776.php', source: 'gsmarena' },
  'RN13P': { brand: 'Xiaomi', model: 'Redmi Note 13 Pro', display: 6.67, panel: 'AMOLED', resolution: '1220x2712', refresh: 120, battery: 5100, chargingW: 67, port: 'USB-C 2.0', chipset: 'Snapdragon 7s Gen 2', ram: '8GB, 12GB, 16GB', storage: '128GB, 256GB, 512GB', year: 2023, url: 'https://m.gsmarena.com/xiaomi_redmi_note_13_pro-12581.php', source: 'gsmarena' },
  // Poco
  'PCX3':  { brand: 'Poco', model: 'X3', display: 6.67, panel: 'IPS LCD', resolution: '1080x2400', refresh: 120, battery: 6000, chargingW: 33, port: 'USB-C 2.0', chipset: 'Snapdragon 732G', ram: '6GB, 8GB', storage: '64GB, 128GB', year: 2020, url: 'https://m.gsmarena.com/xiaomi_poco_x3-10461.php', source: 'gsmarena' },
  'PCX4P': { brand: 'Poco', model: 'X4 Pro', display: 6.67, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 120, battery: 5000, chargingW: 67, port: 'USB-C 2.0', chipset: 'Snapdragon 695 5G', ram: '6GB, 8GB', storage: '64GB, 128GB, 256GB', year: 2022, url: 'https://m.gsmarena.com/xiaomi_poco_x4_pro_5g-11371.php', source: 'gsmarena' },
  'PCX5':  { brand: 'Poco', model: 'X5', display: 6.67, panel: 'Super AMOLED', resolution: '1080x2400', refresh: 120, battery: 5000, chargingW: 33, port: 'USB-C 2.0', chipset: 'Snapdragon 695 5G', ram: '6GB, 8GB', storage: '128GB, 256GB', year: 2023, url: 'https://m.gsmarena.com/xiaomi_poco_x5-12092.php', source: 'gsmarena' },
  // Huawei
  'HP30': { brand: 'Huawei', model: 'P30', display: 6.1, panel: 'OLED', resolution: '1080x2340', refresh: null, battery: 3650, chargingW: 22.5, port: 'USB-C', chipset: 'Kirin 980', ram: '6GB, 8GB', storage: '64GB, 128GB, 256GB', year: 2019, url: 'https://m.gsmarena.com/huawei_p30-9530.php', source: 'gsmarena' },
  'HP40': { brand: 'Huawei', model: 'P40', display: 6.1, panel: 'OLED', resolution: '1080x2340', refresh: null, battery: 3800, chargingW: 22.5, port: 'USB-C', chipset: 'Kirin 990 5G', ram: '6GB, 8GB', storage: '128GB, 256GB', year: 2020, url: 'https://m.gsmarena.com/huawei_p40-10153.php', source: 'gsmarena' },
  'HNV9': { brand: 'Huawei', model: 'Nova 9', display: 6.57, panel: 'OLED', resolution: '1080x2340', refresh: 120, battery: 4300, chargingW: 66, port: 'USB-C', chipset: 'Snapdragon 778G 4G', ram: '8GB', storage: '128GB, 256GB', year: 2021, url: 'https://m.gsmarena.com/huawei_nova_9-11121.php', source: 'gsmarena' },
  // Motorola
  'MG20': { brand: 'Motorola', model: 'G20', display: 6.5, panel: 'IPS LCD', resolution: '720x1600', refresh: 90, battery: 5000, chargingW: 10, port: 'USB-C', chipset: 'Unisoc T700', ram: '4GB', storage: '64GB, 128GB', year: 2021, url: 'https://m.gsmarena.com/motorola_moto_g20-10828.php', source: 'gsmarena' },
  'MG30': { brand: 'Motorola', model: 'G30', display: 6.5, panel: 'IPS LCD', resolution: '720x1600', refresh: 90, battery: 5000, chargingW: 20, port: 'USB-C', chipset: 'Snapdragon 662', ram: '4GB, 6GB', storage: '64GB, 128GB', year: 2021, url: 'https://m.gsmarena.com/motorola_moto_g30-10724.php', source: 'gsmarena' },
  'MG50': { brand: 'Motorola', model: 'G50', display: 6.5, panel: 'IPS LCD', resolution: '720x1600', refresh: 90, battery: 5000, chargingW: 15, port: 'USB-C', chipset: 'Snapdragon 480 5G', ram: '4GB', storage: '64GB, 128GB', year: 2021, url: 'https://m.gsmarena.com/motorola_moto_g50-10789.php', source: 'gsmarena' },
  'MG60': { brand: 'Motorola', model: 'G60', display: 6.8, panel: 'IPS LCD', resolution: '1080x2460', refresh: 120, battery: 6000, chargingW: 20, port: 'USB-C', chipset: 'Snapdragon 732G', ram: '4GB, 6GB', storage: '128GB', year: 2021, url: 'https://m.gsmarena.com/motorola_moto_g60-10861.php', source: 'gsmarena' },
  // Infinix
  'IN10': { brand: 'Infinix', model: 'Note 10', display: 6.95, panel: 'IPS LCD', resolution: '1080x2460', refresh: null, battery: 5000, chargingW: 18, port: 'USB-C', chipset: 'Helio G85', ram: '4GB, 6GB', storage: '64GB, 128GB', year: 2021, url: 'https://m.gsmarena.com/infinix_note_10-10909.php', source: 'gsmarena' },
  'IN11': { brand: 'Infinix', model: 'Note 11', display: 6.7, panel: 'AMOLED', resolution: '1080x2400', refresh: null, battery: 5000, chargingW: 33, port: 'USB-C', chipset: 'Helio G88', ram: '4GB, 6GB', storage: '64GB, 128GB', year: 2021, url: 'https://m.gsmarena.com/infinix_note_11-11201.php', source: 'gsmarena' },
  'IN12': { brand: 'Infinix', model: 'Note 12', display: 6.7, panel: 'AMOLED', resolution: '1080x2400', refresh: null, battery: 5000, chargingW: 33, port: 'USB-C', chipset: 'Helio G88', ram: '4GB, 6GB', storage: '64GB, 128GB', year: 2022, url: 'https://m.gsmarena.com/infinix_note_12-11497.php', source: 'gsmarena' },
  // Tecno
  'TS10': { brand: 'Tecno', model: 'Spark 10', display: 6.6, panel: 'IPS LCD', resolution: '720x1612', refresh: 90, battery: 5000, chargingW: 18, port: 'USB-C', chipset: 'Helio G37', ram: '4GB, 8GB', storage: '64GB, 128GB', year: 2023, url: 'https://m.gsmarena.com/tecno_spark_10-12178.php', source: 'gsmarena' },
  'TC20': { brand: 'Tecno', model: 'Camon 20', display: 6.67, panel: 'AMOLED', resolution: '1080x2400', refresh: null, battery: 5000, chargingW: 33, port: 'USB-C', chipset: 'Helio G85', ram: '8GB', storage: '256GB', year: 2023, url: 'https://m.gsmarena.com/tecno_camon_20-12253.php', source: 'gsmarena' }
};

// ============================================================================
// Component compatibility.
// "models" are full "Brand Model" strings matching DEVICES (brand + ' ' + model).
// status 'confirmed': the part is well established in the repair trade as
// interchangeable between these models (same part number / same assembly).
// status 'specMatched': the models only share the same size/type on paper —
// VERIFY FIT before ordering. Never mixed with confirmed groups in the UI.
// ============================================================================

var SHARED_PARTS = [
  // --- confirmed: iPhone 12 / 12 Pro ---
  { part: 'screen', status: 'confirmed', models: ['Apple iPhone 12', 'Apple iPhone 12 Pro'], note: 'Same 6.1" OLED assembly and connectors — the standard interchangeable pair in the trade.' },
  { part: 'battery', status: 'confirmed', models: ['Apple iPhone 12', 'Apple iPhone 12 Pro'], note: 'Same battery, 2815 mAh (Apple part A2479).' },
  { part: 'chargeport', status: 'confirmed', models: ['Apple iPhone 12', 'Apple iPhone 12 Pro'], note: 'Same Lightning connector flex.' },
  // --- confirmed: iPhone 13 / 13 Pro ---
  { part: 'screen', status: 'confirmed', models: ['Apple iPhone 13', 'Apple iPhone 13 Pro'], note: 'Same 6.1" OLED assembly — interchangeable in the trade (Pro adds 120Hz ProMotion, same fit).' },
  { part: 'chargeport', status: 'confirmed', models: ['Apple iPhone 13', 'Apple iPhone 13 Pro'], note: 'Same Lightning connector flex.' },
  // --- confirmed: iPhone 8 / SE (2020) ---
  { part: 'screen', status: 'confirmed', models: ['Apple iPhone 8', 'Apple iPhone SE (2020)'], note: 'SE (2020) reuses the iPhone 8 4.7" LCD assembly — a standard interchangeable pair.' },
  { part: 'battery', status: 'confirmed', models: ['Apple iPhone 8', 'Apple iPhone SE (2020)'], note: 'Same battery, 1821 mAh.' },
  { part: 'chargeport', status: 'confirmed', models: ['Apple iPhone 8', 'Apple iPhone SE (2020)'], note: 'Same Lightning connector flex.' },
  // --- confirmed: iPhone XR / 11 screen ---
  { part: 'screen', status: 'confirmed', models: ['Apple iPhone XR', 'Apple iPhone 11'], note: 'Same 6.1" LCD panel — interchangeable in the trade; transfer the earpiece flex and brackets.' },
  // --- confirmed: earpiece / loudspeaker / flex shared across the 12 & 13 generations ---
  { part: 'earpiece', status: 'confirmed', models: ['Apple iPhone 12', 'Apple iPhone 12 Pro', 'Apple iPhone 12 Pro Max', 'Apple iPhone 13', 'Apple iPhone 13 Pro', 'Apple iPhone 13 Pro Max'], note: 'Suppliers list a single earpiece-speaker SKU fitting the 12 and 13 generations (base, Pro and Pro Max).' },
  { part: 'loudspeaker', status: 'confirmed', models: ['Apple iPhone 12', 'Apple iPhone 12 Pro', 'Apple iPhone 13', 'Apple iPhone 13 Pro'], note: 'Same lower loudspeaker module listed for these four models by aftermarket suppliers.' },
  { part: 'flex', status: 'confirmed', models: ['Apple iPhone 12', 'Apple iPhone 12 Pro'], note: 'Same power/volume flex.' },
  { part: 'flex', status: 'confirmed', models: ['Apple iPhone 13', 'Apple iPhone 13 Pro'], note: 'Same power/volume flex.' },
  // --- spec-matched only: same size/type on paper, fit NOT confirmed ---
  { part: 'screen', status: 'specMatched', models: ['Apple iPhone X', 'Apple iPhone XS', 'Apple iPhone 11 Pro'], note: 'All 5.8" OLED, 1125x2436. Same panel size on paper — connectors and brackets differ, verify fit.' },
  { part: 'screen', status: 'specMatched', models: ['Samsung Galaxy A32', 'Samsung Galaxy A33'], note: 'Both 6.4" Super AMOLED, 1080x2400, 90Hz. Same size on paper — verify fit.' },
  { part: 'screen', status: 'specMatched', models: ['Xiaomi Redmi Note 12', 'Xiaomi Redmi Note 12 Pro', 'Xiaomi Redmi Note 13'], note: 'All 6.67" AMOLED, 1080x2400, 120Hz. Same size on paper — verify fit.' },
  { part: 'screen', status: 'specMatched', models: ['Poco X4 Pro', 'Poco X5'], note: 'Both 6.67" Super AMOLED, 1080x2400, 120Hz. Same size on paper — verify fit.' },
  { part: 'screen', status: 'specMatched', models: ['Infinix Note 11', 'Infinix Note 12'], note: 'Both 6.7" AMOLED, 1080x2400. Same size on paper — verify fit.' },
  { part: 'battery', status: 'specMatched', models: ['Google Pixel 9', 'Google Pixel 9 Pro'], note: 'Both 4700 mAh on paper — shape and connector not confirmed the same, verify fit.' }
];

// ---------------- helpers (used by app.js) ----------------
function specFor(mcode) { return DEVICE_SPECS[mcode] || null; }
function fullName(brand, model) { return brand + ' ' + model; }
function deviceByFullName(name) {
  if (typeof DEVICES === 'undefined') return null;
  for (var i = 0; i < DEVICES.length; i++) {
    if (fullName(DEVICES[i].brand, DEVICES[i].model) === name) return DEVICES[i];
  }
  return null;
}
// Groups (confirmed or specMatched) for a part type.
function sharedGroupsFor(partKey, status) {
  return SHARED_PARTS.filter(function (g) {
    return g.part === partKey && (!status || g.status === status);
  });
}
// For one catalog part, which OTHER devices does it fit? Returns
// { confirmed: [full names], specMatched: [full names] }.
function fitsForPart(part) {
  var out = { confirmed: [], specMatched: [] };
  if (!part) return out;
  var self = fullName(part.brand, part.model);
  SHARED_PARTS.forEach(function (g) {
    if (g.part !== part.type) return;
    if (g.models.indexOf(self) === -1) return;
    g.models.forEach(function (m) {
      if (m === self) return;
      if (out[g.status].indexOf(m) === -1) out[g.status].push(m);
    });
  });
  // Owner-added fits stored on the part record (array of full names).
  if (part.fits && part.fits.length) {
    part.fits.forEach(function (m) {
      if (m !== self && out.confirmed.indexOf(m) === -1) out.confirmed.push(m);
    });
  }
  return out;
}
// Does a catalog part fit this device (own model, a shared group, or a
// user-added fit)? Returns 'own' | 'confirmed' | 'specMatched' | null.
function partFitsDevice(part, brand, model) {
  if (!part) return null;
  if (part.brand === brand && part.model === model) return 'own';
  var self = fullName(brand, model);
  var fits = fitsForPart(part);
  if (fits.confirmed.indexOf(self) !== -1) return 'confirmed';
  if (fits.specMatched.indexOf(self) !== -1) return 'specMatched';
  return null;
}
