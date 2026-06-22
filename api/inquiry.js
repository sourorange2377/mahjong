const nodemailer = require("nodemailer");

const maxBodyBytes = 1024 * 64;

function env(name, fallback = "") {
  return process.env[name] || fallback;
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

function getRequestBody(req) {
  if (req.body && typeof req.body === "object") {
    return Promise.resolve(req.body);
  }

  if (typeof req.body === "string") {
    return Promise.resolve(JSON.parse(req.body || "{}"));
  }

  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > maxBodyBytes) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const parsed = await getRequestBody(req);
    const validation = validateInquiry(parsed);
    if (validation.error) {
      res.status(400).json({ error: validation.error });
      return;
    }

    const transporter = createTransporter();
    const inquiry = validation.inquiry;
    const subjectPrefix = env("MAIL_SUBJECT_PREFIX", "[Mahjong Inquiry]");
    await transporter.sendMail({
      from: env("MAIL_FROM"),
      to: env("MAIL_TO"),
      replyTo: inquiry.email,
      subject: `${subjectPrefix} ${inquiry.name} - ${inquiry.size.name} ${inquiry.style.name}`,
      text: formatInquiryEmail(inquiry),
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to send inquiry right now. Please try again later." });
  }
};
