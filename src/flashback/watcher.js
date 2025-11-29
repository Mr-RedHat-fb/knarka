// src/flashback/watcher.js
import { fetchNewThreadsHtml } from "./fetch.js";
import { parseDrogakutenThreads } from "./parse.js";
import { loadState, saveState } from "../state.js";
import { notifyNewThread } from "../discord/notify.js";

function idToNumber(id) {
  return Number(id.replace(/^t/, ""));
}

export async function runWatcher() {
  const html = await fetchNewThreadsHtml();
  const threads = parseDrogakutenThreads(html);

  if (!threads.length) return;

  const state = loadState();
  const lastSeenId = state.lastThreadId || null;

  const newThreads = threads.filter(t => {
    if (!lastSeenId) return true;
    return idToNumber(t.id) > idToNumber(lastSeenId);
  });

  if (!newThreads.length) return;

  // skicka äldst först
  for (const t of [...newThreads].reverse()) {
    await notifyNewThread(t);
  }

  // spara nyaste ID
  state.lastThreadId = newThreads[0].id;
  saveState(state);
}

