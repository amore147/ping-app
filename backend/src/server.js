import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { connectDb } from "./lib/db.js";
import User from "./models/user.model.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const public_dir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

if (fs.existsSync(public_dir)) {
  app.use(express.static(public_dir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(public_dir, "index.html"), (err) => next(err));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log("SERVER IS RUNNING");
});
