/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import PageNumber from "@/components/PageNumber";
import CardSkeleton from "@/components/CardSkeleton";

function CentralExams() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let pageNum = 0;
  if (typeof window !== "undefined") {
    document.title = "Central Exams";
  }
  if (router.query.no) {
    const checkNum = new RegExp("^[0-9]", "g");
    if (!checkNum.test(router.query.no)) {
      pageNum = 0;
    } else if (router.query.no === "0") {
      pageNum = 0;
    } else {
      pageNum = parseInt(router.query.no) - 1;
    }
  }
  const [exams, setExams] = useState([]);
  const getExams = async (pageNum) => {
    const res = await fetch("/api/exams/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryMain: "Central", pageNum: pageNum }),
    });
    setExams(await res.json());
  };
  useEffect(() => {
    if (!loading) {
      getExams(pageNum);
    }
  }, [pageNum]);
  useEffect(() => {
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
        <PageNumber page={router.query.no} />
      </div>
      <Footer />
    </div>
  );
}

export default CentralExams;
