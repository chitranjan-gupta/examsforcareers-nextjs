/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";

function Medical_Exams() {
  const [loading, setLoading] = useState(false);
  if (typeof window !== "undefined") {
    document.title = "Medical Exams";
  }
  const [exams, setExams] = useState([]);
  const getExams = async () => {
    const res = await fetch("/api/exams/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryBase: "Medical Exams" }),
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
        {exams.map((exam) => {
          return (
            <div className="card" key={exam._id}>
              <h1>
                <Link
                  href={`/medical_exams/${exam.abbreviation.replace(
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
      </div>
      <PageNumber />
      <Footer />
    </div>
  );
}

export default Medical_Exams;
