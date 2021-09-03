/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import DSkeleton from "@/components/DSkeleton";

function Details() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let param, type;
  if (router.query.exam) {
    param = `${router.query.exam.replace(/_/g, " ")}`;
    type = "New_Updates";
    const checkParam = (param) => {
      return new RegExp(param, "ig");
    };
    if (checkParam("Admit").test(param)) {
      type = "Admit_Card";
    } else if (checkParam("Result").test(param)) {
      type = "Result";
    } else {
      type = "New_Updates";
    }
  }
  if (typeof window !== "undefined") {
    document.title = param;
  }
  const [details, setDetails] = useState([]);
  const getDetail = async (name, type) => {
    const res = await fetch("/api/exams/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, type: type }),
    });
    if (res.status === 200) {
      return await res.json();
    } else {
      return await res.json();
    }
  };
  useEffect(() => {
    if (!loading) {
      getDetail(param, type).then((detail) => {
        if (!detail.message) {
          setDetails(detail);
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
      <div className="UpdateBox-Container">
        {details.length >= 1 ? (
          <>
            {details.map((detail) => {
              const key = detail._id
                ? detail._id
                : Math.random().toString() + "ABC";
              return (
                <div className="UpdateBox" key={key}>
                  <section className="aboutBox">
                    <h1>{detail.name}</h1>
                  </section>
                  <section className="introBox">
                    <h1>Intro</h1>
                    <p>{detail.intro}</p>
                  </section>
                  <div className="struct" key={key}>
                    {detail.date ? (
                      <section className="dateBox">
                        <h1>Important Dates</h1>
                        <p>
                          {detail.date.split(":").map((el) => {
                            const key = Math.random().toString() + "1AbC";
                            return <li key={key}>{el}</li>;
                          })}
                        </p>
                      </section>
                    ) : (
                      <></>
                    )}
                    {detail.fee ? (
                      <section className="feeBox">
                        <h1>Application Fee</h1>
                        <p>
                          {detail.fee.split(":").map((el) => {
                            const key = Math.random().toString() + "1AbC";
                            return <li key={key}>{el}</li>;
                          })}
                        </p>
                      </section>
                    ) : (
                      <></>
                    )}
                    {detail.req ? (
                      <section className="eligibilityBox">
                        <h1>Eligibility</h1>
                        <p>
                          {detail.req.split(":").map((el) => {
                            const key = Math.random().toString() + "1AbC";
                            return <li key={key}>{el}</li>;
                          })}
                        </p>
                      </section>
                    ) : (
                      <></>
                    )}
                    {detail.link ? (
                      <>
                        <section className="sitelinkBox">
                          <h1>Official Site</h1>
                          <p>
                            <li>
                              <a href={detail.link}>{detail.link}</a>
                            </li>
                          </p>
                        </section>
                      </>
                    ) : (
                      <></>
                    )}
                    {detail.note ? (
                      <>
                        <section className="NoteBox">
                          <h1>Note</h1>
                          <p>{detail.note}</p>
                        </section>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <DSkeleton />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Details;
