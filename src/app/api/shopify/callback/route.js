import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const shop = searchParams.get("shop");

  if (!code || !shop) {
    return NextResponse.json(
      { error: "Missing code or shop" },
      { status: 400 }
    );
  }

  try {
    // Exchange code for token
    const tokenResponse = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch shop info
    const shopResponse = await axios.get(
      `https://${shop}/admin/api/2023-07/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    const shopData = shopResponse.data.shop;

    // TODO: Save in DB (link to logged-in user)
    // Example:
    // await db.users.update({ userId }, { shopify: { shop, accessToken, shopData } });

    return new Response(
      `
      <script>
        window.opener.postMessage("shopify_connected", "*");
        window.close();
      </script>
    `,
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (err) {
    console.error("Shopify callback error:", err);
    return NextResponse.json(
      { error: "Failed to connect Shopify" },
      { status: 500 }
    );
  }
}
