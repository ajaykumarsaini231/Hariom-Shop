const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting the seeding process...");

  // 1. CLEANUP EXISTING DATA
  console.log("🧹 Cleaning up the database...");
  // Delete in order of dependencies (Child -> Parent)
  await prisma.wishlist.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.customer_order_product.deleteMany();
  await prisma.customer_order.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.address.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Database cleaned.");

  // 2. SEED CATEGORIES
  console.log("🌱 Seeding categories...");
  const demoCategoriesData = [
    { name: "Laptops" }, // Added specifically for your products
    // { name: "Smartphones" },
    // { name: "Accessories" },
    // { name: "Gaming Consoles" },
    // { name: "Headphones" },
  ];
  
  await prisma.category.createMany({ data: demoCategoriesData });
  const createdCategories = await prisma.category.findMany();
  console.log(`✅ ${createdCategories.length} categories seeded.`);

  // Helper to find category ID
  const laptopCategory = createdCategories.find(c => c.name === "Laptops");

  // 3. SEED USERS
  console.log("🌱 Seeding users...");
  const rawUsers = [
    { email: "ajay@example.com", password: "Password@123", role: "admin" },
    { email: "user@example.com", password: "Password@123", role: "user" },
  ];

  const createdUsers = [];
  for (const userData of rawUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        name: userData.email.split("@")[0],
        verified: true,
      },
    });
    createdUsers.push(user);
    console.log(`✅ User seeded: ${user.email}`);
  }

  // 4. SEED PRODUCTS & IMAGES
  console.log("🌱 Seeding products and images...");

  // Base URL for your images
  const githubBaseUrl = "https://raw.githubusercontent.com/ajaykumarsaini231/server/refs/heads/main/public/";

  // DATA DEFINITION BASED ON YOUR REQUEST
  const productSeeds = [
    {
      title: "HP Envy x360 Convertible 15-es0000", // Product 1
      manufacturer: "HP",
      price: 85000,
      description: "Experience the power and versatility of the HP Envy x360. Featuring a 360-degree hinge, vivid display, and high-performance processor.",
      imageFiles: ["4_1.jpeg", "7.jpeg", "10.jpeg", "11.jpeg", "12.jpeg"]
    },
    {
      title: "Dell Latitude 5420 Business Laptop", // Product 2 (The Rest)
      manufacturer: "Dell",
      price: 52000,
      description: "Work confidently with this durable 14-inch business laptop. Features advanced security, long battery life, and powerful performance.",
      imageFiles: ["1.jpeg", "2.jpeg", "3.jpeg", "5.jpeg", "6.jpeg", "8.jpeg", "9.jpeg", "13.jpeg", "14.jpeg"]
    }
  ];

  const allProducts = [];

  for (const p of productSeeds) {
    if (!laptopCategory) {
        console.error("❌ Category 'Laptops' not found. Skipping product.");
        continue;
    }

    // 1. Prepare Main Image URL (Use the first image in the list)
    const mainImageUrl = `${githubBaseUrl}${p.imageFiles[0]}`;

    // 2. Prepare Array for Image Relation (All images including main)
    const imageRelationData = p.imageFiles.map(fileName => ({
        image: `${githubBaseUrl}${fileName}`
    }));

    // 3. Create Product
    const product = await prisma.product.create({
      data: {
        title: p.title,
        slug: `${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${uuidv4().slice(0, 6)}`,
        mainImage: mainImageUrl, // Stores the first image string
        price: p.price,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        description: p.description,
        manufacturer: p.manufacturer,
        inStock: Math.floor(Math.random() * 50) + 10,
        categoryId: laptopCategory.id,
        // Insert related images into Image table
        images: {
            create: imageRelationData
        }
      },
    });
    
    allProducts.push(product);
    console.log(`✅ Product seeded: ${p.title}`);
  }


  // 5. SEED ORDERS
  console.log("🌱 Seeding customer orders...");
  if (allProducts.length >= 2 && createdUsers.length > 0) {
    for (let i = 0; i < 3; i++) {
      const user = createdUsers[i % createdUsers.length];
      const product1 = allProducts[0];
      const product2 = allProducts[1];
      
      await prisma.customer_order.create({
        data: {
          userId: user.id,
          name: user.name || "User",
          lastname: "Demo",
          phone: "9876543210",
          email: user.email,
          company: "Tech Solutions Inc.",
          adress: "123 Tech Park",
          apartment: "Suite 404",
          postalCode: "110020",
          city: "New Delhi",
          country: "India",
          status: ["Pending", "Shipped", "Delivered"][i],
          orderNotice: "Please deliver between 9 AM - 5 PM",
          total: product1.price + (product2.price * 2),
          products: {
            create: [
              { productId: product1.id, quantity: 1 },
              { productId: product2.id, quantity: 2 },
            ],
          },
        },
      });
    }
    console.log("✅ 3 sample orders seeded.");
  }

  // 6. SEED ADDRESSES
  console.log("🌱 Seeding addresses...");
  if (createdUsers.length > 0) {
    for (const user of createdUsers) {
      await prisma.address.createMany({
        data: [
          {
            userId: user.id,
            name: user.name || "Ajay",
            lastname: "Saini",
            address: "H-123, Vasant Vihar",
            city: "New Delhi",
            postalCode: "110057",
            country: "India",
            phone: "9876543210",
            isDefault: true,
          },
          {
            userId: user.id,
            name: user.name || "Ajay",
            lastname: "Office",
            address: "Cyber City, DLF Phase 2",
            city: "Gurugram",
            postalCode: "122002",
            country: "India",
            phone: "9998887776",
            isDefault: false,
          },
        ],
      });
      console.log(`✅ Dummy addresses seeded for user: ${user.email}`);
    }
  }

  // 7. SEED WISHLISTS
  console.log("🌱 Seeding wishlists...");
  if (allProducts.length > 0 && createdUsers.length > 0) {
      const user = createdUsers[0];
      const product = allProducts[0]; // Add first product to wishlist

      await prisma.wishlist.upsert({
        where: {
          userId_productId: {
            userId: user.id,
            productId: product.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          productId: product.id,
        },
      });
    console.log("✅ Sample wishlist items seeded.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("🎉 Seeding finished. Disconnecting Prisma Client.");
    await prisma.$disconnect();
  });