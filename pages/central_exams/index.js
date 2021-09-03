/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageNumber from "@/components/PageNumber";
import CardSkeleton from "@/components/CardSkeleton";

function Central_Exams() {
  const [loading, setLoading] = useState(false);
  if (typeof window !== "undefined") {
    document.title = "Central Exams";
  }
  const [exams, setExams] = useState([]);
  const getExams = async () => {
    const res = await fetch("/api/exams/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryMain: "Central" }),
    });
    setExams(await res.json());
  };
  useEffect(() => {
    if (!loading) {
      getExams();
    }
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  return (
    <div>
      <div id="mainContent">
        <div className="card-container">
          {exams.length >= 1 ? (
            <>
              {exams.map((exam) => {
                return (
                  <div className="card" key={exam._id}>
                    <h1>
                      <Link
                        href={`/central_exams/${exam.abbreviation.replace(
                          / /g,
                          "_"
                        )}`}
                      >
                        {exam.abbreviation}
                      </Link>
                    </h1>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
        </div>
        <PageNumber />
      </div>
      <Footer />
    </div>
  );
}

export default Central_Exams;
