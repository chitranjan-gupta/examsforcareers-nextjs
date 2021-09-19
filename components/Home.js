/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Footer from "@/components/Footer";
import search from "@/images/search.svg";
import exam from "@/images/exam.svg";
import USkeleton from "@/components/USkeleton";

function Home() {
  const [loading, setLoading] = useState(false);
  if (typeof window !== "undefined") {
    document.title = "examsforcareers.com";
  }
  const history = useRouter();
  const [searchWord, getWord] = useState("");
  const [updates, setUpdates] = useState([]);
  const [admits, setAdmit] = useState([]);
  const [results, setResult] = useState([]);
  const handleSearch = (e) => {
    getWord(e.target.value);
  };
  const request = async (type) => {
    const res = await fetch("/api/exams/updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: type, pageNum: 0 }),
    });
    return await res.json();
  };
  const getUpdates = async () => {
    const value = await request("New_Updates");
    setUpdates(await value);
  };
  const getAdmit = async () => {
    const value = await request("Admit_Card");
    setAdmit(await value);
  };
  const getResults = async () => {
    const value = await request("Result");
    setResult(await value);
  };
  useEffect(() => {
    if (!loading) {
      getUpdates();
      getAdmit();
      getResults();
    }
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  const getResult = async (e) => {
    try {
      if (searchWord) {
        history.push(`/search/${searchWord.replace(/ /g, "_")}`);
      } else {
        if (typeof window !== "undefined") {
          window.alert("Type The Word");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const goTo = (type) => {
    history.push(type);
  };
  return (
    <div>
      <div className="extra">
        <div className="extra-info">
          <div>
            <Image alt="" src={exam} />
          </div>
        </div>
        <div className="extra-for">
          <h1>Welcome</h1>
          <div className="searchbar">
            <input
              type="text"
              value={searchWord}
              onChange={handleSearch}
              onSubmit={getResult}
              placeholder="Exams Search"
            />
            <button className="sicon" onClick={getResult}>
              <Image alt="Search" src={search} />
            </button>
          </div>
        </div>
      </div>
      <div className="Update-container">
        <div className="Update-card">
          <p>New Updates</p>
          <div>
            {updates.length >= 1 ? (
              <>
                {updates.map((update) => {
                  return (
                    <li key={update._id}>
                      <Link
                        href={`/details/${update.name.replace(/ /g, "_")}`}
                        scroll={false}
                      >
                        <a>{update.name}</a>
                      </Link>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
              </>
            )}
          </div>
          <button onClick={() => goTo("/show/New_Updates")}>
            <b className="viewAll">View All</b>
          </button>
        </div>
        <div className="Update-card">
          <p>Admit Card</p>
          <div>
            {admits.length >= 1 ? (
              <>
                {admits.map((admit) => {
                  return (
                    <li key={admit._id}>
                      <Link
                        href={`/details/${admit.name.replace(/ /g, "_")}`}
                        scroll={false}
                      >
                        <a>{admit.name}</a>
                      </Link>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
              </>
            )}
          </div>
          <button onClick={() => goTo("/show/Admit_Card")}>
            <b className="viewAll">View All</b>
          </button>
        </div>
        <div className="Update-card">
          <p>Results</p>
          <div>
            {results.length >= 1 ? (
              <>
                {results.map((result) => {
                  return (
                    <li key={result._id}>
                      <Link
                        href={`/details/${result.name.replace(/ /g, "_")}`}
                        scroll={false}
                      >
                        <a>{result.name}</a>
                      </Link>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
                <USkeleton />
              </>
            )}
          </div>
          <button onClick={() => goTo("/show/Result")}>
            <b className="viewAll">View All</b>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
