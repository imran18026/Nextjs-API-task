import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { authenticateToken } from "@/middleware/auth";

// GET: Fetch user by ID (protected)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const user = authenticateToken(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const foundUser = await User.findById(id).select("-password");
    if (!foundUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(foundUser);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
