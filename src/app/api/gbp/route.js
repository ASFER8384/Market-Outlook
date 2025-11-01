import { google } from "googleapis";
import path from "path";

export async function GET() {
  try {
    const keyFile = path.join(
      process.cwd(),
      "service-accounts/gbp-service.json"
    );

    const auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/business.manage",
      ],
    });

    const client = await auth.getClient();
    const business = google.mybusinessbusinessinformation({
      version: "v1",
      auth: client,
    });

    const accounts = await business.accounts.list();
    const accountId = accounts.data.accounts?.[0]?.name.split("/")[1];

    const locations = await business.accounts.locations.list({
      parent: `accounts/${accountId}`,
    });
    const locationId = locations.data.locations?.[0]?.name.split("/")[3];

    const location = await business.accounts.locations.get({
      name: `accounts/${accountId}/locations/${locationId}`,
    });

    const starRating = location.data.metadata?.starRating || 0;
    const reviewsCount = location.data.metadata?.reviewsCount || 0;

    return Response.json({ starRating, reviewsCount });
  } catch (error) {
    console.error("GBP Error:", error);
    return Response.json(
      { error: "Failed to fetch GBP data" },
      { status: 500 }
    );
  }
}
