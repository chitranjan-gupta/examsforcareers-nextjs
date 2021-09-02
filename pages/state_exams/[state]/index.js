import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";

function State() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  var param;
  if (router.query.state) {
    param = router.query.state.replace(/_/g, " ");
  }
  if (typeof window !== "undefined") {
    document.title = param;
  }
  const [exams, setExams] = useState([]);
  const getExams = async () => {
    const res = await fetch("/api/exams/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryMain: param,
      }),
    });
    setExams(await res.json());
  };
  useEffect(() => {
    if (!loading) {
      getExams();
    }
  }, [router.query.state]);
  useEffect(() => {
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
                  href={`/state_exams/${
                    router.query.state
                  }/${exam.abbreviation.replace(/ /g, "_")}`}
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

export default State;
