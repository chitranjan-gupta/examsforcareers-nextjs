/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";
import CardSkeleton from "@/components/CardSkeleton";

function Search() {
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);
  const router = useRouter();
  let searchWord;
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
        getResult(searchWord).then((rel) => {
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
  }, [router.query.exam]);
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
          <PageNumber />
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

export default Search;
