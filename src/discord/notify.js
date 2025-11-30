// src/discord/notify.js
import fetch from "node-fetch";
import config from "../config.js";

export async function notifyNewThread(thread, options = {}) {
  const { useTest = false } = options;

  const webhookUrl =
    useTest && config.testWebhook
      ? config.testWebhook
      : config.discordWebhook;

  if (!webhookUrl) {
    throw new Error("Ingen webhook-URL satt (DISCORD_WEBHOOK_URL / TEST_WEBHOOK_URL).");
  }

  const content = [
    `**Trådtitel:** ${thread.title}`,
    `**Länk:** ${thread.url}`
  ].join("\n");

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  if (!res.ok) {
    throw new Error(`Discord-webhook misslyckades: ${res.status} ${res.statusText}`);
  }
}

