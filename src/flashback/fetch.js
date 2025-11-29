// src/flashback/fetch.js
import fetch from "node-fetch";

const NEW_THREADS_URL = "https://www.flashback.org/nya-amnen";

export async function fetchNewThreadsHtml() {
  const res = await fetch(NEW_THREADS_URL, {
    headers: {
      "User-Agent": "knarka-watcher/1.0"
    }
  });

  if (!res.ok) {
    throw new Error(`Kunde inte hämta nya ämnen: ${res.status} ${res.statusText}`);
  }

  return res.text();
}

