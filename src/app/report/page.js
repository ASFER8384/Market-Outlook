"use client";
import { useGetOrdersQuery } from "@/reduxslice/shopify";
import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useGetMetricsQuery } from "@/reduxslice/googleApi";
import MozFetcher from "../moz/page";
export default function DashboardPage() {
  const { data } = useGetOrdersQuery();
  const { data: google } = useGetMetricsQuery();

  // moz States
  const [yourMoz, setYourMoz] = useState(null);
  const [competitorMoz, setCompetitorMoz] = useState(null);
  const [mozDataLoading, setMozDataLoading] = useState(false);

  //site inputs
  const [yourSite, setYourSite] = useState("");
  const [competitorSite, setCompetitorSite] = useState("");

  // console.log(yourMoz, "yourMoz");
  // console.log(competitorMoz, "competitorMoz");

  const calculateSummary = () => {
    if (!data?.orders?.length)
      return { totalOrders: 0, totalRevenue: 0, avgOrder: 0 };

    const totalOrders = data.orders.length;
    const totalRevenue = data.orders.reduce(
      (sum, order) => sum + parseFloat(order.total_price || 0),
      0
    );
    const avgOrder = totalRevenue / totalOrders;

    return {
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
      avgOrder: avgOrder.toFixed(2),
    };
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt");
    const { totalOrders, totalRevenue, avgOrder } = calculateSummary();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 40;

    const primary = [7, 160, 227];
    const secondary = [245, 91, 30];

    // ---- HEADER ----
    doc.setFontSize(22);
    doc.setTextColor(...primary);
    doc.text("E-Commerce Performance Report", margin, 60);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const generatedAt = `${new Date().toLocaleDateString()}`;
    const storeName =
      data?.orders?.[0]?.source_name || "CatalystIQ Shopify Store";

    const headerDetails = [
      { label: "Store Name:", value: storeName },
      { label: "Website:", value: "www.test.com" },
      { label: "Generated On:", value: generatedAt },
    ];

    headerDetails.forEach((item, i) => {
      const yPos = 90 + i * 16;
      const xPos = margin;

      doc.setFont("helvetica", "bold");
      doc.text(item.label, xPos, yPos);

      const labelWidth = doc.getTextWidth(item.label) + 4;
      doc.setFont("helvetica", "normal");
      doc.text(item.value, xPos + labelWidth, yPos);
    });

    // --- Section Divider Line ---
    doc.setDrawColor(...primary);
    doc.setLineWidth(1);
    doc.line(margin, 150, pageWidth - margin, 150);

    // ---- EXECUTIVE SUMMARY ----
    doc.setFontSize(14);
    doc.setTextColor(...secondary);
    doc.text("Executive Summary", margin, 190);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const summaryText =
      "CatalystIQ’s online performance indicates consistent growth in engagement and sales metrics. Public market data suggests strong brand awareness but potential improvement areas in organic search visibility and audience conversion paths.";
    const wrappedSummary = doc.splitTextToSize(
      summaryText,
      pageWidth - margin * 2
    );
    doc.text(wrappedSummary, margin, 210);

    // ---- AI-POWERED CONCLUSION ----
    let y = 210 + wrappedSummary.length * 12 + 30; // dynamic starting Y
    doc.setFontSize(14);
    doc.setTextColor(...secondary);
    doc.text("AI-Powered Conclusion", margin, y);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const aiPoints = [
      "1. Expand SEO content pillars around high-intent, long-tail keywords.",
      "2. Increase conversion efficiency by testing dynamic pricing campaigns.",
      "3. Explore influencer collaborations to improve trust and CTR.",
      "4. Use customer segmentation to tailor ad creatives for specific audiences.",
      "5. Automate abandoned cart flows to boost recovered revenue.",
    ];

    const maxWidth = pageWidth - margin * 2;
    y += 20;
    aiPoints.forEach((point) => {
      const lines = doc.splitTextToSize(point, maxWidth);
      if (y + lines.length * 14 > doc.internal.pageSize.height - 60) {
        doc.addPage();
        y = 60;
      }
      doc.text(lines, margin, y);
      y += lines.length * 14 + 8;
    });

    // ---- PUBLIC DATA ----
    const publicY = y + 30;
    doc.setFontSize(14);
    doc.setTextColor(...secondary);
    doc.text("Public Data", margin, publicY);

    const publicData = [
      ["SEO Data", "", "", ""],
      [
        "Domain Authority",
        yourMoz?.domain_authority ?? 0,
        competitorMoz?.domain_authority ?? 0,
        yourMoz?.domain_authority > competitorMoz?.domain_authority
          ? "Your site has stronger backlink authority"
          : yourMoz?.domain_authority < competitorMoz?.domain_authority
          ? "Competitor has stronger backlink authority"
          : "Both sites have similar domain authority",
      ],
      [
        "Backlink Count",
        yourMoz?.external_pages_to_page ?? 0,
        competitorMoz?.external_pages_to_page ?? 0,
        yourMoz?.external_pages_to_page > competitorMoz?.external_pages_to_page
          ? "Your site has more backlinks"
          : yourMoz?.external_pages_to_page <
            competitorMoz?.external_pages_to_page
          ? "Competitor has more backlinks"
          : "Both sites have a similar backlink count",
      ],
      ["Instagram Data", "", "", ""],
      ["Followers", "8K", "15K", "Competitor has more followers"],
      ["Engagement Rate", "5%", "6%", "Competitor engagement higher"],
      ["Posts/Month", "12", "18", "Competitor posts more frequently"],
      ["Twitter Data", "", "", ""],
      ["Followers", "12K", "18K", "Competitor has more followers"],
      ["Engagement Rate", "3.2%", "4.5%", "Competitor engagement higher"],
      ["Tweets/Month", "40", "55", "Competitor posts more frequently"],
    ];

    autoTable(doc, {
      startY: publicY + 20,
      head: [
        [
          "Metric",
          yourMoz?.title ? yourMoz.title.split(/[:|\-•]/)[0].trim() : "Yours",
          competitorMoz?.title
            ? competitorMoz.title.split(/[:|\-•]/)[0].trim()
            : "Competator",
          "Observation",
        ],
      ],
      body: publicData,
      theme: "grid",
      styles: {
        fontSize: 10,
        halign: "start",
        cellPadding: 5,
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: false,
        textColor: 0,
        fontStyle: "bold",
        halign: "start",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      didParseCell: function (data) {
        if (
          ["SEO Data", "Instagram Data", "Twitter Data"].includes(data.cell.raw)
        ) {
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.halign = "center";
          data.cell.colSpan = 4;
          return;
        }

        const row = data.row.raw;
        const colIndex = data.column.index;

        if (colIndex === 1 || colIndex === 2) {
          const yourValue = parseFloat(row[1]) || 0;
          const competitorValue = parseFloat(row[2]) || 0;

          if (!isNaN(yourValue) && !isNaN(competitorValue)) {
            if (colIndex === 1) {
              if (yourValue > competitorValue) {
                data.cell.styles.textColor = [0, 128, 0];
              } else if (yourValue < competitorValue) {
                data.cell.styles.textColor = [255, 0, 0];
              }
            } else if (colIndex === 2) {
              if (competitorValue > yourValue) {
                data.cell.styles.textColor = [0, 128, 0];
              } else if (competitorValue < yourValue) {
                data.cell.styles.textColor = [255, 0, 0];
              }
            }
          }
        }
      },
    });

    // ---- PRIVATE DATA ----
    const privateStartY = doc.lastAutoTable.finalY + 40;
    doc.setFontSize(14);
    doc.setTextColor(...secondary);
    doc.text("Private Data (User Only)", margin, privateStartY);

    const summaryData = [
      ["Metric", "Value"],
      ["Sessions", `${google?.sessions || "-"}`],
      ["Total Users", `${google?.totalUsers || "-"}`],
      ["New Users", `${google?.newUsers || "-"}`],
      ["Engaged Sessions", `${google?.engagedSessions || "-"}`],
      ["Engagement Rate", `${google?.engagementRate || "-"}`],
      ["Total Orders", `${totalOrders}`],
      ["Total Revenue", `$${totalRevenue}`],
      ["Average Order Value", `$${avgOrder}`],
      ["Screen/Page Views", `${google?.screenPageViews || "-"}`],
    ];

    autoTable(doc, {
      startY: privateStartY + 20,
      head: [summaryData[0]],
      body: summaryData.slice(1),
      theme: "grid",
      styles: {
        fontSize: 10,
        halign: "start",
        cellPadding: 5,
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: false,
        textColor: 0,
        fontStyle: "bold",
        halign: "start",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
    });

    // ---- FOOTER ----
    const pageHeight = doc.internal.pageSize.height;
    const footerText = "CatalystIQ | www.catalystiq.com";
    doc.setFontSize(10);
    doc.setTextColor(120);

    const textWidth = doc.getTextWidth(footerText);
    const textX = pageWidth - margin - textWidth;
    const textY = pageHeight - 20;

    doc.setDrawColor(...primary);
    doc.setTextColor(...secondary);

    doc.setLineWidth(0.5);
    doc.line(margin, textY - 20, pageWidth - margin, textY - 20);
    doc.text(footerText, textX, textY);

    doc.save("catalystiq_full_report.pdf");
  };

  return (
    <div className="flex flex-col h-screen font-sans text-black bg-white p-10 space-y-6">
      <div className="p-6 max-w-xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Enter your site URL"
          className="w-full border rounded-lg p-2"
          value={yourSite}
          onChange={(e) => setYourSite(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter competitor site URL"
          className="w-full border rounded-lg p-2"
          value={competitorSite}
          onChange={(e) => setCompetitorSite(e.target.value)}
        />
      </div>
      <MozFetcher
        setYourMoz={setYourMoz}
        setCompetitorMoz={setCompetitorMoz}
        yourSite={yourSite}
        competitorSite={competitorSite}
        setMozDataLoading={setMozDataLoading}
        mozDataLoading={mozDataLoading}
      />
      <button
        onClick={handleDownloadPDF}
        className="self-start px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
