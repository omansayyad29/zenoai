import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.use(requireAuth());
app.use("/api/ai", aiRouter);
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
