const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting the seeding process...");

  // 1. CLEANUP EXISTING DATA
  console.log("🧹 Cleaning up the database...");
  await prisma.wishlist.deleteMany();
  await prisma.cart.deleteMany(); // Added Cart cleanup
  await prisma.customer_order_product.deleteMany();
  await prisma.customer_order.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany(); // Added Address cleanup
  await prisma.user.deleteMany();
  console.log("✅ Database cleaned.");

  // 2. SEED CATEGORIES
  console.log("🌱 Seeding categories...");
  const demoCategoriesData = [
    { name: "Laptops" }, // Added for your new products
    { name: "Electronics" },
    { name: "Animated 3D Posters" },
    { name: "Anime Metal Posters" },
    { name: "Key Chains" },
    { name: "Super Hero Collection" },
    { name: "Video Game Posters" },
  ];
  
  await prisma.category.createMany({ data: demoCategoriesData });
  const createdCategories = await prisma.category.findMany();
  console.log(`✅ ${createdCategories.length} categories seeded.`);

  // Helper to find category ID
  const getCategoryId = (name) => {
    const cat = createdCategories.find((c) => c.name === name);
    return cat ? cat.id : createdCategories[0].id;
  };

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
        verified: true, // Auto-verify for demo
        name: userData.email.split("@")[0],
      },
    });
    createdUsers.push(user);
    console.log(`✅ User seeded: ${user.email}`);
  }

  // 4. SEED PRODUCTS (Specific Logic for your Images)
  console.log("🌱 Seeding specific products...");

  // Base URL for your images
  const githubBase = "https://raw.githubusercontent.com/ajaykumarsaini231/Hariom-Shop/refs/heads/main/server/public/assest/";

  // --- Product 1: The specific list you asked for ---
  const product1Images = ["4_1.jpeg", "7.jpeg", "10.jpeg", "11.jpeg", "12.jpeg"];
  
  // --- Product 2: The "Other" images ---
  const product2Images = ["1.jpeg", "2.jpeg", "3.jpeg", "5.jpeg", "6.jpeg", "8.jpeg", "9.jpeg", "13.jpeg", "14.jpeg"];

  // Define the 2 Products
  const productsToCreate = [
    {
      title: "HP EliteBook x360 G8 | i7 11th Gen",
      description: "Premium convertible business laptop with touch screen and high performance.",
      price: 45999,
      manufacturer: "HP",
      images: product1Images,
    },
    {
      title: "Dell Latitude 7420 | i5 11th Gen",
      description: "Durable and powerful laptop perfect for professionals and students.",
      price: 32500,
      manufacturer: "Dell",
      images: product2Images,
    },
  ];

  const allProducts = [];

  for (const prodData of productsToCreate) {
    // Use the first image in the list as the main image
    const mainImgUrl = `${githubBase}${prodData.images[0]}`;
    
    // Create the product
    const product = await prisma.product.create({
      data: {
        title: prodData.title,
        slug: `${prodData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${uuidv4().slice(0, 6)}`,
        description: prodData.description,
        price: prodData.price,
        rating: 5,
        inStock: 15,
        manufacturer: prodData.manufacturer,
        mainImage: mainImgUrl,
        categoryId: getCategoryId("Laptops"),
        
        // Create related Image records for ALL images in the list
        images: {
          create: prodData.images.map(imgName => ({
            image: `${githubBase}${imgName}`,
          })),
        },
      },
    });
    allProducts.push(product);
    console.log(`✅ Product created: ${prodData.title}`);
  }

  // 5. SEED ORDERS (Using the new products)
  console.log("🌱 Seeding customer orders...");
  if (allProducts.length > 0 && createdUsers.length > 0) {
    const user = createdUsers[1]; // Use the normal user
    const product1 = allProducts[0];
    const product2 = allProducts[1];

    await prisma.customer_order.create({
      data: {
        userId: user.id,
        name: "Ajay",
        lastname: "Saini",
        phone: "9876543210",
        email: user.email,
        company: "Hari Om Electronics",
        adress: "Shop No 5, Market Road",
        apartment: "Near Bus Stand",
        postalCode: "302001",
        city: "Jaipur",
        country: "India",
        status: "Pending",
        total: product1.price + product2.price,
        products: {
          create: [
            { productId: product1.id, quantity: 1 },
            { productId: product2.id, quantity: 1 },
          ],
        },
      },
    });
    console.log("✅ Sample order seeded.");
  }

  // 6. SEED ADDRESSES
  console.log("🌱 Seeding addresses...");
  for (const user of createdUsers) {
    await prisma.address.create({
      data: {
        userId: user.id,
        name: "Ajay",
        lastname: "Kumar",
        address: "Hari Om Electronics Store",
        city: "Jaipur",
        postalCode: "302012",
        country: "India",
        phone: "9876543210",
        isDefault: true,
      },
    });
  }
  console.log("✅ Addresses seeded.");
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