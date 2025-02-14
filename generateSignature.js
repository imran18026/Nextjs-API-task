import crypto from "crypto";
const secret = "test_webhook_secret123";
const payload = JSON.stringify({
  eventType: "user.created",
  data: {
    email: "mdimran@example.com",
  },
});

const signature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");
console.log("Computed Signature:", signature);
