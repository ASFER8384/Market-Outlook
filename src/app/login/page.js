"use client";

import { useLoginMutation } from "@/reduxslice/authApi";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginUser, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();

      if (response.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(response.user));
        enqueueSnackbar("Login success!", { variant: "success" });
        // setTimeout(() => router.push("/connect/shopify"), 1000);
        // setTimeout(() => router.push("/connect/shopify"), 1000);
        router.push("/dashboard")
      } else {
        enqueueSnackbar("Login failed", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar("Invalid credentials", { variant: "error" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Enter username"
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Enter password"
        />

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-[#dcab63] text-white py-2 rounded-md hover:opacity-90 transition"
        >
          {isLoading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}
