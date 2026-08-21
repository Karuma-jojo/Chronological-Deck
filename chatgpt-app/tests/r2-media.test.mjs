import assert from "node:assert/strict";
import test from "node:test";

import { makeR2ObjectKey, presignR2Object, safeMediaFilename } from "../lib/r2-media.js";

test("safeMediaFilename strips paths and unsafe characters", () => {
  assert.equal(safeMediaFilename("../My sketch (1).png"), "My-sketch-(1).png");
});

test("makeR2ObjectKey is content addressed", () => {
  const hash = "a".repeat(64);
  assert.equal(
    makeR2ObjectKey({ userId: "user-1", logicalArcId: "T22-M01-A03", contentHash: hash, fileName: "Sketch.png" }),
    `user-1/T22-M01-A03/${hash}-Sketch.png`,
  );
});

test("presignR2Object creates a bounded SigV4 URL", () => {
  const url = new URL(presignR2Object({
    method: "PUT",
    objectKey: "user/T22-M01-A03/abc.png",
    expiresSeconds: 300,
    now: new Date("2026-08-21T12:34:56.000Z"),
    config: {
      accountId: "example-account",
      accessKeyId: "EXAMPLEACCESS",
      secretAccessKey: "example-secret",
      bucket: "chrono-deck-arc-media",
      host: "example-account.r2.cloudflarestorage.com",
    },
  }));

  assert.equal(url.protocol, "https:");
  assert.equal(url.hostname, "example-account.r2.cloudflarestorage.com");
  assert.equal(url.searchParams.get("X-Amz-Algorithm"), "AWS4-HMAC-SHA256");
  assert.equal(url.searchParams.get("X-Amz-Expires"), "300");
  assert.match(url.searchParams.get("X-Amz-Signature") || "", /^[a-f0-9]{64}$/);
});
