import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/orders", async (_req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.post("/api/orders", async (req, res) => {
    const parseResult = insertOrderSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors });
    }

    const order = await storage.createOrder(parseResult.data);
    res.status(201).json(order);
  });

  return httpServer;
}
