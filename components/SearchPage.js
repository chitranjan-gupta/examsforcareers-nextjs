/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";
import CardSkeleton from "@/components/CardSkeleton";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);
  const router = useRouter();
  let searchWord,
    pageNum = 0;
  if (router.query.exam) {
    searchWord = router.query.exam.replace(/_/g, " ");
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
  if (typeof window !== "undefined") {
    document.title = searchWord;
  }
  const [relevant, setRelevant] = useState([]);
  const getResult = async (searchWord, pageNum) => {
    const res = await fetch("/api/exams/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ abbreviation: searchWord, pageNum: pageNum }),
    });
    if (res.status === 200) {
      return await res.json();
    } else if (res.status === 404) {
      return { message: 404 };
    } else {
      return await res.json();
    }
  };
  const NotFound = () => {
    return (
      <>
        <div className="erro-home NotFound">
          <h1>WE ARE SORRY, NOT FOUND!</h1>
          <span>
            THE EXAM YOU ARE LOOKING FOR IS NOT THEIR IN THE DATABASE.
          </span>
          <div>
            <button onClick={goBack}>BACK TO PREVIOUS PAGE</button>
          </div>
        </div>
      </>
    );
  };
  useEffect(() => {
    if (!loading) {
      if (searchWord) {
        getResult(searchWord, pageNum).then((rel) => {
          if (!rel.message) {
            setRelevant(rel);
          } else if (rel.message === 404) {
            if (typeof window !== "undefined") {
              setFound(false);
            }
            return;
          }
        });
      }
    }
  }, [router.query.exam, pageNum]);
  useEffect(() => {
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  const goBack = (e) => {
    router.back();
  };
  return (
    <>
      <h3>You have search for {searchWord}</h3>
      {found ? (
        <>
          <div className="card-container">
            {relevant.length >= 1 ? (
              <>
                {relevant.map((exam) => {
                  return (
                    <div className="card" key={exam.id}>
                      {exam.abbreviation ? (
                        <h1>
                          <Link
                            href={`/${exam.categoryBase
                              .replace(/ /g, "_")
                              .toLowerCase()}/${exam.abbreviation.replace(
                              / /g,
                              "_"
                            )}`}
                          >
                            {exam.abbreviation}
                          </Link>
                        </h1>
                      ) : (
                        <h1>
                          <Link
                            href={`/details/${exam.name.replace(/ /g, "_")}`}
                          >
                            {exam.name}
                          </Link>
                        </h1>
                      )}
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
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}
      <Footer />
    </>
  );
}

export default SearchPage;
