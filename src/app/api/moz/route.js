// app/api/moz/route.js
import axios from "axios";

const ACCESS_ID = process.env.MOZ_ACCESS_ID;
const SECRET_KEY = process.env.MOZ_SECRET_KEY;

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
      });
    }

    // Moz v2 URL Metrics expects POST with "targets" array
    const response = await axios.post(
      "https://lsapi.seomoz.com/v2/url_metrics",
      { targets: [url] },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${ACCESS_ID}:${SECRET_KEY}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.response?.data || error.message }),
      { status: 500 }
    );
  }
}
