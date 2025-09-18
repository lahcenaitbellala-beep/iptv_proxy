import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("URL manquante");

  try {
    const response = await fetch(url);
    res.set("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur proxy");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy en ligne sur port ${PORT}`));
