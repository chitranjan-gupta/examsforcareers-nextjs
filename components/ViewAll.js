import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";

function ViewAll() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  var param;
  if (router.query.type) {
    param = router.query.type.replace(/_/g, " ");
  }
  if (typeof window !== "undefined") {
    document.title = param;
  }
  const [updates, setUpdates] = useState([]);
  const request = async (type) => {
    const res = await fetch("/api/exams/updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: type }),
    });
    if (res.status === 200) {
      setUpdates(await res.json());
    }
  };
  useEffect(() => {
    if (!loading) {
      request(router.query.type);
    }
  }, [router.query.type]);
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
      <PageNumber />
      <Footer />
    </>
  );
}

export default ViewAll;
