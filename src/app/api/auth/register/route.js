import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { username, password } = await request.json();
  await connectDB();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "Username already taken" }), {
      status: 409,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  return new Response(
    JSON.stringify({
      message: "User registered successfully",
      userId: newUser._id,
    }),
    { status: 201 }
  );
}
