/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { writeFile, readFile, access } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

// Ensure your environment variable is correctly set in .env.local
// Example: WEBHOOK_SECRET=test_webhook_secret123
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "test_webhook_secret123";

const verifySignature = (body: string, signature: string | null): boolean => {
  if (!signature) return false;
  if (!body) return false;
  body = JSON.stringify(JSON.parse(body));

  const expectedSignature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  // Debug logging for signature comparison
  console.log("Provided Signature:", signature);
  console.log("Expected Signature:", expectedSignature);

  return signature === expectedSignature;
};

const dbFilePath = path.join(process.cwd(), "db.json");

const ensureDbFileExists = async () => {
  try {
    await access(dbFilePath);
  } catch (error) {
    await writeFile(dbFilePath, "[]", "utf-8");
  }
};

const storeEventData = async (eventData: any) => {
  try {
    await ensureDbFileExists();
    let existingData = [];
    try {
      const fileContent = await readFile(dbFilePath, "utf-8");
      existingData = JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading from db.json:", error);
    }
    existingData.push(eventData);
    await writeFile(dbFilePath, JSON.stringify(existingData, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to db.json:", error);
  }
};

export async function POST(req: NextRequest) {
  try {
    // Get the raw request body as text
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");

    // Verify the signature and log details for debugging
    if (!verifySignature(rawBody, signature)) {
      console.log("Signature verification failed");
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse the body (ensure the JSON format exactly matches what you sign)
    const body = JSON.parse(rawBody);
    const { eventType, data } = body;

    // Validate required fields
    if (!eventType || !data) {
      return NextResponse.json(
        { success: false, message: "Missing eventType or data" },
        { status: 400 }
      );
    }

    // If event type is "user.created" and no userId is provided, generate one.
    if (eventType === "user.created" && !data.userId) {
      data.userId = uuidv4();
    }

    // Store the event in db.json
    await storeEventData({ eventType, data });

    return NextResponse.json({ success: true, message: "Received" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
