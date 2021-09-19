/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";

function ViewAll({ type }) {
  const [loading, setLoading] = useState(false);
  let pageNum = 0;
  const router = useRouter();
  if (type) {
    if (typeof window !== "undefined") {
      document.title = type.replace(/_/g, " ");
    }
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
  const [updates, setUpdates] = useState([]);
  const request = async (type) => {
    const res = await fetch("/api/exams/updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: type, pageNum: pageNum }),
    });
    if (res.status === 200) {
      setUpdates(await res.json());
    }
  };
  useEffect(() => {
    if (!loading) {
      request(type);
    }
  }, [type, pageNum]);
  useEffect(() => {
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  return (
    <>
      <div className="ListBox-Container">
        <div className="ListBox">
          {updates.map((update) => {
            return (
              <li key={update._id}>
                <Link href={`/details/${update.name.replace(/ /g, "_")}`}>
                  {update.name}
                </Link>
              </li>
            );
          })}
        </div>
      </div>
      <PageNumber page={router.query.no} />
      <Footer />
    </>
  );
}

export default ViewAll;
