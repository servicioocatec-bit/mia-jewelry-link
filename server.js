const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const page = fs.readFileSync(path.join(__dirname, "index.html"));
const vcard = fs.readFileSync(path.join(__dirname, "contacto.vcf"));

http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (url === "/contacto.vcf") {
    res.writeHead(200, {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="MiaJewelry.vcf"'
    });
    return res.end(vcard);
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" });
  res.end(page);
}).listen(PORT, "0.0.0.0", () => console.log("Mia Jewelry links en puerto " + PORT));
