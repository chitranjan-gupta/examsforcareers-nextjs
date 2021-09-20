/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";
import CardSkeleton from "@/components/CardSkeleton";

function StateExams() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let pageNum = 0;
  let param;
  if (router.query.state) {
    param = router.query.state.replace(/_/g, " ");
  }
  if (typeof window !== "undefined") {
    document.title = param;
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
  const getExams = async (param, pageNum) => {
    const res = await fetch("/api/exams/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryMain: param,
        pageNum: pageNum,
      }),
    });
    setExams(await res.json());
  };
  useEffect(() => {
    if (!loading) {
      getExams(param, pageNum);
    }
  }, [router.query.state, pageNum]);
  useEffect(() => {
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
          </>
        ) : (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </div>
      <PageNumber page={router.query.no} />
      <Footer />
    </div>
  );
}

export default StateExams;
