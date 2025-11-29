// src/state.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const statePath = path.join(__dirname, "../data/state.json");

export function loadState() {
  try {
    if (!fs.existsSync(statePath)) {
      return { lastThreadId: null };
    }

    const raw = fs.readFileSync(statePath, "utf8").trim();
    if (!raw) {
      return { lastThreadId: null };
    }

    return JSON.parse(raw);
  } catch (err) {
    console.error("Kunde inte läsa state.json, använder default:", err.message);
    return { lastThreadId: null };
  }
}

export function saveState(state) {
  const dir = path.dirname(statePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(statePath, JSON.stringify(state, null, 2), "utf8");
}

