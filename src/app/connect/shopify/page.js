"use client";
import React, { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleConnect = () => {
    const popup = window.open(
      "/api/shopify/auth",
      "ShopifyAuth",
      "width=600,height=700"
    );

    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        enqueueSnackbar("Checking connection...", { variant: "info" });
        setTimeout(() => router.push("/dashboard"), 1000);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "shopify_connected") {
        enqueueSnackbar("Shopify connected successfully!", {
          variant: "success",
        });
        router.push("/dashboard");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Connect Your Shopify Store</h2>

        <button
          onClick={handleConnect}
          className="bg-[#96bf48] text-white font-semibold py-2 px-5 rounded-md hover:opacity-90 transition"
        >
          Connect with Shopify
        </button>
      </div>
    </div>
  );
}
