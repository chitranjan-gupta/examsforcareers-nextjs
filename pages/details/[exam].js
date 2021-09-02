import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

function Details() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  var param, type;
  if (router.query.exam) {
    param = `${router.query.exam.replace(/_/g, " ")}`;
    type = "New_Updates";
    const contains = (param, str) => {
      for (var i = 0; i < param.length; i++) {
        if (param.charAt(i) === str.charAt(0)) {
          if (param.substr(i, str.length) === str) {
            return true;
          }
        }
      }
    };
    if (contains(param, "Admit")) {
      type = "Admit_Card";
    } else if (contains(param, "Result")) {
      type = "Result";
    } else {
      type = "New_Updates";
    }
  }
  if (typeof window !== "undefined") {
    document.title = param;
  }
  const [details, setDetails] = useState([{ name: param }]);
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
        {details.map((detail) => {
          const key = detail._id
            ? detail._id
            : Math.random().toString() + "ABC";
          return (
            <div className="UpdateBox" key={key}>
              <section className="aboutBox">
                <h1>{param}</h1>
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
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Details;
