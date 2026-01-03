const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

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
    // --- Major Hardware ---
    { name: "Laptops" },
    { name: "Gaming PC Builds" },
    { name: "Laptop Motherboards" },

    // --- Wholesale Spare Parts ---
    { name: "Laptop Screens" },
    { name: "Laptop Keyboards" },
    { name: "Laptop Batteries" },
    { name: "Adapters & Chargers" },
    { name: "Cooling Fans" },
    { name: "DC Jacks & Connectors" },
    { name: "Laptop Body Panels" }, 
    { name: "Motherboard ICs & Components" }, 

    // --- Services ---
    { name: "Chip-Level Repair Service" },
    { name: "MacBook & iPad Repair" },
    { name: "Repair Training Course" },
  ];

  // Insert categories and fetch them back to get IDs
  await prisma.category.createMany({ data: categoriesData });
  const createdCategories = await prisma.category.findMany();
  console.log(`✅ ${createdCategories.length} categories seeded.`);

  // Helper to find category ID by name
  const getCategoryId = (name) => {
    const cat = createdCategories.find((c) => c.name === name);
    return cat ? cat.id : createdCategories[0].id; // Fallback to first cat
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
  // 4. SEED PRODUCTS
  // ====================================================
  console.log("🌱 Seeding products...");

  // Base URL for your images (Using 'assest' folder as requested)
  // Ensure your frontend/public folder structure matches this or adjust the URL.
  // For local seeding, we'll assume these filenames exist in your system/cloud.
  // Using the GitHub raw link as per your previous code for consistency:
  const githubBase = "https://raw.githubusercontent.com/ajaykumarsaini231/Hariom-Shop/refs/heads/main/server/public/assest/";

  // --- Image Lists ---
  // List 1: "laptop.png" and others relevant to laptops
  const laptopImages = ["laptop.png", "macbook.jpg", "macbook2.jpg", "laptopscreen.jpg"];
  
  // List 2: Component images
  const partImages = ["battery.jpg", "bettry.jpg", "charger.jpg", "charginport.jpg", "fan.jpeg", "fan.jpg", "ssd.jpeg", "parts.jpg", "motherboard.jpg", "chiplverl.jpg"];

  // List 3: Service images
  const serviceImages = ["laptopreparing.jpg", "screendamage.jpg", "laptops-repair-639676639.jpg"];

  const productsToCreate = [
    // --- LAPTOPS ---
    {
      title: "HP EliteBook 840 G8 | i5 11th Gen",
      description: "Business class laptop with 16GB RAM, 512GB NVMe SSD. Perfect for professionals. 1 Year Warranty.",
      price: 42500,
      manufacturer: "HP",
      category: "Laptops",
      images: [laptopImages[0], laptopImages[3]], // laptop.png
    },
    {
      title: "MacBook Pro M1 13-inch (Refurbished)",
      description: "Apple M1 Chip, 8GB Unified Memory, 256GB SSD. Mint condition with original charger.",
      price: 65000,
      manufacturer: "Apple",
      category: "Laptops",
      images: [laptopImages[1], laptopImages[2]], // macbook.jpg
    },

    // --- MOTHERBOARDS ---
    {
      title: "Dell Latitude 3540 Motherboard i5",
      description: "Original OEM Motherboard for Dell Latitude 3540. Tested OK. Chipset: Intel i5 4th Gen.",
      price: 4500,
      manufacturer: "Dell",
      category: "Laptop Motherboards",
      images: ["motherboard.jpg", "chiplverl.jpg"],
    },

    // --- SPARE PARTS (WHOLESALE) ---
    {
      title: "Original Battery for HP LA04",
      description: "4 Cell Li-ion Battery compatible with HP 15-r series. 1 Year Replacement Warranty.",
      price: 1250,
      manufacturer: "HP",
      category: "Laptop Batteries",
      images: ["battery.jpg", "bettry.jpg"],
    },
    {
      title: "65W USB-C Adapter (Dell/HP/Lenovo)",
      description: "Universal Type-C Laptop Charger. Fast charging support with surge protection.",
      price: 850,
      manufacturer: "OEM",
      category: "Adapters & Chargers",
      images: ["charger.jpg", "charginport.jpg"],
    },
    {
      title: "Laptop Cooling Fan (ASUS Gaming)",
      description: "High RPM copper cooling fan for ASUS TUF/ROG series. Solves overheating issues.",
      price: 650,
      manufacturer: "Asus",
      category: "Cooling Fans",
      images: ["fan.jpeg", "fan.jpg"],
    },
    {
      title: "512GB NVMe M.2 SSD",
      description: "Gen 3x4 PCIe Solid State Drive. Read speeds up to 3500MB/s. 3 Year Warranty.",
      price: 2800,
      manufacturer: "Samsung",
      category: "Wholesale Components", // Fallback or new cat
      images: ["ssd.jpeg", "parts.jpg"],
    },

    // --- SERVICES ---
    {
      title: "Laptop Screen Replacement Service",
      description: "We replace broken/cracked screens for all laptop brands. Price includes labour and standard 15.6 LED.",
      price: 3500,
      manufacturer: "Service",
      category: "Chip-Level Repair Service",
      images: ["screendamage.jpg", "laptopscreen.jpg"],
    },
    {
      title: "Dead Laptop Diagnosis & Repair",
      description: "Complete chip-level diagnosis for dead laptops (No Power, No Display). Estimation after checkup.",
      price: 500, // Diagnosis fee
      manufacturer: "Service",
      category: "Chip-Level Repair Service",
      images: ["laptopreparing.jpg", "chiplverl.jpg"],
    }
  ];

  const allProducts = [];

  for (const prodData of productsToCreate) {
    // 1. Determine Category ID
    // If exact category name not found in DB, default to "Laptops"
    let catId = getCategoryId(prodData.category);
    if (!catId) catId = getCategoryId("Laptops");

    // 2. Prepare Image URL
    const mainImgUrl = `${githubBase}${prodData.images[0]}`;

    // 3. Create Product
    const product = await prisma.product.create({
      data: {
        title: prodData.title,
        slug: `${prodData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${uuidv4().slice(0, 6)}`,
        description: prodData.description,
        price: prodData.price,
        rating: 5, // Default high rating
        inStock: 50, // Wholesale quantity
        manufacturer: prodData.manufacturer,
        mainImage: mainImgUrl,
        categoryId: catId,
        
        // 4. Create Related Images
        images: {
          create: prodData.images.map((imgName) => ({
            image: `${githubBase}${imgName}`,
          })),
        },
      },
    });
    
    allProducts.push(product);
    console.log(`✅ Product created: ${prodData.title}`);
  }

  // ====================================================
  // 5. SEED ORDERS
  // ====================================================
  console.log("🌱 Seeding customer orders...");
  
  if (allProducts.length > 0 && createdUsers.length > 1) {
    const customerUser = createdUsers[1]; 
    const productA = allProducts[0]; // Laptop
    const productB = allProducts[3]; // Battery

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
        total: productA.price + productB.price,
        products: {
          create: [
            { productId: productA.id, quantity: 1 },
            { productId: productB.id, quantity: 2 }, // Wholesale qty
          ],
        },
      },
    });
    console.log("✅ Sample wholesale order seeded.");
  }

  // ====================================================
  // 6. SEED ADDRESSES
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