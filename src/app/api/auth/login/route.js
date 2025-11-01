import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { username, password } = await request.json();
  await connectDB();

  const user = await User.findOne({ username });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
    });
  }

  const userInfo = {
    id: user._id,
    username: user.username,
    createdAt: user.createdAt,
  };

  return new Response(
    JSON.stringify({
      message: "Login successful",
      user: userInfo,
    }),
    { status: 200 }
  );
}
