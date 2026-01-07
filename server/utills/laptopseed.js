const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// Base URL for your images
const GITHUB_BASE = "https://raw.githubusercontent.com/ajaykumarsaini231/Hariom-Shop/refs/heads/main/server/public/laptop_parts_images/";

// Helper: Format filename to Product Title (e.g., "acer_aspire_5.jpg" -> "Acer Aspire 5")
const formatTitle = (filename) => {
  const name = filename.split('.')[0]; // remove extension
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper: Generate random price based on category type
const getRandomPrice = (categoryName) => {
  if (categoryName.includes("Laptops") || categoryName.includes("PC")) return Math.floor(Math.random() * (80000 - 25000) + 25000);
  if (categoryName.includes("Motherboard")) return Math.floor(Math.random() * (8000 - 3500) + 3500);
  if (categoryName.includes("Screen")) return Math.floor(Math.random() * (6500 - 2500) + 2500);
  if (categoryName.includes("Battery")) return Math.floor(Math.random() * (2500 - 1200) + 1200);
  if (categoryName.includes("Keyboard")) return Math.floor(Math.random() * (1500 - 800) + 800);
  return Math.floor(Math.random() * (2000 - 500) + 500);
};

async function main() {
  console.log("🚀 Starting the seeding process...");

  // ====================================================
  // 1. CLEANUP EXISTING DATA
  // ====================================================
  console.log("🧹 Cleaning up the database...");
  await prisma.wishlist.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.customer_order_product.deleteMany();
  await prisma.customer_order.deleteMany();
  await prisma.message.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Database cleaned.");

  // ====================================================
  // 2. SEED CATEGORIES
  // ====================================================
  console.log("🌱 Seeding categories...");
  
  const categoriesData = [
    { name: "Laptops" },
    { name: "Gaming PC Builds" },
    { name: "Laptop Motherboards" },
    { name: "Laptop Screens" },
    { name: "Laptop Keyboards" },
    { name: "Laptop Batteries" },
    { name: "Adapters & Chargers" },
    { name: "Cooling Fans" },
    { name: "DC Jacks & Connectors" },
    { name: "Laptop Body Panels" }, 
    { name: "Motherboard ICs & Components" }, 
    { name: "Wholesale Components" }, // For SSDs/RAM
    { name: "Chip-Level Repair Service" },
    { name: "MacBook & iPad Repair" },
    { name: "Repair Training Course" },
  ];

  await prisma.category.createMany({ data: categoriesData });
  const createdCategories = await prisma.category.findMany();
  console.log(`✅ ${createdCategories.length} categories seeded.`);

  const getCategoryId = (name) => {
    const cat = createdCategories.find((c) => c.name === name);
    return cat ? cat.id : createdCategories[0].id;
  };

  // ====================================================
  // 3. SEED USERS
  // ====================================================
  console.log("🌱 Seeding users...");
  const rawUsers = [
    { email: "admin@laptopsolutions.com", password: "Password@123", role: "admin", name: "Admin Ajay" },
    { email: "user@example.com", password: "Password@123", role: "user", name: "Customer Rahul" },
  ];

  const createdUsers = [];
  for (const userData of rawUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        verified: true,
        name: userData.name,
        mobile: "9122901467"
      },
    });
    createdUsers.push(user);
    console.log(`✅ User seeded: ${user.email}`);
  }

  // ====================================================
  // 4. PREPARE IMAGE DATA
  // ====================================================
  // ----------------------------------------------------
  // PASTE YOUR FULL IMAGE ARRAYS BELOW THIS LINE
  // ----------------------------------------------------
  
  
 console.log("🌱 Seeding products...");

  const githubBase = "https://raw.githubusercontent.com/ajaykumarsaini231/Hariom-Shop/refs/heads/main/server/public/assest/";

  // --- Image Lists ---
  // List 1: "laptop.png" and others relevant to laptops
  const laptopsImages = ["laptop.png", "macbook.jpg", "macbook2.jpg", "laptopscreen.jpg", "acer_nitro_5_laptop_lcd_screen.jpg", // Using screen images as proxies for models if needed
  "asus_rog_flow_z13_lcd_laptop_screen.jpg",
  "dell_alienware_m15_r2_lcd_laptop_screen.jpg"];
  
  // List 2: Component images
  const partImages = ["battery.jpg", "bettry.jpg", "charger.jpg", "charginport.jpg", "fan.jpeg", "fan.jpg", "ssd.jpeg", "parts.jpg", "motherboard.jpg", "chiplverl.jpg"];

  // List 3: Service images
  const serviceImages = ["laptopreparing.jpg", "screendamage.jpg", "laptops-repair-639676639.jpg"];

// Gaming PC Builds & High-Performance Parts (Processors, RAM, High-End SSDs)
const gamingPcBuildsImages = [
  "amd_athlon_3000g_processor.jpg",
  "amd_ryzen_3_3200g_processor.jpg",
  "amd_ryzen_5_3600_6_core_processor.jpg",
  "amd_ryzen_7_5800x_processor.jpg",
  "adata_8gb_ddr4_ram_2400_mhz_pc4_19200.jpg",
  "corsair_vengeance_laptop_ram_8gb_ddr4_3200mhz.jpg",
  "crucial_16gb_ddr4_3200mhz_laptop_ram.jpg",
  "crucial_8gb_ddr4_1600mhz_laptop_ram.jpg",
  "crucial_laptop_ram_8gb_ddr4_3200mhz.jpg",
  "adata_xpg_spectrix_s40g_rgb_1tb_m2_nvme_ssd_as40g_1tt_c.jpg", // RGB Gaming SSD
  "adata_xpg_spectrix_s40g_rgb_256gb_pcie_gen3x4_m2_nvme_ssd.jpg",
  "adata_xpg_spectrix_s40g_rgb_512gb_pcie_gen3x4_m2_nvme_ssd.jpg",
  "ant_esports_690_neo_ultra_2tb_m2_nvme_gen4_internal_ssd.jpg",
  "asus_rog_strix_arion_s500_500gb_usb_c_32_gen_2_external_ssd.jpg"
];

// Laptop Motherboards
const laptopMotherboardsImages = [
  "acer_aspire_7_a715_42g_laptop_motherboard.jpg",
  "acer_aspire_es_es1_131_motherboard.jpg",
  "asus_rog_g1502_503_vm_laptop_motherboard.jpg",
  "asus_rog_g1502_g1503_laptop_motherboard.jpg",
  "asus_rog_strix_g531gt_core_i7_motherboard_60nr01l0_mb3110.jpg",
  "asus_vivobook_x507ub_motherboard.jpg",
  "asus_x507ma_motherboard.jpg",
  "asus_x551ca_motherboard.jpg",
  "dell_inspiron_15_3521_laptop_motherboard.jpg"
];


// Laptop Screens (LCD/LED Panels & Assemblies)
const laptopScreensImages = [
  "acer_aspire_3_laptop_lcd_screen.jpg",
  "acer_aspire_5620_screen_panel.jpg",
  "acer_aspire_5742_with_hinge_screen_panel.jpg",
  "acer_aspire_5750_screen_panel.jpg",
  "acer_aspire_5_laptop_lcd_screen.jpg",
  "acer_aspire_7_laptop_lcd_screen.jpg",
  "acer_aspire_e1_431_screen_140_with_40pin.jpg",
  "acer_aspire_e1_531_display.jpg",
  "acer_aspire_e1_531_screen_panel.jpg",
  "acer_aspire_e1_570_screen_panel.jpg",
  "acer_aspire_e5_573_display.jpg",
  "acer_aspire_v3_571_screen_panel.jpg",
  "acer_aspire_v5_431_screen_panel.jpg",
  "acer_aspire_v5_473p_6459_display.jpg",
  "acer_aspire_v5_571_laptop_screen.jpg",
  "acer_aspire_v5_571_screen_panel.jpg",
  "acer_e571_laptop_display.jpg",
  "acer_extensa_15_laptop_lcd_screen.jpg",
  "acer_nitro_16_laptop_lcd_screen.jpg",
  "acer_nitro_17_laptop_lcd_screen.jpg",
  "acer_nitro_5_laptop_lcd_screen.jpg",
  "acer_nitro_7_laptop_lcd_screen.jpg",
  "acer_predator_helios_16_gaming_laptop_lcd_screen_helios_16_helios_neo_16.jpg",
  "acer_predator_helios_300_g3_571_77qk_laptop_lcd_screen.jpg",
  "acer_predator_helios_300_gaming_laptop_lcd_screen.jpg",
  "acer_predator_helios_500_gaming_laptop_lcd_screen.jpg",
  "acer_predator_triton_300_gaming_laptop_lcd_screen.jpg",
  "acer_predator_triton_500_gaming_laptop_lcd_screen_triton_500_triton_500_se.jpg",
  "acer_spin_3_laptop_lcd_screen.jpg",
  "acer_spin_5_laptop_lcd_screen.jpg",
  "acer_spin_7_laptop_lcd_screen.jpg",
  "acer_swift_14_laptop_lcd_screen.jpg",
  "acer_swift_3_laptop_lcd_screen.jpg",
  "acer_swift_5_laptop_lcd_screen.jpg",
  "acer_swift_edge_16_laptop_lcd_screen.jpg",
  "acer_swift_go_14_display.jpg",
  "acer_swift_go_14_laptop_lcd_screen.jpg",
  "acer_swift_go_laptop_lcd_screen.jpg",
  "acer_swift_x_16_laptop_lcd_screen.jpg",
  "acer_swift_x_laptop_lcd_screen.jpg",
  "acer_travelmate_2420_screen_panel.jpg",
  "asus_14z_zenbook_ux433fa_display.jpg",
  "asus_k53_screen_panel.jpg",
  "asus_n55_screen_panel.jpg",
  "asus_rog_flow_x13_lcd_laptop_screen.jpg",
  "asus_rog_flow_x16_lcd_laptop_screen.jpg",
  "asus_rog_flow_z13_lcd_laptop_screen.jpg",
  "asus_rog_zephyrus_duo_15_laptop_lcd_screen.jpg",
  "asus_rog_zephyrus_duo_16_laptop_lcd_screen.jpg",
  "asus_rog_zephyrus_g14_laptop_lcd_screen.jpg",
  "asus_rog_zephyrus_g15_2021_display.jpg",
  "asus_rog_zephyrus_g15_laptop_lcd_screen.jpg",
  "asus_rog_zephyrus_g16_laptop_lcd_screen.jpg",
  "asus_rog_zephyrus_m15_laptop_lcd_screen.jpg",
  "asus_rog_zephyrus_m16_laptop_lcd_screen.jpg",
  "asus_rog_zephyrus_s17_laptop_lcd_screen.jpg",
  "asus_rog_zephyrus_s_gx531_laptop_lcd_screen.jpg",
  "asus_tuf_fa506qr_hn_series_laptop_lcd_screen.jpg",
  "asus_tuf_fx504ge_laptop_lcd_screen.jpg",
  "asus_tuf_fx504gm_laptop_lcd_screen.jpg",
  "asus_tuf_fx505dd_laptop_lcd_screen.jpg",
  "asus_tuf_fx505dt_laptop_lcd_screen.jpg",
  "asus_tuf_fx505du_laptop_lcd_screen.jpg",
  "asus_tuf_fx505dv_laptop_lcd_screen.jpg",
  "asus_tuf_fx505dy_laptop_lcd_screen.jpg",
  "asus_tuf_fx505ge_es_series_laptop_lcd_screen.jpg",
  "asus_tuf_fx505gm_series_laptop_lcd_screen.jpg",
  "asus_tuf_fx505gt_series_laptop_lcd_screen.jpg",
  "asus_tuf_fx505_laptop_lcd_screen.jpg",
  "asus_tuf_fx506ih_series_laptop_lcd_screen.jpg",
  "asus_tuf_fx506iu_series_lcd_laptop_screen.jpg",
  "asus_vivobook_15_laptop_display_screen.jpg",
  "asus_vivobook_e200_laptop_lcd_screen_e200ha.jpg",
  "asus_vivobook_e203mah_116_inch_30_pin_screen.jpg",
  "asus_vivobook_e402_laptop_lcd_screen_e402sa_e402na_e402ba_and_e402bp.jpg",
  "asus_vivobook_e403_laptop_lcd_screen_e403sa_and_e403na.jpg",
  "asus_vivobook_e410_e410m_laptop_lcd_screen.jpg",
  "asus_vivobook_e502_laptop_lcd_screen_e502na.jpg",
  "asus_vivobook_k15_laptop_display_screen.jpg",
  "asus_vivobook_m513ia_laptop_lcd_screen.jpg",
  "asus_vivobook_pro_n550jk_laptop_lcd_screen.jpg",
  "asus_vivobook_pro_n550jv_laptop_lcd_screen.jpg",
  "asus_vivobook_pro_n550jx_laptop_lcd_screen.jpg",
  "asus_vivobook_x441_laptop_lcd_screen.jpg",
  "asus_x515ja_ej332ts_laptop_screen_156.jpg",
  "asus_x515ja_fhd_laptop_screen.jpg",
  "asus_x550_screen_panel.jpg",
  "dell_alienware_13_r2_lcd_laptop_screen.jpg",
  "dell_alienware_13_r3_lcd_laptop_screen.jpg",
  "dell_alienware_15_r1_lcd_laptop_screen.jpg",
  "dell_alienware_15_r2_lcd_laptop_screen.jpg",
  "dell_alienware_15_r3_lcd_laptop_screen.jpg",
  "dell_alienware_15_r4_lcd_laptop_screen.jpg",
  "dell_alienware_m15_r1_lcd_laptop_screen.jpg",
  "dell_alienware_m15_r2_lcd_laptop_screen.jpg",
  "dell_g15_lcd_laptop_screen_g_series.jpg",
  "dell_g3_3500_lcd_laptop_screen_g_series.jpg",
  "dell_g5_lcd_laptop_screen_g_series.jpg",
  "dell_g7_lcd_laptop_screen_g_series.jpg",
  "dell_inspiron_13_7378_7368_touchscreen_display.jpg",
  "dell_inspiron_14_5410_display.jpg",
  "dell_inspiron_15_5558_laptop_screen_156_30_pin.jpg",
  "dell_inspiron_15_7559_laptop_screen_156_uhd_4k_lcd_with_touchscreen.jpg"
];

// Laptop Keyboards
const laptopKeyboardsImages = [
  "acer_aspire_3_laptop_keyboard.jpg",
  "acer_aspire_5738_keyboard_white.jpg",
  "acer_aspire_5_laptop_keyboard.jpg",
  "acer_aspire_7_laptop_keyboard.jpg",
  "acer_aspire_es1_132_laptop_keyboard.jpg",
  "acer_aspire_es1_572_33m8_keyboard.jpg",
  "acer_aspire_r3_131t_keyboard.jpg",
  "acer_extensa_15_laptop_keyboard.jpg",
  "acer_nitro_16_laptop_keyboard.jpg",
  "acer_nitro_17_laptop_keyboard.jpg",
  "acer_nitro_7_laptop_keyboard.jpg",
  "acer_one_14_z1_471_laptop_keyboard.jpg",
  "acer_one_14_z2_485_laptop_keyboard.jpg",
  "acer_predator_helios_16_gaming_laptop_keyboard.jpg",
  "acer_predator_helios_300_gaming_laptop_keyboard.jpg",
  "acer_predator_helios_500_gaming_laptop_keyboard.jpg",
  "acer_predator_triton_16_gaming_laptop_keyboard.jpg",
  "acer_predator_triton_300_gaming_laptop_keyboard.jpg",
  "acer_predator_triton_500_gaming_laptop_keyboard.jpg",
  "acer_spin_3_laptop_keyboard.jpg",
  "acer_spin_5_laptop_keyboard.jpg",
  "acer_spin_7_laptop_keyboard.jpg",
  "acer_swift_14_laptop_keyboard.jpg",
  "acer_swift_3_laptop_keyboard.jpg",
  "acer_swift_5_laptop_keyboard.jpg",
  "acer_swift_edge_16_laptop_keyboard.jpg",
  "acer_swift_go_14_laptop_keyboard.jpg",
  "acer_swift_go_laptop_keyboard.jpg",
  "acer_swift_x_16_laptop_keyboard.jpg",
  "acer_swift_x_laptop_keyboard.jpg",
  "acer_travelmate_laptop_keyboard_for_5760_5760g_7750_7750g_7750z_series.jpg",
  "apple_macbook_air_a1369_keyboard_mid_2011.jpg",
  "apple_macbook_air_a1465_keyboard_early_2015.jpg",
  "apple_macbook_air_a1466_keyboard_mid_2017.jpg",
  "apple_macbook_air_a1932_keyboard_2019.jpg",
  "apple_macbook_air_a2179_keyboard_2020.jpg",
  "apple_macbook_air_a2337_keyboard_2020.jpg",
  "apple_macbook_pro_a1425_keyboard_early_2013.jpg",
  "apple_macbook_pro_a1502_keyboard_early_2015.jpg",
  "apple_macbook_pro_a1706_keyboard_2017.jpg",
  "apple_macbook_pro_a1707_keyboard_2017.jpg",
  "apple_macbook_pro_a1989_keyboard_2019.jpg",
  "apple_macbook_pro_a2141_keyboard_2020.jpg",
  "apple_macbook_pro_a2159_keyboard_2019.jpg",
  "apple_macbook_pro_a2251_keyboard_2020.jpg",
  "apple_macbook_pro_a2289_keyboard_2020.jpg",
  "apple_macbook_pro_a2338_keyboard_2020.jpg",
  "apple_macbook_pro_keyboard_a1990_2019.jpg",
  "asus_f570_f570dd_f570ud_f570zd_laptop_keyboard_with_backlight.jpg",
  "asus_gl552v_laptop_backlit_keyboard.jpg",
  "asus_laptop_keyboard_for_x407_x407m_x407matpn_q211x407ubr_x407ua_x407ub_a407.jpg",
  "asus_laptop_keyboard_for_x451_x451e_x451c_x451v_x451ca_x451m_x451ma_x451mav_x403m_x453m_x453_x455l_s.jpg",
  "asus_m509da_keyboard.jpg",
  "asus_r558u_keyboard.jpg",
  "asus_rog_f570zd_keyboard.jpg",
  "asus_rog_flow_x13_laptop_keyboard.jpg",
  "asus_rog_flow_x16_laptop_keyboard.jpg",
  "asus_rog_flow_z13_laptop_keyboard.jpg",
  "asus_rog_strix_g15_g513ic_keyboard.jpg",
  "asus_rog_zephyrus_duo_15_laptop_keyboard.jpg",
  "asus_rog_zephyrus_duo_16_laptop_keyboard.jpg",
  "asus_rog_zephyrus_g14_laptop_keyboard.jpg",
  "asus_rog_zephyrus_g15_laptop_keyboard.jpg",
  "asus_rog_zephyrus_g16_laptop_keyboard.jpg",
  "asus_rog_zephyrus_m15_laptop_keyboard.jpg",
  "asus_rog_zephyrus_m16_laptop_keyboard.jpg",
  "asus_rog_zephyrus_s17_laptop_keyboard.jpg",
  "asus_rog_zephyrus_s_gx531_laptop_keyboard.jpg",
  "asus_tuf_fa506qr_hn_series_laptop_keyboard.jpg",
  "asus_tuf_fx504ge_laptop_keyboard.jpg",
  "asus_tuf_fx504gm_laptop_keyboard.jpg",
  "asus_tuf_fx505dd_laptop_keyboard.jpg",
  "asus_tuf_fx505dt_laptop_keyboard.jpg",
  "asus_tuf_fx505du_laptop_keyboard.jpg",
  "asus_tuf_fx505dv_laptop_keyboard.jpg",
  "asus_tuf_fx505dy_laptop_keyboard.jpg",
  "asus_tuf_fx505ge_es_series_laptop_keyboard.jpg",
  "asus_tuf_fx505gm_series_laptop_keyboard.jpg",
  "asus_tuf_fx505gt_series_laptop_keyboard.jpg",
  "asus_tuf_fx505g_series_laptop_keyboard.jpg",
  "asus_tuf_fx505_laptop_keyboard.jpg",
  "asus_tuf_fx506dt_keyboard.jpg",
  "asus_tuf_fx506ih_series_laptop_keyboard.jpg",
  "asus_tuf_fx506iu_series_laptop_keyboard.jpg",
  "asus_tuf_gaming_fx504_laptop_keyboard.jpg",
  "asus_vivobook_14_apu_laptop_keyboard.jpg",
  "asus_vivobook_15_x510u_keyboard.jpg",
  "asus_vivobook_e200_laptop_keyboard_e200ha_e201na_e202sa.jpg",
  "asus_vivobook_e402_laptop_keyboard_e402sa_e402na_e402ba_and_e402bp.jpg",
  "asus_vivobook_e403_laptop_keyboard_e403sa_and_e403na.jpg",
  "asus_vivobook_e410_e410m_laptop_keyboard.jpg",
  "asus_vivobook_e502_laptop_keyboard_e502na.jpg",
  "asus_vivobook_m513ia_laptop_keyboard.jpg",
  "asus_vivobook_pro_n550jk_laptop_keyboard.jpg",
  "asus_vivobook_pro_n550jv_laptop_keyboard.jpg",
  "asus_vivobook_pro_n550jx_laptop_keyboard.jpg",
  "asus_vivobook_x441_laptop_keyboard.jpg",
  "asus_zenbook_ux310ua_keyboard.jpg",
  "asus_zenbook_ux32vd_keyboard.jpg",
  "dell_alienware_13_r2_laptop_keyboard.jpg",
  "dell_alienware_13_r3_laptop_keyboard.jpg",
  "dell_alienware_15_r1_laptop_keyboard.jpg",
  "dell_alienware_15_r2_laptop_keyboard.jpg",
  "dell_alienware_15_r3_laptop_keyboard.jpg",
  "dell_alienware_15_r4_laptop_keyboard.jpg",
  "dell_alienware_m11x_laptop_keyboard.jpg",
  "dell_alienware_m15_r1_laptop_keyboard.jpg",
  "dell_backlit_keyboard_with_point_stick_for_latitude_5490_e7450_e5450_e5470_e7470_5480_7480.jpg",
  "dell_g15_laptop_keyboard_g_series.jpg",
  "dell_g3_3500_laptop_keyboard_g_series.jpg",
  "dell_g5_laptop_keyboard_g_series.jpg",
  "dell_g7_laptop_keyboard_g_series.jpg",
  "dell_inspiron_15_3000_5000_3541_3542_3543_3551_3558_5542_5545_5547_5558_5559_laptop_keyboards.jpg",
  "dell_inspiron_15_3000_5000_3541_3542_3543_5542_5545_5547_5558_17_5000_laptop_replacement_keyboard.jpg",
  "dell_inspiron_15_3567_keyboard.jpg",
  "dell_inspiron_15_5547_laptop_keyboard.jpg",
  "dell_inspiron_15_5567_keyboard_with_red_backlit.jpg"
];

// Laptop Batteries
const laptopBatteriesImages = [
  "battery.jpg", "bettry.jpg", "charger.jpg", "charginport.jpg", "fan.jpeg", "fan.jpg", "ssd.jpeg", "parts.jpg", "motherboard.jpg", "chiplverl.jpg",
  "acer_al14a32_battery.jpg",
  "acer_aspire_7_laptop_battery.jpg",
  "acer_aspire_one_756_laptop_battery.jpg",
  "acer_extensa_15_laptop_battery.jpg",
  "acer_nitro_17_laptop_battery.jpg",
  "acer_nitro_5_laptop_battery.jpg",
  "acer_predator_helios_16_gaming_laptop_battery.jpg",
  "acer_predator_helios_300_gaming_laptop_battery.jpg",
  "acer_predator_helios_500_gaming_laptop_battery.jpg",
  "acer_predator_triton_16_gaming_laptop_battery.jpg",
  "acer_predator_triton_300_gaming_laptop_battery.jpg",
  "acer_predator_triton_500_gaming_laptop_battery.jpg",
  "acer_spin_3_laptop_battery.jpg",
  "acer_spin_5_laptop_battery.jpg",
  "acer_spin_7_laptop_battery.jpg",
  "acer_swift_3_laptop_battery.jpg",
  "acer_swift_5_laptop_battery.jpg",
  "acer_swift_edge_16_laptop_battery.jpg",
  "acer_swift_go_laptop_battery.jpg",
  "acer_swift_x_laptop_battery.jpg",
  "acer_travelmate_4740_7552_6_cell_laptop_battery.jpg",
  "acer_travelmate_5760_battery.jpg",
  "acer_v5_571_al12a32_laptop_battery.jpg",
  "apple_a1417_laptop_battery_for_macbook_pro_155_inch.jpg",
  "apple_macbook_air_a1465_battery_11_inch_retina.jpg",
  "apple_macbook_air_a1465_battery_intel_core_i7_early_2014.jpg",
  "apple_macbook_air_a1466_battery.jpg",
  "apple_macbook_air_a1466_battery_with_intel_core_i5_2015_2017.jpg",
  "apple_macbook_air_a1932_battery_intel_core_i5_2019.jpg",
  "apple_macbook_air_a2179_battery_intel_core_i3_2020.jpg",
  "apple_macbook_air_a2337_battery_apple_m1_chip_2020.jpg",
  "apple_macbook_pro_a1278_battery.jpg",
  "apple_macbook_pro_a1398_battery_15_inch_retina.jpg",
  "apple_macbook_pro_a1425_battery_intel_core_i7_early_2013.jpg",
  "apple_macbook_pro_a1502_battery.jpg",
  "apple_macbook_pro_a1706_battery_intel_core_i7_2017.jpg",
  "apple_macbook_pro_a1707_battery_intel_core_i7_2017.jpg",
  "apple_macbook_pro_a1708_battery_13_inch_retina.jpg",
  "apple_macbook_pro_a1989_battery.jpg",
  "apple_macbook_pro_a1989_battery_2019.jpg",
  "apple_macbook_pro_a1990_battery_intel_core_i9_2019.jpg",
  "apple_macbook_pro_a2141_battery_intel_core_i9_2020.jpg",
  "apple_macbook_pro_a2159_battery_intel_core_i5_2019.jpg",
  "apple_macbook_pro_a2251_battery_intel_core_i7_2020.jpg",
  "apple_macbook_pro_a2289_battery_intel_core_i7_2020.jpg",
  "apple_macbook_pro_a2338_battery_apple_m1_chip_2020.jpg",
  "asus_c21n1333_laptop_battery.jpg",
  "asus_rog_flow_x13_laptop_battery.jpg",
  "asus_rog_flow_x16_laptop_battery.jpg",
  "asus_rog_flow_z13_laptop_battery.jpg",
  "asus_rog_zephyrus_duo_15_laptop_battery.jpg",
  "asus_rog_zephyrus_duo_16_laptop_battery.jpg",
  "asus_rog_zephyrus_g14_laptop_battery.jpg",
  "asus_rog_zephyrus_g15_laptop_battery.jpg",
  "asus_rog_zephyrus_g16_laptop_battery.jpg",
  "asus_rog_zephyrus_m15_laptop_battery.jpg",
  "asus_rog_zephyrus_m16_laptop_battery.jpg",
  "asus_rog_zephyrus_s17_laptop_battery.jpg",
  "asus_rog_zephyrus_s_gx531_laptop_battery.jpg",
  "asus_tuf_fa506qr_hn_series_laptop_battery.jpg",
  "asus_tuf_fx504ge_laptop_battery.jpg",
  "asus_tuf_fx504gm_laptop_battery.jpg",
  "asus_tuf_fx505_laptop_battery_fx505dd_fx505dt_fx505du_fx505dv_fx505dy_fx505g_fx505ge_es_fx505gm_fx50.jpg",
  "asus_tuf_fx506_series_laptop_battery_fx506iu_fx506ih.jpg",
  "asus_ux333f_notebook_laptop_battery.jpg",
  "asus_vivobook_15_x505za_battery.jpg",
  "asus_vivobook_e200_laptop_battery_e200ha_e201na_e202sa.jpg",
  "asus_vivobook_e402_laptop_battery_e402sa_e402na_e402ba_and_e402bp.jpg",
  "asus_vivobook_e403_laptop_battery_e403sa_and_e403na.jpg",
  "asus_vivobook_e410_e410m_laptop_battery.jpg",
  "asus_vivobook_e502_laptop_battery_e502na.jpg",
  "asus_vivobook_pro_n550jk_laptop_battery.jpg",
  "asus_vivobook_pro_n550jv_laptop_battery.jpg",
  "asus_vivobook_pro_n550jx_laptop_battery.jpg",
  "asus_vivobook_series_x556_battery.jpg",
  "asus_vivobook_x441_laptop_battery.jpg",
  "asus_vivobook_x505z_laptop_battery.jpg",
  "asus_vivobook_x541u_battery.jpg",
  "asus_x507_battery.jpg",
  "battery_for_acer_as16a5k_e5_475_e5_575_e5_774_f5_573.jpg",
  "battery_for_acer_aspire_e15_e5_475_as16a8k.jpg",
  "battery_for_acer_aspire_e5_422_e5_432_e5_452_e5_472_e5_473_e5_491_e5_522_e5_532_e5_552_e5_573_e5_574.jpg",
  "battery_for_apple_macbook_air_a1369.jpg",
  "battery_for_asus_c21n1634_x555_x555l_x555ld_x555la_x555ln.jpg",
  "battery_for_asus_k553m_x553m.jpg",
  "battery_for_asus_vivobook_x200ca_x200m.jpg",
  "battery_for_dell_alienware_17_r1_2f8k3.jpg",
  "battery_for_dell_alienware_18_r1_2f8k3.jpg",
  "battery_for_dell_chromebook_13_7310_series.jpg",
  "battery_for_dell_e5440_e5540.jpg",
  "battery_for_dell_inspiron_11_3000_3147_gk5ky.jpg",
  "battery_for_dell_inspiron_14_3000_series_3451_3452_3458_3459_3462_3465_3467.jpg",
  "battery_for_dell_inspiron_14_3421_14_3437_14_3443_14r_3421_15_3537_15_3521_15_3542_15r_5521_15r_553.jpg",
  "battery_for_dell_inspiron_14_5447_5448_5445_5547_15r_5545_14_3450_15_3550.jpg",
  "battery_for_dell_inspiron_1525_1526_1545_1546_y823g_x284g.jpg",
  "battery_for_dell_inspiron_15r_n5010_n5110_n4010_n4110_n5050_vostro_2520_2420_series.jpg",
  "battery_for_dell_inspiron_15_3000_series_15_3521_3537_3531_3542_3543_3541_3878_15r_5521_5537_17_3721.jpg",
  "battery_for_dell_inspiron_15_3000_series_17_3721_3737_17r_5737_5721_14_3421_3442_3443_40wh.jpg",
  "battery_for_dell_inspiron_15_3565.jpg",
  "battery_for_dell_inspiron_15_3576_p63f_p63f002_m5y1k.jpg",
  "battery_for_dell_inspiron_15_5567_5568_13_5368_5378.jpg",
  "battery_for_dell_inspiron_15_5570.jpg",
  "battery_for_dell_inspiron_15_7577_7588_7778_17_7779_7779.jpg",
  "battery_for_dell_inspiron_3421_5421_3521_5521_3721_5721_n121y_mr90y.jpg",
  "battery_for_dell_inspiron_3443_3531_3543.jpg",
  "battery_for_dell_inspiron_5520_5525_7520_5420_5425_7420.jpg",
  "battery_for_dell_inspiron_n5010_n5110_n5050_n5040_n4010_n4110.jpg",
  "battery_for_dell_inspiron_wdxor_7560_42wh.jpg",
  "battery_for_dell_latitude.jpg",
  "battery_for_dell_latitude_11_5175_1mcxm.jpg",
  "battery_for_dell_latitude_13_7370_wy7cg_xcnr3.jpg",
  "battery_for_dell_latitude_3480_33ydh_99nf2_56wh.jpg",
  "battery_for_dell_latitude_3490.jpg",
  "battery_for_dell_latitude_5290.jpg",
  "battery_for_dell_latitude_e5250_e5450_e5550_e5570.jpg",
  "battery_for_dell_latitude_e5270_e5470_e5570.jpg",
  "battery_for_dell_latitude_e5420_9_cell_xv2vv_nhxvw_05vfw.jpg",
  "battery_for_dell_latitude_e6520_e6440_e6430_e5520_e5420.jpg",
  "battery_for_dell_latitude_f3ygt_7280_7290_13_7380_7390_7480_7490.jpg",
  "battery_for_dell_vostro.jpg",
  "battery_for_dell_vostro_a840_a860_1014_1014n_1015_1015n_1088_1088n.jpg",
  "battery_for_dell_xps_12_13_9q33_9333_l221x_13_l322x_12d_1708.jpg",
  "battery_for_fujitsu_life_book_a555.jpg",
  "battery_for_hp_elitebook_8570p_8460p_6360b_6460b_6470b_6560b_6475b_8470w_8470p.jpg",
  "battery_for_hp_elitebook_cs03xl_745_g3_840_g3.jpg",
  "battery_for_hp_envy_14_u_15_k_17_k_series.jpg",
  "battery_for_hp_hs04_807956_001_807957_001_240_g4_245_g4_250_g4_255_g4_pavilion_14_ac_14_af_15_ac_15_.jpg",
  "battery_for_hp_pavilion_14_v_15_p_17_f_series.jpg",
  "battery_for_hp_pavilion_15.jpg",
  "battery_for_hp_pavilion_15_15_au010wm_15_au018wm_series.jpg",
  "battery_for_hp_pavilion_15_ac_15_ay_15_be_15_ba_14_ac_14_am_17_x_17_y_series.jpg",
  "battery_for_hp_pavilion_15_au_series_15_aw_hp_bp02xl.jpg",
  "battery_for_hp_pavilion_15_n203tx_15_n205tx_15_n010tx_15_f_series_15_n203tx_15_n205tx_15_n010tx_15_f.jpg",
  "battery_for_hp_pavilion_ht03xl_14_ce0025tu_14_ce0034tx_15_cs0037t_250_255_g7_hstnn_lb8l_l11421_421_s.jpg",
  "battery_for_hp_pavilion_x360_11m_series.jpg",
  "battery_for_lenovo_b40_b50_b40_30_b40_45_b40_70.jpg",
  "battery_for_lenovo_g50_70_g50_80_g40_70_z50_70_z50_80_g400s_g500s_g510s_4_cell.jpg",
  "battery_for_lenovo_ideapad_100_15iby_series.jpg",
  "battery_for_lenovo_ideapad_110_15isk_series.jpg",
  "battery_for_lenovo_ideapad_g460_g465_g470_g475_g560_g565_g570_g575_g770_g780_v360_v370_v470_v570_z37.jpg",
  "battery_for_lenovo_tablet_2_in_1_mix_2.jpg",
  "battery_for_lenovo_thinkpad_l480_20ls001.jpg",
  "battery_for_lenovo_thinkpad_l540_l440_t540p_t440p_w541_w540_series.jpg",
  "battery_for_lenovo_thinkpad_t430_t430i_t530_t530i.jpg",
  "battery_for_lenovo_yoga_730_l17c3pe0_l17l3pe0.jpg",
  "battery_for_microsoft_surface_book_1.jpg",
  "battery_for_microsoft_surface_pro_1_surface_pro_2_p21gu9.jpg",
  "battery_for_microsoft_surface_pro_3.jpg",
  "dell_e6400_e6410_e6500_e6510_laptop_battery.jpg",
  "dell_g3_3579_laptop_battery.jpg",
  "dell_inspiron_13_5378_battery.jpg",
  "dell_inspiron_13_p83g_p83g001_3_cell_laptop_battery.jpg",
  "dell_inspiron_1440_battery.jpg",
  "dell_inspiron_14_14r_battery.jpg",
  "dell_inspiron_14_15_17_14r_15r_17r_vostro_2421_2521_xcmrd_laptop_battery.jpg",
  "dell_inspiron_14_15_17_3521_3537_3542_3543_vostro_2421_2521_latitude_3440_3540_series_laptop_battery.jpg",
  "dell_inspiron_15rn5110_7126dbk_laptop_battery.jpg",
  "dell_inspiron_15r_5520_laptop_battery.jpg",
  "dell_inspiron_15_15r_battery.jpg",
  "dell_inspiron_15_3558_4_cell_m5y1k_laptop_battery.jpg"
];

// Adapters & Chargers
const adaptersChargersImages = [
  "90w_adapter_charger_for_sony_laptop_with_power_cord.jpg",
  "90w_adapter_for_dell_laptop_95vdc_462a_type_9rcdc_k8wxn_mv2mm_tk3dm.jpg",
  "90w_hp_notebook_laptop_adapter_with_45mm_connector.jpg",
  "ac_adapter_for_microsoft_surface_book_2.jpg",
  "adapter_charger_for_microsoft_laptop_44w.jpg",
  "adapter_charger_for_sony_laptop_vgp_ac19v60.jpg",
  "adapter_for_dell_cn_06tm1c_72438.jpg",
  "adapter_for_macbook_pro_13_a1278_a1181_a1150_a1151_a1172_a1184_a1185.jpg",
  "acer_aspire_7_laptop_adapter.jpg",
  "acer_extensa_15_laptop_adapter.jpg",
  "acer_nitro_16_laptop_adapter.jpg",
  "acer_nitro_17_laptop_adapter.jpg",
  "acer_nitro_5_laptop_adapter.jpg",
  "acer_nitro_7_laptop_adapter.jpg",
  "acer_predator_helios_16_gaming_laptop_adapter_helios_16_helios_neo_16.jpg",
  "acer_predator_helios_300_gaming_laptop_adapter.jpg",
  "acer_predator_helios_500_gaming_laptop_adapter.jpg",
  "acer_predator_triton_16_gaming_laptop_adapter.jpg",
  "acer_predator_triton_300_gaming_laptop_adapter.jpg",
  "acer_predator_triton_500_gaming_laptop_adapter_triton_500_triton_500_se.jpg",
  "acer_spin_3_laptop_adapter.jpg",
  "acer_spin_5_laptop_adapter.jpg",
  "acer_spin_7_laptop_adapter.jpg",
  "acer_swift_3_laptop_adapter.jpg",
  "acer_swift_5_laptop_adapter.jpg",
  "acer_swift_edge_16_laptop_adapter.jpg",
  "acer_swift_go_laptop_adapter.jpg",
  "acer_swift_x_laptop_adapter.jpg",
  "asus_ad45_00b_45w_laptop_adapter.jpg",
  "asus_rog_flow_x13_laptop_adapter.jpg",
  "asus_rog_flow_x16_laptop_adapter.jpg",
  "asus_rog_flow_z13_laptop_adapter.jpg",
  "asus_rog_zephyrus_duo_15_laptop_adapter.jpg",
  "asus_rog_zephyrus_duo_16_laptop_adapter.jpg",
  "asus_rog_zephyrus_g14_laptop_adapter.jpg",
  "asus_rog_zephyrus_g15_laptop_adapter.jpg",
  "asus_rog_zephyrus_g16_laptop_adapter.jpg",
  "asus_rog_zephyrus_m15_laptop_adapter.jpg",
  "asus_rog_zephyrus_m16_laptop_adapter.jpg",
  "asus_rog_zephyrus_s17_laptop_adapter.jpg",
  "asus_rog_zephyrus_s_gx531_laptop_adapter.jpg",
  "asus_tuf_f15_gaming_laptop_adapter.jpg",
  "asus_tuf_fa506qr_hn_series_laptop_adapter.jpg",
  "asus_tuf_fx504ge_laptop_adapter.jpg",
  "asus_tuf_fx504gm_laptop_adapter.jpg",
  "asus_tuf_fx505dd_laptop_adapter.jpg",
  "asus_tuf_fx505dt_laptop_adapter.jpg",
  "asus_tuf_fx505du_laptop_adapter.jpg",
  "asus_tuf_fx505dv_laptop_adapter.jpg",
  "asus_tuf_fx505dy_laptop_adapter.jpg",
  "asus_tuf_fx505ge_es_series_laptop_adapter.jpg",
  "asus_tuf_fx505gm_series_laptop_adapter.jpg",
  "asus_tuf_fx505gt_series_laptop_adapter.jpg",
  "asus_tuf_fx505g_series_laptop_adapter.jpg",
  "asus_tuf_fx505_laptop_adapter.jpg",
  "asus_tuf_fx506ih_series_laptop_adapter.jpg",
  "asus_tuf_fx506iu_series_laptop_adapter.jpg",
  "asus_vivobook_e200_laptop_adapter_e200ha.jpg",
  "asus_vivobook_e201_laptop_adapter_e201na.jpg",
  "asus_vivobook_e202_laptop_adapter_e202sa.jpg",
  "asus_vivobook_e402_laptop_adapter_e402sa_e402na_e402ba_and_e402bp.jpg",
  "asus_vivobook_e403_laptop_adapter_e403sa_and_e403na.jpg",
  "asus_vivobook_e410_e410m_laptop_adapter.jpg",
  "asus_vivobook_e502_laptop_adapter_e502na.jpg",
  "asus_vivobook_m513ia_laptop_adapter.jpg",
  "asus_vivobook_pro_n550jk_laptop_adapter.jpg",
  "asus_vivobook_pro_n550jv_laptop_adapter.jpg",
  "asus_vivobook_pro_n550jx_laptop_adapter.jpg",
  "asus_vivobook_x441_laptop_adapter.jpg",
  "charger_for_asus_chromebook_flip_c436_2_in_1_laptop.jpg",
  "charger_for_asus_laptop_adp_180mb_f_a17_180p1a.jpg",
  "charger_for_dell_precision_15_5540_with_power_cord.jpg",
  "charger_for_sony_laptop_vga_ac19v25_adp_90th.jpg",
  "dell_g3_3500_laptop_adapter_g_series.jpg",
  "dell_inspiron_11_3137_laptop_adapter.jpg",
  "dell_inspiron_11_3147_2_in_1_laptop_adapter.jpg",
  "dell_inspiron_11_3147_laptop_adapter.jpg",
  "dell_inspiron_11_3168_laptop_adapter.jpg",
  "dell_inspiron_11_3180_laptop_adapter.jpg",
  "dell_inspiron_11_3185_laptop_adapter.jpg",
  "dell_inspiron_11_7347_laptop_adapter.jpg"
];

// Cooling Fans
const coolingFansImages = [
  "compatible_cpu_cooling_fan_for_acer_aspire_v5_v5_472_v5_472_v5_472p_v5_572_v5_572_v5_572g_v5_572p_se.jpg",
  "compatible_internal_cpu_cooling_fan_for_hp_pavilion_14_15_14_d_15_d_240_g2_250_g2_laptop.jpg",
  "cooling_fan_cpu_for_hp_compaq_510_515_610_615_series_538455_001.jpg",
  "cpu_cooling_fan_cooler_for_acer_e5_571_e5_511_e5_521_e5_531_e5_551_v3_532.jpg",
  "cpu_cooling_fan_for_acer_aspire_e5_553_e5_553g_e5_532_e5_532g_e5_532t_e5_523_e5_523g_f5_771_f5_771g_.jpg",
  "cpu_cooling_fan_for_acer_aspire_v5_531_v5_531g_v5_571_v5_571g_v5_471g_v5_471_6473_v5_471_6569_v5_471.jpg",
  "cpu_cooling_fan_for_asus_a409_a409f_a409ua_x409_x409f_x409fj_x409fa_fl8700.jpg",
  "cpu_cooling_fan_for_dell_inspiron_15_5568_15_7569_15_7579_13_5368_13_5378.jpg",
  "cpu_cooling_fan_for_dell_inspiron_3441_3442_3443_3446_3541_3542_3543_3878.jpg",
  "cpu_cooling_fan_for_dell_latitude_3590_e3590_dell_inspiron_17_3780_3793_5770_15_3580_3581_3593_dell_.jpg",
  "cpu_cooling_fan_for_dell_latitude_e5420_p_n_2cpvp_02cpvp.jpg",
  "cpu_cooling_fan_for_dell_latitude_e6320.jpg",
  "cpu_cooling_fan_for_dell_latitude_e6420_mf60120v1_c220_g99.jpg",
  "cpu_cooling_fan_for_hp_pavilion_dv6_1000_series.jpg",
  "cpu_cooling_fan_for_hp_pavilion_x360_13_s_13_s000_13_s100_13_s121ca_series_laptop_cpu_cooling_fan_p_.jpg",
  "cpu_cooling_fan_for_hp_probook_4436s_4435s_4431s_4430s_4331s_4330s.jpg",
  "cpu_cooling_fan_for_lenovo_g560_g460_g560_z460_z460_z560_z565_ab06505hx12db00.jpg",
  "cpu_cooling_fan_for_lenovo_ideapad_310_15_310_15abr_310_15iap_310_15ikb_310_15isk_laptop_dc28000czf0.jpg",
  "cpu_fan_for_dell_latitude_e5570_07hjfg_7hjfg.jpg",
  "cpu_fan_for_lenovo_g575_g570_g475_g460_4_pins_dc280009bd00.jpg"
];

// DC Jacks & Connectors (Power & I/O Boards)
const dcJacksImages = [
  "dc_jack_connector_for_asus_x540s_q553ub.jpg",
  "dc_power_cable_for_dell_inspiron_15_5540_5542_5543_5545_5547_5548.jpg",
  "dc_power_connector_for_dell_inspiron_15_5370.jpg",
  "dc_power_jack_cable_for_hp_15_da_series.jpg",
  "dc_power_jack_connector_flex_cable_for_hp_probook_640_g1_645_g1_650_g1_655_g1.jpg",
  "dc_power_jack_connector_for_acer_aspire_4250_8943g.jpg",
  "dc_power_jack_connector_for_acer_aspire_4520_5950.jpg",
  "dc_power_jack_connector_for_asus_a43_a52_a53_a72_k42_k43_k52_k53_k72_u30_u52_u53_u56_x43_x44_x52_x53.jpg",
  "dc_power_jack_connector_for_asus_f201e_kx066du_series.jpg",
  "dc_power_jack_connector_for_asus_f751_x550_x751_series.jpg",
  "dc_power_jack_connector_for_asus_rog_gl502v_series.jpg",
  "dc_power_jack_connector_for_asus_x201ch.jpg",
  "dc_power_jack_connector_for_asus_x451_series.jpg",
  "dc_power_jack_connector_for_asus_x555_series.jpg",
  "dc_power_jack_connector_for_dell_inspiron_15r_series.jpg",
  "dc_power_jack_connector_for_dell_inspiron_15_5000_series.jpg",
  "dc_power_jack_connector_for_dell_inspiron_r6rkm_0r6rkm_bal30.jpg",
  "dc_power_jack_connector_for_dell_inspiron_tv8k5_0tv8k5.jpg",
  "dc_power_jack_connector_for_hp_1000_series.jpg",
  "dc_power_jack_connector_for_hp_15_ac_series.jpg",
  "dc_power_jack_connector_for_hp_compaq_presario_cq43_cq57.jpg",
  "dc_power_jack_connector_for_hp_compaq_presario_cq56_pavilion_g56_series.jpg",
  "dc_power_jack_connector_for_hp_pavilion_11k_series.jpg",
  "dc_power_jack_connector_for_hp_pavilion_14_bf_series.jpg",
  "dc_power_jack_connector_for_hp_probook_440_g1_series.jpg",
  "dc_power_jack_connector_for_lenovo_ideapad_100_14ibd_series.jpg",
  "dc_power_jack_connector_for_lenovo_thinkpad_e480_series.jpg",
  "dc_power_jack_connector_for_lenovo_x280_t490_t480s_x390.jpg",
  "dc_power_jack_connector_for_samsung_np_rc_rf_rv_s35_series.jpg",
  "dc_power_jack_connector_for_sony_sve_series.jpg",
  "dc_power_jack_connector_for_sony_vaio_pcg_series.jpg",
  "dc_power_jack_connector_for_sony_vaio_vgn_series.jpg",
  "dc_power_jack_for_acer_aspire_5750_series.jpg",
  "dc_power_jack_for_acer_aspire_5_a515_54_a515_54g.jpg",
  "dc_power_jack_for_acer_aspire_e15_series.jpg",
  "dc_power_jack_for_acer_aspire_s3_v5_timelinex_3820_gateway_id59_id59c_packard_bell_easynote_nm85_tx8.jpg",
  "dc_power_jack_for_asus_a43be_series.jpg",
  "dc_power_jack_for_asus_eee_pc_1001_1002_1003_1004_1005_1008_1011_1014_1015_1015p_1016_1101_1201_x101.jpg",
  "dc_power_jack_for_asus_f80_series.jpg",
  "dc_power_jack_for_asus_u31_series.jpg",
  "dc_power_jack_for_asus_ultrabook_zenbook_ux21e_ux31e_series.jpg",
  "dc_power_jack_for_asus_ux31la_ux301la_t200ma_series.jpg",
  "dc_power_jack_for_asus_ux_series.jpg",
  "dc_power_jack_for_dell_inspiron_14_3458_14_5455_14_5458_15_5000_15_5555_15_5558_kd4t9_0kd4t9_dc30100.jpg",
  "dc_power_jack_for_dell_inspiron_15r_5520_7520_n5520_m521r_5525_vostro_3560_0wx67p_06kvrf_22g_004q_a0.jpg",
  "dc_power_jack_for_dell_inspiron_m4010_series.jpg",
  "dc_power_jack_for_dell_inspiron_n311z_m311z_latitude_3330_vostro_v130_v131_gc2g4_0gc2g4_cn_0gc2g4_50.jpg",
  "dc_power_jack_for_dell_inspiron_one_2020_2301_v2320_v360.jpg",
  "dc_power_jack_for_dell_latitude_3340_3350_e3340_p47g_p47g001_p47g002_gfnmp_0gfnmp_dlr30_504oa05011_5.jpg",
  "dc_power_jack_for_dell_latitude_e6420.jpg",
  "dc_power_jack_for_hp_15r_series.jpg",
  "dc_power_jack_for_hp_elite_book_720_820_840_850_g1_g2_series.jpg",
  "dc_power_jack_for_hp_pavilion_dm4_3000_g6_2000_g7_2000_2000_2xxx_661680_001_661680_301_661680_302_66.jpg",
  "dc_power_jack_for_hp_probook_4310s_series.jpg",
  "dc_power_jack_for_hp_probook_4530s_4535s_4730s.jpg",
  "dc_power_jack_for_hp_probook_640_650_g2.jpg",
  "dc_power_jack_for_hp_stream_11_r_11_pro_g2_pavilion_11_s_11_s000_11_s002tu_11_s003tu.jpg",
  "dc_power_jack_for_lenovo_b50_series.jpg",
  "dc_power_jack_for_lenovo_g480_g485_g580_g585.jpg",
  "dc_power_jack_for_lenovo_ibm_ideapad_z560_g565_series.jpg",
  "dc_power_jack_for_lenovo_ideapad_flex_10_series.jpg",
  "dc_power_jack_for_lenovo_ideapad_g400_series.jpg",
  "dc_power_jack_for_lenovo_ideapad_g50_70_g50_75_g50_80_g50_85_g50_90_series.jpg",
  "dc_power_jack_for_lenovo_ideapad_g50_70_series.jpg",
  "dc_power_jack_for_lg_c500_r380_c_500_c400_r580_series_laptop.jpg",
  "dc_power_jack_for_samsung_np700z5a_np700z5ah_np700g7c_np870z5e_np700.jpg",
  "dc_power_jack_for_sony_pcg_z1_series.jpg",
  "dc_power_jack_for_toshiba_satellite_c850_s855d.jpg",
  "dc_power_jack_socket_for_acer_aspire_4253_series.jpg"
];

// Laptop Body Panels (Hinges, Base Covers, Bezels)
const laptopBodyPanelsImages = [
  "acer_aspire_4736_laptop_hinges.jpg",
  "acer_aspire_5100_laptop_hinges.jpg",
  "acer_aspire_e5_571_laptop_hinge.jpg",
  "acer_e1_570_base_cover.jpg",
  "acer_extensa_4630_laptop_hinges.jpg",
  "acer_travel_mate_4150_laptop_hinges.jpg",
  "base_cover_for_dell_inspiron_15_5558_5559_vostro_3558_series_p_n_0ptm4c_ptm4c.jpg",
  "base_cover_for_hp_15_bs_15_bs244wm_bs054la_15t_br_15q_bu_15t_bs_15_bw_250_255_g6_p_n_924911_001_seri.jpg",
  "base_cover_for_hp_pavilion_15ac_15_ac_15_ac_101tu_15_ac044tu_15_ac028tx_series.jpg",
  "base_cover_for_lenovo_thinkpad_t440s.jpg",
  "dell_inspiron_14r_n4010_hinge.jpg",
  "dell_inspiron_14r_n4010_laptop_hinges.jpg",
  "dell_inspiron_14r_n4030_laptop_hinges.jpg",
  "dell_inspiron_14z_5423_base_cover.jpg",
  "dell_inspiron_14z_n411z_bottom_base_cover.jpg",
  "dell_inspiron_1525_laptop_hinges.jpg",
  "dell_inspiron_1545_laptop_hinges.jpg",
  "dell_inspiron_15_3558_laptop_hinge.jpg",
  "dell_inspiron_15r_m5010_laptop_hinges.jpg",
  "dell_inspiron_15r_m501r_laptop_hinges.jpg",
  "dell_inspiron_15r_m5110_laptop_hinges.jpg",
  "dell_inspiron_15r_n5110_laptop_hinges.jpg"
];

// Motherboard ICs & Components (Cables, Speakers, Small Parts)
const motherboardComponentsImages = [
  "acer_aspire_4739_lvds_cable.jpg",
  "acer_aspire_d250_lvds_cable.jpg",
  "acer_swift_3_laptop_display_cable.jpg",
  "asus_1422_00k6000_lvds_cable_for_asus_g60_g60j_g60v_g60jx_g51vx_g60vx.jpg",
  "asus_rog_g531gt_replacement_laptop_speakers.jpg",
  "asus_tuf_gaming_f15_laptop_speaker_fx566li_hn162ts.jpg",
  "dell_e6330_lvds_cable.jpg",
  "dell_inspiron_1440_series_lvds_cable.jpg",
  "dell_inspiron_14r_n4110_lvds_cable.jpg",
  "dell_inspiron_1525_1526_lvds_cable.jpg",
  "dell_inspiron_1564_lvds_cable.jpg",
  "dell_inspiron_15_3558_5551_5558_5559_5555_lvds_cable.jpg",
  "dell_inspiron_15_3565_3567_lvds_cable.jpg",
  "dell_inspiron_15_5547_lvds_cable.jpg",
  "dell_inspiron_15_5567_lvds_cable.jpg",
  "dell_inspiron_15_5570_lvds_cable.jpg",
  "dell_inspiron_15r_5520_7520_lvds_cable.jpg",
  "dell_inspiron_15z_5523_lvds_cable.jpg",
  "dell_6000_6400_e1505_1501_v1000_lvds_cable.jpg"
];

// Wholesale Spare Parts (General SSDs & Storage not in Gaming)
const storageImages = [
  "adata_falcon_1tb_pcie_gen3x4_m2_2280_ssd_afalcon_1t_c.jpg",
  "adata_falcon_256gb_pcie_gen3x4_m2_2280_ssd.jpg",
  "adata_falcon_512gb_pcie_gen3x4_m2_2280_solid_state_drive.jpg",
  "adata_legend_700_512gb_pcie_gen3_x4_m2_2280_ssd.jpg",
  "adata_legend_710_256gb_pcie_gen3_x4_m2_2280_ssd_aleg_710_256gcs.jpg",
  "adata_legend_800_500gb_pcie_gen4_x4_m2_2280_ssd.jpg",
  "adata_swordfish_500gb_m2_pcie_gen3x4_internal_ssd.jpg",
  "adata_ultimate_su650_256gb_m2_sata_internal_ssd.jpg",
  "adata_ultimate_su650_256gb_sata_iii_internal_ssd_asu650ss_256gt_r.jpg",
  "adata_ultimate_su650_512gb_sata_iii_internal_ssd.jpg",
  "adata_ultimate_su750_25_inch_256gb_sata_iii_3d_tlc_internal_ssd.jpg",
  "adata_ultimate_su750_25_inch_512gb_sata_iii_3d_tlc_internal_ssd.jpg",
  "adata_ultimate_su800_256gb_3d_nand_ssd.jpg",
  "adata_ultimate_su800_512gb_3d_nand_ssd.jpg",
  "adata_xpg_1tb_sx8200_pro_pcie_gen3x4_m2_2280_ssd_asx8200pnp_1tt_c.jpg",
  "adata_xpg_256gb_sx6000_pro_pcie_gen3x4_m2_2280_ssd.jpg",
  "adata_xpg_gammix_s11_pro_1tb_pcie_gen3x4_m2_nvme_ssd_agammixs11p_1tt_c.jpg",
  "adata_xpg_gammix_s11_pro_256gb_pcie_gen3x4_m2_nvme_ssd.jpg",
  "adata_xpg_gammix_s11_pro_512gb_pcie_gen3x4_m2_nvme_ssd.jpg",
  "adata_xpg_gammix_s50_lite_512gb_m2_nvme_gen4_ssd.jpg",
  "adata_xpg_gammix_s5_256gb_3d_nand_m2_nvme_ssd.jpg",
  "adata_xpg_gammix_s5_512gb_3d_nand_m2_nvme_ssd.jpg",
  "adata_xpg_gammix_s70_blade_1tb_m2_nvme_gen4_internal_ssd_agammixs70b_1t_c.jpg",
  "adata_xpg_gammix_s70_blade_2tb_m2_nvme_internal_ssd_agammixs70b_2t_cs.jpg",
  "adata_xpg_sx6000_lite_256gb_pcie_gen3x4_m2_nvme_ssd_asx6000lnp_256gt_c.jpg",
  "adata_xpg_sx8100_256gb_pcie_gen3x4_m2_2280_nvme_ssd.jpg",
  "adata_xpg_sx8200_pro_256gb_pcie_gen3x4_m2_2280_ssd.jpg",
  "adata_xpg_sx8200_pro_512gb_pcie_gen3x4_m2_2280_ssd.jpg",
  "ant_esports_690_neo_pro_128gb_m2_nvme_internal_ssd.jpg",
  "ant_esports_690_neo_pro_1tb_m2_nvme_internal_ssd.jpg",
  "ant_esports_690_neo_pro_256gb_m2_nvme_internal_ssd.jpg",
  "ant_esports_690_neo_pro_512gb_m2_nvme_internal_ssd.jpg",
  "ant_esports_690_neo_sata_25_inch_128gb_ssd.jpg",
  "ant_esports_690_neo_sata_25_inch_1tb_ssd.jpg",
  "ant_esports_690_neo_sata_25_inch_256gb_ssd.jpg",
  "ant_esports_690_neo_sata_25_inch_2tb_ssd.jpg",
  "ant_esports_690_neo_sata_25_inch_512gb_ssd.jpg",
  "colorful_cn600_128gb_nvme_gen_3_ssd.jpg",
  "colorful_cn600_256gb_nvme_gen_3_ssd.jpg",
  "colorful_cn600_512gb_nvme_gen_3_ssd.jpg",
  "colorful_cn600_pro_256gb_nvme_pci_e_ssd.jpg",
  "colorful_cn700_pro_512gb_nvme_pci_e_gen_4_ssd.jpg",
  "colorful_sl300_128gb_sata_ssd.jpg",
  "corsair_mp600_gs_500gb_pcie_40_nvme_ssd.jpg",
  "corsair_mp600_pro_nh_2tb_pcie_40_gen_4_x4_nvme_m2_ssd_cssd_f2000gbmp600pnh.jpg",
  "crucial_500gb_t500_pcie_40_x4_m2_internal_ssd.jpg",
  "crucial_bx500_1tb_3d_nand_sata_25_inch_ssd_ct1000bx500ssd1.jpg",
  "crucial_bx500_1tb_ssd.jpg",
  "crucial_bx500_25_inch_2tb_sata_iii_3d_ssd_ct2000bx500ssd1.jpg",
  "crucial_bx500_480gb_ssd.jpg",
  "crucial_bx500_500gb_3d_nand_sata_25_inch_ssd.jpg",
  "crucial_mx500_1tb_3d_nand_sata_25_inch_7mm_internal_ssd_ct1000mx500ssd1.jpg",
  "crucial_mx500_2tb_3d_nand_sata_25_inch_7mm_internal_ssd_ct2000mx500ssd1.jpg",
  "crucial_mx500_500gb_3d_nand_sata_25_inch_7mm_internal_ssd.jpg",
  "crucial_mx500_500_gb_ssd.jpg",
  "crucial_p3_1tb_pcie_m2_nvme_gen_3_ssd_ct1000p3ssd8.jpg",
  "crucial_p3_2tb_pcie_m2_nvme_gen_3_ssd_ct2000p3ssd8.jpg",
  "crucial_p3_500gb_pcie_30_3d_ssd.jpg",
  "crucial_p3_500gb_pcie_m2_nvme_gen_3_ssd.jpg",
  "crucial_p3_plus_1tb_pcie_40_3d_nand_nvme_m2_ssd_ct1000p3pssd8.jpg",
  "crucial_p3_plus_2tb_pcie_40_3d_nand_nvme_m2_ssd_ct2000p3pssd8.jpg",
  "crucial_p3_plus_500gb_pcie_m2_nvme_gen_4_ssd.jpg",
  "crucial_p5_plus_2tb_pcie_m2_nvme_gen_4_gaming_ssd_ct2000p5pssd8.jpg",
  "crucial_p5_plus_500gb_pcie_m2_nvme_gen_4_gaming_ssd.jpg",
  "crucial_x6_1tb_portable_ssd_ct1000x6ssd9.jpg",
  "crucial_x6_500gb_portable_ssd_ct500x6ssd9.jpg",
  "crucial_x8_1tb_portable_ssd_ct1000x8ssd9.jpg",
  "crucial_x8_2tb_portable_ssd_ct2000x8ssd9.jpg",
  "dahua_256gb_nvme_m2_solid_state_drive.jpg"
];


const chipLevelRepairImages = [
  "acer_aspire_7_a715_42g_laptop_motherboard.jpg", // Showing a motherboard implies chip level
  "asus_rog_strix_g531gt_core_i7_motherboard_60nr01l0_mb3110.jpg"
];

const macBookRepairImages = [
  "apple_macbook_pro_a1278_battery.jpg",
  "apple_macbook_air_a1466_keyboard_mid_2017.jpg",
  "adapter_for_macbook_pro_13_a1278_a1181_a1150_a1151_a1172_a1184_a1185.jpg"
];

const trainingCourseImages = [
  "repair_training_placeholder.jpg" // You might need a specific image for this, or use a motherboard image
];


  // ----------------------------------------------------
  // END OF PASTE SECTION
  // ----------------------------------------------------

  // Grouping arrays with their target categories
  const dataMapping = [
    { cat: "Chip-Level Repair Service", images: chipLevelRepairImages },
    { cat: "MacBook & iPad Repair", images: macBookRepairImages },
    // { cat: "Repair Training Course", images: laptopsImages },
    { cat: "Gaming PC Builds", images: gamingPcBuildsImages },
    { cat: "Laptop Motherboards", images: laptopMotherboardsImages },
    { cat: "Laptops", images: laptopsImages },
    { cat: "Laptop Screens", images: laptopScreensImages },
    { cat: "Laptop Keyboards", images: laptopKeyboardsImages },
    { cat: "Laptop Batteries", images: laptopBatteriesImages },
    { cat: "Adapters & Chargers", images: adaptersChargersImages },
    { cat: "Cooling Fans", images: coolingFansImages },
    { cat: "DC Jacks & Connectors", images: dcJacksImages },
    { cat: "Laptop Body Panels", images: laptopBodyPanelsImages },
    { cat: "Motherboard ICs & Components", images: motherboardComponentsImages },
    { cat: "Wholesale Components", images: storageImages },
  ];

  // ====================================================
  // 5. SEED PRODUCTS (Dynamic Generation)
  // ====================================================
  console.log("🌱 Seeding products dynamically from image lists...");

  const allProducts = [];

  for (const group of dataMapping) {
    const catId = getCategoryId(group.cat);
    
    // Check if images array is empty (in case you didn't paste them all)
    if (!group.images || group.images.length === 0) continue;

    for (const imgName of group.images) {
      const title = formatTitle(imgName);
      const price = getRandomPrice(group.cat);
      const manufacturer = title.split(' ')[0]; // Guess manufacturer from first word

      const product = await prisma.product.create({
        data: {
          title: title,
          slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${uuidv4().slice(0, 6)}`,
          description: `High quality ${title}. Genuine spare parts available for wholesale and retail. Tested and verified component.`,
          price: price,
          rating: 5,
          inStock: 50,
          manufacturer: manufacturer,
          mainImage: `${GITHUB_BASE}${imgName}`,
          categoryId: catId,
          images: {
            create: [
              { image: `${GITHUB_BASE}${imgName}` }
            ]
          }
        }
      });
      allProducts.push(product);
    }
    console.log(`✅ Seeded ${group.images.length} products for ${group.cat}`);
  }

  // 6. SEED MANUAL PRODUCTS (Services & Specials) 

  console.log("🌱 Seeding manual specialized products...");

  const manualProducts = [
    {
      title: "Laptop Chip-Level Repair Service",
      description: "Complete motherboard diagnosis and repair for Dead Laptop, No Display, Short Circuit.",
      price: 3500,
      manufacturer: "Service",
      category: "Chip-Level Repair Service",
      image: "acer_aspire_7_a715_42g_laptop_motherboard.jpg" // Placeholder from list
    },
    {
      title: "MacBook Logic Board Repair",
      description: "Expert level repair for MacBook Pro and Air logic boards. Liquid damage specialist.",
      price: 8500,
      manufacturer: "Apple Service",
      category: "MacBook & iPad Repair",
      image: "apple_macbook_pro_a1278_battery.jpg" 
    },
    {
      title: "Advanced Laptop Repair Training Course",
      description: "45 Days extensive training. Schematic reading, BIOS programming, IO Controller logic.",
      price: 25000,
      manufacturer: "Institute",
      category: "Repair Training Course",
      image: "asus_rog_strix_g531gt_core_i7_motherboard_60nr01l0_mb3110.jpg" // Placeholder
    }
  ];

  for (const prod of manualProducts) {
    const catId = getCategoryId(prod.category);
    await prisma.product.create({
      data: {
        title: prod.title,
        slug: `${prod.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${uuidv4().slice(0, 6)}`,
        description: prod.description,
        price: prod.price,
        rating: 5,
        inStock: 100,
        manufacturer: prod.manufacturer,
        mainImage: `${GITHUB_BASE}${prod.image}`,
        categoryId: catId,
        images: {
          create: [{ image: `${GITHUB_BASE}${prod.image}` }]
        }
      }
    });
  }

  // ====================================================
  // 7. SEED MESSAGES
  // ====================================================
  const messagesData = [
    {
      name: "Suresh Tech",
      email: "suresh.tech@example.com",
      phone: "9876543210",
      subject: "Bulk Inquiry for Cables",
      message: "Do you sell MacBook display cables separately? I need bulk quantity."
    },
    {
      name: "Amit Kumar",
      email: "amit.k@example.com",
      phone: "9122901467",
      subject: "Service Request",
      message: "My laptop is overheating. Do you provide cleaning service?"
    },
    {
      name: "Rahul Singh", 
      email: "user@example.com",
      phone: "9122901467",
      subject: "Order Status",
      message: "I ordered a battery yesterday, when will it be shipped?"
    }
  ];

  await prisma.message.createMany({ data: messagesData });
  console.log(`✅ ${messagesData.length} messages seeded.`);

  // ====================================================
  // 8. SEED ORDERS
  // ====================================================
  console.log("🌱 Seeding customer orders...");
  
  if (allProducts.length > 2 && createdUsers.length > 1) {
    const customerUser = createdUsers[1]; 
    const productA = allProducts[0]; 
    const productB = allProducts[1]; 

    await prisma.customer_order.create({
      data: {
        userId: customerUser.id,
        name: "Rahul",
        lastname: "Singh",
        phone: "9122901467",
        email: customerUser.email,
        company: "Tech Solutions Pvt Ltd",
        adress: "SP Verma Road",
        apartment: "1st Floor, Om Complex",
        postalCode: "800001",
        city: "Patna",
        country: "India",
        status: "Processing",
        total: productA.price + (productB.price * 2),
        products: {
          create: [
            { productId: productA.id, quantity: 1 },
            { productId: productB.id, quantity: 2 },
          ],
        },
      },
    });
    console.log("✅ Sample wholesale order seeded.");
  }

  // ====================================================
  // 9. SEED ADDRESSES
  // ====================================================
  console.log("🌱 Seeding addresses...");
  
  for (const user of createdUsers) {
    await prisma.address.create({
      data: {
        userId: user.id,
        name: user.name,
        lastname: "",
        address: "Laptop Solutions & Enterprises, SP Verma Road",
        city: "Patna",
        postalCode: "800001",
        country: "India",
        isDefault: true,
      },
    });
  }
  console.log("✅ Default addresses seeded.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("🎉 Seeding finished successfully. Disconnecting...");
    await prisma.$disconnect();
  });