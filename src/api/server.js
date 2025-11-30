// src/api/server.js
import express from "express";
import { notifyNewThread } from "../discord/notify.js";
import config from "../config.js";

export function startTestApi(port = 3000) {
  if (!config.testWebhook) {
    console.error("TEST_WEBHOOK_URL saknas i .env – kan inte starta test-API.");
    process.exit(1);
  }

  const app = express();
  app.use(express.json());

  app.post("/test-thread", async (req, res) => {
    const { title, url } = req.body || {};

    if (!title || !url) {
      return res.status(400).json({
        error: "title och url krävs",
        example: {
          title: "Fejk-tråd för test",
          url: "https://www.flashback.org/t1234567"
        }
      });
    }

    try {
      await notifyNewThread(
        { id: "test", title, url },
        { useTest: true }
      );
      return res.status(204).end();
    } catch (err) {
      console.error("Fel vid test-webhook:", err.message);
      return res.status(500).json({ error: "kunde inte skicka till webhook" });
    }
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.listen(port, () => {
    console.log(`Test-API lyssnar på http://localhost:${port}`);
  });
}

