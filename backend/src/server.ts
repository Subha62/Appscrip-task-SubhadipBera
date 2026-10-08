import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigin =
  process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.use(express.json());
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Appscrip Product API is running",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});


app.get("/db-test", async (_req, res) => {
  try {
    const categories = await prisma.category.findMany();

    res.json({
      connected: true,
      categories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      connected: false,
      message: "Database connection failed",
    });
  }
});






app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});