/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";
import CardSkeleton from "@/components/CardSkeleton";

function Engineering_exams() {
  const [loading, setLoading] = useState(false);
  if (typeof window !== "undefined") {
    document.title = "Engineering Exams";
  }
  const [exams, setExams] = useState([]);
  const getExams = async () => {
    const res = await fetch("/api/exams/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryBase: "Engineering Exams" }),
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
      <div className="card-container">
        {exams.length >= 1 ? (
          <>
            {exams.map((exam) => {
              return (
                <div className="card" key={exam._id}>
                  <h1>
                    <Link
                      href={`/engineering_exams/${exam.abbreviation.replace(
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
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </div>
      <PageNumber />
      <Footer />
    </div>
  );
}

export default Engineering_exams;
