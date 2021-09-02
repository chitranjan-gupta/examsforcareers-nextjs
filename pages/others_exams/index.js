import React, { useState, useEffect } from "react";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";

function Others_Exams() {
  const [loading, setLoading] = useState(false);
  if (typeof window !== "undefined") {
    document.title = "Other Categories";
  }
  const [exams, setExams] = useState([]);
  const getExams = async () => {
    const res = await fetch("/api/exams/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryBase: "Others Exam" }),
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
              <h1>{exam.abbreviation}</h1>
            </div>
          );
        })}
      </div>
      <PageNumber />
      <Footer />
    </div>
  );
}

export default Others_Exams;
