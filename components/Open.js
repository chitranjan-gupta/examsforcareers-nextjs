import React, { useEffect, useState } from "react";
import iLogo from "../images/logo_main.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "./Footer";

function Open() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  var param;
  if (router.query.exam) {
    param = router.query.exam.replace(/_/g, " ");
  }
  if (typeof window !== "undefined") {
    document.title = param;
  }
  const [details, setDetails] = useState([{ name: param }]);
  const getDetail = async (value) => {
    const res = await fetch("/api/exams/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ abbreviation: value }),
    });
    if (res.status === 200) {
      return await res.json();
    } else {
      return await res.json();
    }
  };
  useEffect(() => {
    if (!loading) {
      getDetail(param).then((detail) => {
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
      <div className="DetailBox-Container">
        {details.map((detail) => {
          const key = detail._id ? detail._id : `ABC${Math.random()}`;
          return (
            <div className="Detail-Container" key={key}>
              <section className="aboutBox">
                <h1>{detail.name}</h1>
                <div className="iLogoBox">
                  <Image alt="Exam Logo" src={iLogo} />
                </div>
              </section>
              <section className="introBox">
                {detail.intro ? (
                  <>
                    <h1>Intro</h1>
                    <p>{detail.intro}</p>
                  </>
                ) : (
                  <></>
                )}
                {detail.abbreviation ? (
                  <>
                    <h1>Abbreviation</h1>
                    <p>{detail.abbreviation}</p>
                  </>
                ) : (
                  <></>
                )}
                {detail.type ? (
                  <>
                    <h1>Type</h1>
                    <p>{detail.type}</p>
                  </>
                ) : (
                  <></>
                )}
                {detail.duration ? (
                  <>
                    <h1>Duration</h1>
                    <p>{detail.duration}</p>
                  </>
                ) : (
                  <></>
                )}
                {detail.times ? (
                  <>
                    <h1>Times</h1>
                    <p>{detail.times}</p>
                  </>
                ) : (
                  <></>
                )}
                {detail.eligibility ? (
                  <>
                    <h1>Prerequisites / Eligibility Criteria</h1>
                    <p>{detail.eligibility}</p>
                  </>
                ) : (
                  <></>
                )}
                {detail.language ? (
                  <>
                    <h1>Question Language</h1>
                    <p>{detail.language}</p>
                  </>
                ) : (
                  <></>
                )}
                {detail.link ? (
                  <>
                    <h1>Website</h1>
                    <p>
                      <a href={detail.link}>{detail.link}</a>
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {detail.wikipedia ? (
                  <>
                    <h1>Wikipedia</h1>
                    <p>
                      <a href={detail.wikipedia}>{detail.wikipedia}</a>
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </section>
              <section className="tableBox">
                <h1>Table</h1>
                <div>
                  <h1>Bachelor of Engineering / Bachelor of Technology </h1>
                  <section className="table">
                    <p>Subjects</p>
                    <p>Physics</p>
                    <p>Chemistry</p>
                    <p>Mathematics</p>
                    <p>Marks</p>
                    <p>100</p>
                    <p>100</p>
                    <p>100</p>
                    <p>No of Questions</p>
                    <p>25</p>
                    <p>25</p>
                    <p>25</p>
                    <p>Type</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                  </section>
                </div>
                <div>
                  <h1>Bachelor of Architecture</h1>
                  <section className="table">
                    <p>Subjects</p>
                    <p>Mathematics</p>
                    <p>Aptitude Test</p>
                    <p>Drawing Test</p>
                    <p>Marks</p>
                    <p>100</p>
                    <p>100</p>
                    <p>100</p>
                    <p>No of Questions</p>
                    <p>25</p>
                    <p>25</p>
                    <p>25</p>
                    <p>Type</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                    <p>Offline on a drawing sheet</p>
                  </section>
                </div>
                <div>
                  <h1>Bachelor of Planning </h1>
                  <section className="table">
                    <p>Subjects</p>
                    <p>Mathematics</p>
                    <p>Aptitude Test</p>
                    <p>Planning Based On Questions</p>
                    <p>Marks</p>
                    <p>100</p>
                    <p>100</p>
                    <p>100</p>
                    <p>No of Questions</p>
                    <p>25</p>
                    <p>25</p>
                    <p>25</p>
                    <p>Type</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                  </section>
                </div>
              </section>
              {detail.regSdate ? (
                <>
                  <section className="dateBox">
                    <h1>Important Dates</h1>
                    <section className="table">
                      {detail.regSdate ? (
                        <>
                          <p>Registration Starting Date</p>
                          <p>{detail.regSdate}</p>
                        </>
                      ) : (
                        <></>
                      )}
                      {detail.regEdate ? (
                        <>
                          <p>Registration Ending Date</p>
                          <p>{detail.regEdate}</p>
                        </>
                      ) : (
                        <></>
                      )}
                      {detail.lfeedate ? (
                        <>
                          <p>Last Date Of Fee Payment</p>
                          <p>{detail.lfeedate}</p>
                        </>
                      ) : (
                        <></>
                      )}
                      {detail.admit ? (
                        <>
                          <p>Admit Card</p>
                          <p>{detail.admit}</p>
                        </>
                      ) : (
                        <></>
                      )}
                      {detail.examdate ? (
                        <>
                          <p>Exam Date</p>
                          <p>{detail.examdate}</p>
                        </>
                      ) : (
                        <></>
                      )}
                    </section>
                  </section>
                </>
              ) : (
                <></>
              )}
              {detail.genobcfee ? (
                <>
                  <section className="feeBox">
                    <h1>Application Fee</h1>
                    <section className="table">
                      {detail.genobcfee ? (
                        <>
                          <p>General, OBC</p>
                          <p>{detail.genobcfee}</p>
                        </>
                      ) : (
                        <></>
                      )}
                      {detail.scstfee ? (
                        <>
                          <p>SC,ST</p>
                          <p>{detail.scstfee}</p>
                        </>
                      ) : (
                        <></>
                      )}
                      {detail.phfee ? (
                        <>
                          <p>PH</p>
                          <p>{detail.phfee}</p>
                        </>
                      ) : (
                        <></>
                      )}
                    </section>
                  </section>
                </>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Open;
