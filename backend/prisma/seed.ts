import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data so the seed can be run again safely.
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "T-Shirts" },
    }),
    prisma.category.create({
      data: { name: "Shirts" },
    }),
    prisma.category.create({
      data: { name: "Jeans" },
    }),
    prisma.category.create({
      data: { name: "Shoes" },
    }),
    prisma.category.create({
      data: { name: "Accessories" },
    }),
  ]);

  const categoryMap = Object.fromEntries(
    categories.map((category) => [category.name, category.id]),
  );

  // Create products
  const products = [
    {
      title: "Classic Cotton T-Shirt",
      slug: "classic-cotton-t-shirt",
      description: "Comfortable everyday cotton t-shirt with a clean design.",
      price: "24.99",
      category: "T-Shirts",
      rating: 4.5,
      stock: 42,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Oversized Essential T-Shirt",
      slug: "oversized-essential-t-shirt",
      description: "Relaxed-fit oversized t-shirt designed for everyday wear.",
      price: "29.99",
      category: "T-Shirts",
      rating: 4.3,
      stock: 35,
      image:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Premium Polo T-Shirt",
      slug: "premium-polo-t-shirt",
      description: "Premium polo shirt with a smart casual appearance.",
      price: "39.99",
      category: "T-Shirts",
      rating: 4.7,
      stock: 28,
      image:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80",
    },

    {
      title: "Linen Casual Shirt",
      slug: "linen-casual-shirt",
      description: "Lightweight linen shirt suitable for casual occasions.",
      price: "44.99",
      category: "Shirts",
      rating: 4.6,
      stock: 24,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Oxford Button Down Shirt",
      slug: "oxford-button-down-shirt",
      description: "Classic Oxford shirt with a timeless button-down design.",
      price: "49.99",
      category: "Shirts",
      rating: 4.4,
      stock: 31,
      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Relaxed Fit Shirt",
      slug: "relaxed-fit-shirt",
      description: "Modern relaxed-fit shirt for a comfortable everyday look.",
      price: "34.99",
      category: "Shirts",
      rating: 4.2,
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
    },

    {
      title: "Slim Fit Blue Jeans",
      slug: "slim-fit-blue-jeans",
      description: "Classic slim-fit denim jeans with a comfortable stretch.",
      price: "59.99",
      category: "Jeans",
      rating: 4.5,
      stock: 22,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Straight Fit Denim",
      slug: "straight-fit-denim",
      description: "Straight-leg denim with a classic everyday silhouette.",
      price: "54.99",
      category: "Jeans",
      rating: 4.3,
      stock: 27,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Relaxed Black Jeans",
      slug: "relaxed-black-jeans",
      description: "Relaxed black denim designed for a modern casual style.",
      price: "64.99",
      category: "Jeans",
      rating: 4.6,
      stock: 19,
      image:
        "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=800&q=80",
    },

    {
      title: "Minimal White Sneakers",
      slug: "minimal-white-sneakers",
      description: "Clean and versatile sneakers for everyday outfits.",
      price: "79.99",
      category: "Shoes",
      rating: 4.8,
      stock: 16,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Classic Running Shoes",
      slug: "classic-running-shoes",
      description: "Lightweight running shoes with comfortable cushioning.",
      price: "89.99",
      category: "Shoes",
      rating: 4.7,
      stock: 14,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Everyday Canvas Shoes",
      slug: "everyday-canvas-shoes",
      description: "Simple canvas shoes designed for casual everyday use.",
      price: "49.99",
      category: "Shoes",
      rating: 4.1,
      stock: 32,
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    },

    {
      title: "Leather Crossbody Bag",
      slug: "leather-crossbody-bag",
      description: "Compact crossbody bag with a simple premium design.",
      price: "69.99",
      category: "Accessories",
      rating: 4.5,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Classic Leather Watch",
      slug: "classic-leather-watch",
      description: "Minimal wristwatch with a classic leather strap.",
      price: "99.99",
      category: "Accessories",
      rating: 4.6,
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Minimal Everyday Backpack",
      slug: "minimal-everyday-backpack",
      description: "Functional backpack with a clean minimalist appearance.",
      price: "74.99",
      category: "Accessories",
      rating: 4.4,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        title: product.title,
        slug: product.slug,
        description: product.description,
        price: product.price,
        categoryId: categoryMap[product.category],
        rating: product.rating,
        stock: product.stock,
        images: {
          create: {
            url: product.image,
            altText: product.title,
          },
        },
      },
    });
  }

  const categoryCount = await prisma.category.count();
  const productCount = await prisma.product.count();
  const imageCount = await prisma.productImage.count();

  console.log(`✅ Categories created: ${categoryCount}`);
  console.log(`✅ Products created: ${productCount}`);
  console.log(`✅ Images created: ${imageCount}`);
  console.log("🌱 Database seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });