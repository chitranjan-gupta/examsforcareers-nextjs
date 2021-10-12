/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";
import CardSkeleton from "@/components/CardSkeleton";

function OthersExams() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let pageNum = 0;
  if (typeof window !== "undefined") {
    document.title = "Other Categories";
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
  const r1 = new RegExp("engineering exams", "ig");
  const r2 = new RegExp("medical exams", "ig");
  const r3 = new RegExp("defence exams", "ig");
  const r4 = new RegExp("board exams", "ig");
  const [exams, setExams] = useState([]);
  const getExams = async (pageNum) => {
    const res = await fetch("/api/exams/categoryall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "Category", pageNum: pageNum }),
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
      <div className="card-container">
        {exams.length >= 1 ? (
          <>
            {exams.map((exam) => {
              if (
                r1.test(exam.name.trim()) ||
                r2.test(exam.name.trim()) ||
                r3.test(exam.name.trim()) ||
                r4.test(exam.name.trim())
              ) {
                return <Fragment key={exam._id}></Fragment>;
              }
              return (
                <div className="card" key={exam._id}>
                  <h1>
                    <Link href={`/others_exams/${exam.name}`}>{exam.name}</Link>
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
      <Footer />
    </div>
  );
}

export default OthersExams;
