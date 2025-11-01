import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { store, accessToken, apiVersion } = await req.json();

    if (!store || !accessToken || !apiVersion) {
      return NextResponse.json(
        { error: "Missing Shopify credentials" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://${store}.myshopify.com/admin/api/${apiVersion}/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: 400 });
    }

    const data = await response.json();
    return NextResponse.json({
      message: "Shopify connected successfully",
      shopName: data.shop?.name,
    });
  } catch (error) {
    console.error("Error connecting Shopify:", error);
    return NextResponse.json(
      { error: "Failed to connect to Shopify" },
      { status: 500 }
    );
  }
}
