// src/flashback/parse.js
import * as cheerio from "cheerio";

const BASE_URL = "https://www.flashback.org";
const TARGET_FORUM_NAME = "Drogakuten";

export function parseDrogakutenThreads(html) {
  const $ = cheerio.load(html);

  // hitta länken till forumet "Drogakuten"
  const forumLink = $("a.thread-forum-title")
    .filter((_, el) => $(el).text().trim() === TARGET_FORUM_NAME)
    .first();

  if (!forumLink.length) {
    return [];
  }

  // hitta närmaste parent som också innehåller thread-title-länkar
  const container = forumLink
    .parents()
    .filter((_, el) => $(el).find("a.thread-title").length > 0)
    .first();

  if (!container.length) {
    return [];
  }

  const threads = [];

  $(container)
    .find("a.thread-title")
    .each((_, el) => {
      const href = $(el).attr("href");
      const title = $(el).text().trim();

      if (!href || !title) return;

      // plocka ID, t.ex. /t3706460  → t3706460
      const match = href.match(/\/(t\d+)/);
      const id = match ? match[1] : null;
      if (!id) return;

      threads.push({
        id,                          // t3706460
        title,                       // Övervakat urinprov, OMÖJLIGT att kissa!!
        url: `${BASE_URL}${href}`    // https://www.flashback.org/t3706460
      });
    });

  return threads;
}

