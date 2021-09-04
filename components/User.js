/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function User() {
  const [loading, setLoading] = useState(false);
  const history = useRouter();
  const [userData, setUserData] = useState({});
  const [loginStatus, setStatus] = useState(false);
  const checkStatus = async () => {
    try {
      const res = await fetch("/api/users/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 401) {
        history.push("/sign_in");
        console.log(await res.json());
        return;
      }
      if (res.status === 500) {
        history.push("/sign_in");
        console.log(await res.json());
        return;
      }
      if (res.status === 200) {
        setStatus(true);
      }
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.log(err);
      history.push("/sign_in");
    }
  };
  function apply(event) {
    return;
    slide5();
  }
  function next(event) {
    return;
    history.push(
      `/user/${event.target.innerText.trim().toLowerCase().replace(/ /g, "_")}`
    );
  }
  function $(id) {
    if (typeof window !== "undefined") {
      return document.querySelector(id);
    }
  }
  const slide4 = () => {
    return;
    if (typeof window !== "undefined") {
      const qs1 = $("#slide1");
      const qs2 = $("#slide2");
      const qs3 = $("#slide3");
      const qs4 = $("#slide4");
      const qs5 = $("#slide5");
      const cy = $("#classy");
      const co = $("#classo");
      if (qs1 && qs2 && qs3 && qs4 && qs5 && cy && co) {
        qs3.classList.remove("slide3");
        qs3.classList.add("slide2");
        qs4.classList.remove("slide4");
        qs4.classList.add("slide3");
        cy.style.opacity = "1";
        co.style.opacity = "1";
        qs5.classList.remove("slide5");
        qs5.classList.add("slide4");
        qs2.classList.remove("slide2");
        qs2.classList.add("slide1");
        qs1.classList.remove("slide1");
        qs1.classList.add("slide5");
      }
    }
  };
  const slide5 = () => {
    return;
    if (typeof window !== "undefined") {
      const qs1 = $("#slide1");
      const qs2 = $("#slide2");
      const qs3 = $("#slide3");
      const qs4 = $("#slide4");
      const qs5 = $("#slide5");
      const cy = $("#classy");
      const co = $("#classo");
      const cs = $("#coursey");
      const jy = $("#joby");
      const ey = $("#examy");
      qs3.classList.remove("slide2");
      qs3.classList.add("noshadow");
      qs3.classList.add("active");
      qs4.classList.remove("slide3");
      qs4.classList.add("noshadow");
      qs4.classList.add("active");
      qs5.classList.remove("slide4");
      qs5.classList.add("active");
      qs2.classList.remove("slide1");
      qs2.classList.add("active1");
      cs.style.opacity = "1";
      jy.style.opacity = "1";
      ey.style.opacity = "1";
      cy.style.opacity = "0";
      co.style.opacity = "0";
      qs1.classList.remove("slide5");
      qs1.classList.add("active2");
    }
  };
  useEffect(() => {
    if (!loading) {
      checkStatus();
    }
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  if (!loading && loginStatus) {
    return (
      <>
        <div className="question-Container">
          <div className="landscape-info">
            <h1>Change The View To landscape</h1>
          </div>
          <div className="question">
            <div id="slide1" className="questionBox slide1">
              <div className="job">
                <ul id="joby">
                  <li>Job You Want To Get :</li>
                  <li onClick={next}>Teacher</li>
                  <li onClick={next}>Chartered Accountant</li>
                  <li onClick={next}>Software Developer</li>
                  <li onClick={next}>Doctor</li>
                </ul>
              </div>
            </div>
            <div id="slide2" className="questionBox slide2">
              <div className="course">
                <ul id="coursey">
                  <li>Course you want to complete :</li>
                  <li onClick={next}>Matriculation (Class 10)</li>
                  <li onClick={next}>
                    Intermediate Science (I.Sc.) (Class 11 Science)
                  </li>
                  <li onClick={next}>
                    Intermediate Commerce (I.Com.) (Class 11 Commerce)
                  </li>
                  <li onClick={next}>
                    Intermediate Arts (I.A.) (Class 11 Arts)
                  </li>
                  <li onClick={next}>
                    Intermediate Science (I.Sc.) (Class 12 Science)
                  </li>
                  <li onClick={next}>
                    Intermediate Commerce (I.Com.) (Class 12 Commerce)
                  </li>
                  <li onClick={next}>
                    Intermediate Arts (I.A.) (Class 12 Arts)
                  </li>
                </ul>
              </div>
            </div>
            <div onClick={slide4} id="slide3" className="questionBox slide3">
              <div className="welcomeBox">
                <div>
                  <h1>H</h1>
                  <h1>e</h1>
                  <h1>l</h1>
                  <h1>l</h1>
                  <h1>o</h1>
                </div>
                <h1>,{userData.name || "User"}</h1>
              </div>
            </div>
            <div id="slide4" className="questionBox slide4">
              <div className="classyou">
                <h3 id="classy">
                  Please Give Your Some Moment To This Questions{" "}
                </h3>
                <ul id="classo">
                  <li>Class You Are In :</li>
                  <li onClick={apply}>Class 9</li>
                  <li onClick={apply}>Matriculation (Class 10)</li>
                  <li onClick={apply}>
                    Intermediate Science (I.Sc.) (Class 11 Science)
                  </li>
                  <li onClick={apply}>
                    Intermediate Commerce (I.Com.) (Class 11 Commerce)
                  </li>
                  <li onClick={apply}>
                    Intermediate Arts (I.A.) (Class 11 Arts)
                  </li>
                  <li onClick={apply}>
                    Intermediate Science (I.Sc.) (Class 12 Science)
                  </li>
                  <li onClick={apply}>
                    Intermediate Commerce (I.Com.) (Class 12 Commerce)
                  </li>
                  <li onClick={apply}>
                    Intermediate Arts (I.A.) (Class 12 Arts)
                  </li>
                </ul>
              </div>
            </div>
            <div id="slide5" className="questionBox slide5">
              <div className="examyou">
                <ul id="examy">
                  <li>Exam You Want To Crack:</li>
                  <li onClick={next}>JEE Main</li>
                  <li onClick={next}>JEE Advance</li>
                  <li onClick={next}>NEET</li>
                  <li onClick={next}>UPSC</li>
                  <li onClick={next}>WBJEE</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Not Login</h1>
      </>
    );
  }
}

export default User;
