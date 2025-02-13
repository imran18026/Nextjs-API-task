import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authenticateToken } from "@/middleware/auth";

// GET: Fetch all users (protected)
export async function GET(req: NextRequest) {
  await connectDB();
  const user = authenticateToken(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(req: NextRequest) {
  await connectDB();
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return NextResponse.json(
    { message: "User created successfully", user },
    { status: 201 }
  );
}
