// api/search.js
const fetch = require("node-fetch");

export default (req, res) => {
  // GET リクエストでなければ 405 Method Not Allowed
  if (req.method !== "GET") {
    res.writeHead(405, { Allow: "GET" }).end();
    return;
  }

  // X-Requested-With ヘッダーがなければ 400 Bad Request
  if (!req.headers["x-requested-with"]) {
    res.writeHead(400).end();
    return;
  }

  const { searchParams } = new URL(req.url, "http://localhost:3000/");
  const publishedAt = searchParams.get("publishedAt");

  // q 検索パラメータがなければ 400 Bad Request
  if (!publishedAt) {
    res.writeHead(400).end();
    return;
  }

  // リクエストする URL を生成する
  const url = new URL(process.env.VUE_API_URL);
  url.searchParams.set("limit", 1);
  url.searchParams.set("fields", "id,title_en");
  url.searchParams.set("orders", "-publishedAt");
  url.searchParams.set("filters", `publishedAt[less_than]${publishedAt}`);

  // node-fetch で API にアクセス
  fetch(url.href, {
    headers: { "X-MICROCMS-API-KEY": process.env.VUE_API_KEY },
  })
    .then((resp) => {
      if (resp.ok) return resp.json();
      throw resp.status;
    })
    .then((data) => {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(JSON.stringify(data), "utf8");
    });
};
