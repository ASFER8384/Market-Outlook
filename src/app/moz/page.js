"use client";
import { useState } from "react";

export default function MozFetcher({
  setYourMoz,
  setCompetitorMoz,
  yourSite,
  competitorSite,
  setMozDataLoading,
  mozDataLoading,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMozData = async (url) => {
    try {
      const res = await fetch("/api/moz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to fetch Moz data");
      const data = await res.json();
      return data.results?.[0];
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const handleFetch = async () => {
    if (!yourSite || !competitorSite) {
      setError("Please enter both URLs");
      return;
    }
    setError("");
    setMozDataLoading(true);

    const [yourData, competitorData] = await Promise.all([
      fetchMozData(yourSite),
      fetchMozData(competitorSite),
    ]);

    setYourMoz(yourData);
    setCompetitorMoz(competitorData);
    setMozDataLoading(false);
  };

  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF("p", "pt");
  //   const pageWidth = doc.internal.pageSize.width;
  //   const margin = 40;

  //   doc.setFontSize(18);
  //   doc.text("SEO Comparison Report", margin, 50);

  //   doc.setFontSize(12);
  //   doc.text(`Generated: ${new Date().toLocaleString()}`, margin, 70);

  //   const seoData = [
  //     ["Metric", yourSite, competitorSite],
  //     [
  //       "Domain Authority",
  //       yourMoz?.domain_authority || "-",
  //       competitorMoz?.domain_authority || "-",
  //     ],
  //     [
  //       "Page Authority",
  //       yourMoz?.page_authority || "-",
  //       competitorMoz?.page_authority || "-",
  //     ],
  //     [
  //       "Root Domains",
  //       yourMoz?.root_domains_to_root_domain || "-",
  //       competitorMoz?.root_domains_to_root_domain || "-",
  //     ],
  //     [
  //       "Total External Pages",
  //       yourMoz?.external_pages_to_root_domain || "-",
  //       competitorMoz?.external_pages_to_root_domain || "-",
  //     ],
  //     [
  //       "Spam Score",
  //       `${yourMoz?.spam_score || "-"}%`,
  //       `${competitorMoz?.spam_score || "-"}%`,
  //     ],
  //   ];

  //   autoTable(doc, {
  //     startY: 100,
  //     head: [["SEO Metric", "Your Site", "Competitor Site"]],
  //     body: seoData.slice(1), // skip the first header row
  //     styles: { fontSize: 11, cellPadding: 6 },
  //     headStyles: { fillColor: [22, 160, 133], textColor: 255 },
  //   });

  //   doc.save("SEO_Report.pdf");
  // };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <button
        onClick={handleFetch}
        disabled={mozDataLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
      >
        {mozDataLoading ? "Fetching Moz Data..." : "Fetch Data"}
      </button>
    </div>
  );
}
