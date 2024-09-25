"use client";
import { createServer, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      transaction: Model,
    },

    seeds(server) {
      server.create("transaction", {
        id: "txn_1",
        date: "2024-09-15",
        amount: 150.75,
        category: "Groceries",
        description: "Walmart",
      });
      server.create("transaction", {
        id: "txn_2",
        date: "2024-09-12",
        amount: 49.99,
        category: "Entertainment",
        description: "Netflix",
      });
      server.create("transaction", {
        id: "txn_3",
        date: "2024-09-10",
        amount: 30.5,
        category: "Dining",
        description: "Starbucks",
      });
    },

    routes() {
      this.namespace = "api";
      this.get("/transactions", () => {
        return this.schema.all("transaction");
      });
    },
  });

  return server;
}
