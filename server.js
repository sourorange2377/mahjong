const http = require("http");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const maxBodyBytes = 1024 * 64;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

function env(name, fallback = "") {
  return process.env[name] || fallback;
}

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "http://127.0.0.1:8080",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanText(value, maxLength = 1000) {
  return String(value || "").trim().slice(0, maxLength);
}

function validateInquiry(data) {
  const inquiry = {
    name: cleanText(data.name, 120),
    email: cleanText(data.email, 180),
    message: cleanText(data.message, 3000),
    productReference: cleanText(data.productReference, 160),
    size: data.size || {},
    layer: data.layer || {},
    style: data.style || {},
    estimatedTotal: Number(data.estimatedTotal || 0),
  };

  if (!inquiry.name) return { error: "Please enter your name." };
  if (!isValidEmail(inquiry.email)) return { error: "Please enter a valid email address." };
  if (!inquiry.message) return { error: "Please enter your design idea or notes." };
  if (!inquiry.size.name || !inquiry.layer.name || !inquiry.style.name || !inquiry.estimatedTotal) {
    return { error: "Please choose a size, layer, and style before submitting." };
  }

  return { inquiry };
}

function requireMailConfig() {
  const required = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD", "MAIL_FROM", "MAIL_TO"];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing mail configuration: ${missing.join(", ")}`);
  }
}

function createTransporter() {
  requireMailConfig();
  return nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port: Number(env("SMTP_PORT", "465")),
    secure: env("SMTP_SECURE", "true") === "true",
    auth: {
      user: env("SMTP_USER"),
      pass: env("SMTP_PASSWORD"),
    },
    connectionTimeout: Number(env("SMTP_TIMEOUT_SECONDS", "30")) * 1000,
  });
}

function formatInquiryEmail(inquiry) {
  const product = inquiry.productReference || "No specific design selected";
  return [
    "New sourorange custom resin mahjong inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Product reference: ${product}`,
    `Selected size: ${inquiry.size.name} (${inquiry.size.meta}) - $${inquiry.size.price}`,
    `Selected layer: ${inquiry.layer.name} - +$${inquiry.layer.price}`,
    `Selected style: ${inquiry.style.name} - +$${inquiry.style.price}`,
    `Estimated total before shipping: $${inquiry.estimatedTotal}`,
    "",
    "Customer notes:",
    inquiry.message,
    "",
    "Production notice shown on site: production starts after order confirmation and usually takes 20-35 days before shipping.",
    "Handmade notice shown on site: tiny bubbles, slight sticker placement differences, or small accessory position variations may occur.",
  ].join("\n");
}

async function handleInquiry(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (Buffer.byteLength(body) > maxBodyBytes) {
      req.destroy();
    }
  });

  req.on("end", async () => {
    try {
      const parsed = JSON.parse(body || "{}");
      const validation = validateInquiry(parsed);
      if (validation.error) {
        json(res, 400, { error: validation.error });
        return;
      }

      const transporter = createTransporter();
      const inquiry = validation.inquiry;
      const subjectPrefix = env("MAIL_SUBJECT_PREFIX", "[麻将询单]");
      await transporter.sendMail({
        from: env("MAIL_FROM"),
        to: env("MAIL_TO"),
        replyTo: inquiry.email,
        subject: `${subjectPrefix} ${inquiry.name} - ${inquiry.size.name} ${inquiry.style.name}`,
        text: formatInquiryEmail(inquiry),
      });

      json(res, 200, { ok: true });
    } catch (error) {
      console.error(error);
      json(res, 500, { error: "Unable to send inquiry right now. Please try again later." });
    }
  });
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS" && req.url === "/api/inquiry") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "http://127.0.0.1:8080",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/inquiry") {
    handleInquiry(req, res);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Method not allowed");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`sourorange site running at http://127.0.0.1:${port}`);
});
