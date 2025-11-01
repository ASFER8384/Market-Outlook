import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import path from "path";

const keyFile = path.join(process.cwd(), "service-accounts/ga4-service.json");
const PROPERTY_ID = "510567702";

export async function GET() {
  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: keyFile,
    });

    const metrics = [
      { name: "totalUsers" },
      { name: "screenPageViews" },
      { name: "newUsers" },
      { name: "sessions" },
      { name: "engagedSessions" },
      { name: "engagementRate" },
    ];

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      metrics,
      dateRanges: [{ startDate: "2025-01-01", endDate: "2025-10-28" }],
    });

    const data = {};
    response.rows.forEach((row) => {
      row.metricValues.forEach((metric, index) => {
        data[metrics[index].name] = metric.value || metric.stringValue;
      });
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch GA4 data", details: err.message },
      { status: 500 }
    );
  }
}
