import React, { useState, useEffect } from "react";
import PageNumber from "../../components/PageNumber";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";

function Search() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  var searchWord;
  if (router.query.exam) {
    searchWord = router.query.exam.replace(/_/g, " ");
  }
  if (typeof window !== "undefined") {
    document.title = searchWord;
  }
  const [relevant, setRelevant] = useState([]);
  const getResult = async (e) => {
    const res = await fetch("/api/exams/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ abbreviation: searchWord }),
    });
    if (res.status === 200) {
      return await res.json();
    } else {
      return await res.json();
    }
  };
  useEffect(() => {
    if (!loading) {
      getResult(searchWord).then((rel) => {
        if (!rel.message) {
          setRelevant(rel);
        }
      });
    }
  }, [router.query.exam]);
  useEffect(() => {
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  return (
    <>
      <h3>You have search for {searchWord}</h3>
      <div className="card-container">
        {relevant.map((exam) => {
          return (
            <div className="card" key={exam.id}>
              <h1>
                <Link
                  href={`/${exam.categoryBase
                    .replace(/ /g, "_")
                    .toLowerCase()}/${exam.abbreviation.replace(/ /g, "_")}`}
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
    </>
  );
}

export default Search;
