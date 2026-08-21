import { createHash, createHmac } from "node:crypto";

function required(value, name) {
  const text = String(value || "").trim();
  if (!text) throw new Error(`Missing required R2 configuration: ${name}`);
  return text;
}

function rfc3986(value) {
  return encodeURIComponent(String(value)).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}

function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

function hmac(key, value, encoding) {
  return createHmac("sha256", key).update(value).digest(encoding);
}

function amzTimestamp(date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function canonicalObjectPath(bucket, objectKey) {
  const bucketPart = rfc3986(bucket);
  const keyPart = String(objectKey || "")
    .split("/")
    .map((part) => rfc3986(part))
    .join("/");
  return `/${bucketPart}/${keyPart}`;
}

function cleanPathPart(value, fallback) {
  const text = String(value || "").trim().replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return text || fallback;
}

export function safeMediaFilename(value) {
  const text = String(value || "asset.bin")
    .split(/[\\/]/)
    .pop()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/[^A-Za-z0-9._() -]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return text.slice(0, 160) || "asset.bin";
}

export function makeR2ObjectKey({ userId, logicalArcId, contentHash, fileName }) {
  const user = cleanPathPart(userId, "user");
  const logical = cleanPathPart(logicalArcId, "arc");
  const hash = String(contentHash || "").trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(hash)) throw new Error("contentHash must be a SHA-256 hex digest");
  return `${user}/${logical}/${hash}-${safeMediaFilename(fileName)}`;
}

export function r2ConfigFromEnv(env = process.env) {
  const accountId = required(env.CHRONO_R2_ACCOUNT_ID, "CHRONO_R2_ACCOUNT_ID");
  return {
    accountId,
    accessKeyId: required(env.CHRONO_R2_ACCESS_KEY_ID, "CHRONO_R2_ACCESS_KEY_ID"),
    secretAccessKey: required(env.CHRONO_R2_SECRET_ACCESS_KEY, "CHRONO_R2_SECRET_ACCESS_KEY"),
    bucket: required(env.CHRONO_R2_BUCKET, "CHRONO_R2_BUCKET"),
    host: `${accountId}.r2.cloudflarestorage.com`,
  };
}

export function isR2Configured(env = process.env) {
  return ["CHRONO_R2_ACCOUNT_ID", "CHRONO_R2_ACCESS_KEY_ID", "CHRONO_R2_SECRET_ACCESS_KEY", "CHRONO_R2_BUCKET"]
    .every((key) => Boolean(String(env[key] || "").trim()));
}

export function presignR2Object({
  method = "GET",
  objectKey,
  expiresSeconds = 300,
  now = new Date(),
  config = r2ConfigFromEnv(),
}) {
  const verb = String(method || "GET").toUpperCase();
  if (!new Set(["GET", "PUT", "HEAD", "DELETE"]).has(verb)) throw new Error(`Unsupported R2 method: ${verb}`);
  if (!String(objectKey || "").trim()) throw new Error("objectKey is required");

  const expires = Math.max(30, Math.min(Number(expiresSeconds) || 300, 900));
  const amzDate = amzTimestamp(now);
  const dateStamp = amzDate.slice(0, 8);
  const region = "auto";
  const service = "s3";
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const credential = `${config.accessKeyId}/${credentialScope}`;
  const canonicalUri = canonicalObjectPath(config.bucket, objectKey);

  const query = new Map([
    ["X-Amz-Algorithm", "AWS4-HMAC-SHA256"],
    ["X-Amz-Credential", credential],
    ["X-Amz-Date", amzDate],
    ["X-Amz-Expires", String(expires)],
    ["X-Amz-SignedHeaders", "host"],
  ]);

  const canonicalQuery = [...query.entries()]
    .map(([key, value]) => [rfc3986(key), rfc3986(value)])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const canonicalHeaders = `host:${config.host}\n`;
  const canonicalRequest = [
    verb,
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    "host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const kDate = hmac(`AWS4${config.secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, "aws4_request");
  const signature = hmac(kSigning, stringToSign, "hex");

  return `https://${config.host}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;
}
