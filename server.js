const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
// TRACKER_URL = URL del QR Tracker (ej: https://qr-mia.up.railway.app). Sin ella, la página funciona igual pero sin seguimiento.
const TRACKER_URL = (process.env.TRACKER_URL || "").replace(/\/+$/, "");
let html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
html = TRACKER_URL
  ? html.replace(/%%TRACKER_URL%%/g, TRACKER_URL)
  : html.replace(/<script src="%%TRACKER_URL%%[^>]*><\/script>\n?/, "");
const page = Buffer.from(html);
const vcard = fs.readFileSync(path.join(__dirname, "contacto.vcf"));

const SECURITY = { "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" };

http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (url === "/health") { res.writeHead(200, { "Content-Type": "text/plain" }); return res.end("ok"); }
  if (url === "/contacto.vcf") {
    res.writeHead(200, { ...SECURITY,
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="MiaJewelry.vcf"'
    });
    return res.end(vcard);
  }
  res.writeHead(200, { ...SECURITY, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" });
  res.end(page);
}).listen(PORT, "0.0.0.0", () => console.log("Mia Jewelry links en puerto " + PORT));
