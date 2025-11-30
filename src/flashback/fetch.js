// src/flashback/fetch.js
import fetch from "node-fetch";
import iconv from "iconv-lite";

const NEW_THREADS_URL = "https://www.flashback.org/nya-amnen";

export async function fetchNewThreadsHtml() {
  const res = await fetch(NEW_THREADS_URL, {
    headers: {
      "User-Agent": "knarka-watcher/1.0"
    }
  });

  if (!res.ok) {
    throw new Error(`Kunde inte hämta: ${res.status} ${res.statusText}`);
  }

  // Läs rå bytes
  const buffer = await res.arrayBuffer();

  // Konvertera ISO-8859-1 → UTF-8
  const html = iconv.decode(Buffer.from(buffer), "latin1");

  return html;
}

