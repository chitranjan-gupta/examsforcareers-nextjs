/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo_main from "@/images/logo_main.png";
import person from "@/images/person.svg";
import search from "@/images/search.svg";
import emailimg from "@/images/gmail.png";

function AdminPage(props) {
  const [loading, setLoading] = useState(false);
  const [loginStatus, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (typeof window !== "undefined") {
    document.title = "Admin";
  }
  const history = useRouter();
  const [userData, setUserData] = useState({});
  const checkStatus = async () => {
    try {
      const res = await fetch("/api/admin/logStatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        setStatus(true);
        setUserData(data);
      } else {
        console.log(data.message);
        if (typeof window !== "undefined") {
          window.alert(data.message);
        }
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const login = async (e) => {
    e.preventDefault();
    const checkNum = new RegExp("^[0-9]", "g");
    const checkSpace = new RegExp(/\s/, "g");
    const checkEmail = new RegExp(
      "^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.][a-zA-Z]+$",
      "g"
    );
    const checkemail = new RegExp("email", "ig");
    const checkUpper = new RegExp("[A-Z]", "g");
    const checkLower = new RegExp("[a-z]", "g");
    const checkNumber = new RegExp("[0-9]", "g");
    const checkSpecial = new RegExp("[@#!%]", "g");
    if (!email || !password) {
      if (typeof window !== "undefined") {
        window.alert("Email Or Pasword Field Is Empty");
        return;
      }
    }
    if (checkSpace.test(email) || checkSpace.test(password)) {
      if (typeof window !== "undefined") {
        window.alert("Email Or Pasword Field should not contain white spaces");
      }
      return;
    }
    if (checkNum.test(email)) {
      if (typeof window !== "undefined") {
        window.alert(
          "email should not be a number and does not start with a number"
        );
      }
      return;
    }
    if (!checkEmail.test(email) || checkemail.test(email)) {
      if (typeof window !== "undefined") {
        window.alert("Not An Email Address");
      }
      return;
    }
    if (password.length < 6) {
      if (typeof window !== "undefined") {
        window.alert("Password Should Be More than 6 character");
      }
      return;
    }
    // if (!checkUpper.test(password)) {
    //   if (typeof window !== "undefined") {
    //     window.alert("Password Should Contain An UpperCase Letter");
    //   }
    //   return;
    // }
    if (!checkLower.test(password)) {
      if (typeof window !== "undefined") {
        window.alert("Password Should Contain An LowerCase Letter");
      }
      return;
    }
    // if (!checkNumber.test(password)) {
    //   if (typeof window !== "undefined") {
    //     window.alert("Password Should Contain An Number");
    //   }
    //   return;
    // }
    if (!checkSpecial.test(password)) {
      if (typeof window !== "undefined") {
        window.alert("Password Should Contain any Of The @, #, %, !");
      }
      return;
    }
    try {
      const res = await fetch("/api/admin/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });
      if (res.status === 200) {
        history.reload();
      } else {
        if (typeof window !== "undefined") {
          console.log(await res.json());
        }
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  function $(el) {
    return document.querySelector(el);
  }
  function ActiveListBox(red) {
    const el = $(`#${red}`);
    if (el) {
      const elBox = document
        .querySelector("ul#contentURL")
        .querySelectorAll("li");
      if (elBox) {
        elBox.forEach((elem) => {
          if (elem.classList.contains("activeListBox")) {
            elem.classList.remove("activeListBox");
          }
        });
      }
      if (!el.classList.contains("activeListBox")) {
        el.classList.add("activeListBox");
      }
    }
  }
  useEffect(() => {
    if (!loading && loginStatus) {
      ActiveListBox(props.redTo.toString());
    }
  });
  useEffect(() => {
    if (!loading) {
      checkStatus();
    }
  }, []);
  useEffect(() => {
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  function changeProps(event) {
    const el = event.target;
    const elBox = document
      .querySelector("ul#contentURL")
      .querySelectorAll("li");
    if (elBox) {
      elBox.forEach((elem) => {
        if (!(elem === el)) {
          if (elem.classList.contains("activeListBox")) {
            elem.classList.remove("activeListBox");
          }
        }
      });
    }
    if (!el.classList.contains("activeListBox")) {
      el.classList.add("activeListBox");
      if (el.innerText) {
        history.push(`/admin/${el.innerText.toLowerCase().replace(/ /g, "_")}`);
      }
    }
  }
  if (!loading && loginStatus) {
    return (
      <div className="adminBox">
        <section className="postBox">
          <div className="optionBox">
            <div className="brandBox">
              <div>
                <Image alt="logo" src={logo_main} />
              </div>
            </div>
            <div className="listBox">
              <div className="loginBox">
                <div>
                  <Image alt="admin pic" src={person} />
                </div>
                <span>
                  <h4>{userData.name || "John Doe"}</h4>
                  <b>Founder</b>
                </span>
              </div>
              <ul id="contentURL">
                <li
                  className="activeListBox"
                  onClick={(event) => changeProps(event)}
                  id="dashboard"
                  name="dashboard"
                >
                  <div>
                    <svg
                      viewBox="0 0 1664 1280"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1408 544v-480q0 -26 -19 -45t-45 -19h-384v384h-256v-384h-384q-26 0 -45 19t-19 45v480q0 1 0.5 3t0.5 3l575 474l575 -474q1 -2 1 -6zM1631 613l-62 -74q-8 -9 -21 -11h-3q-13 0 -21 7l-692 577l-692 -577q-12 -8 -24 -7q-13 2 -21 11l-62 74q-8 10 -7 23.5t11 21.5 l719 599q32 26 76 26t76 -26l244 -204v195q0 14 9 23t23 9h192q14 0 23 -9t9 -23v-408l219 -182q10 -8 11 -21.5t-7 -23.5z"
                        transform="matrix(1,0,0,-1,0,1280)"
                      />
                    </svg>
                  </div>
                  DashBoard
                </li>
                <li
                  id="posts"
                  name="posts"
                  onClick={(event) => changeProps(event)}
                >
                  <div>
                    <svg
                      viewBox="0 0 1792 1280"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M888 352l116 116l-152 152l-116 -116v-56h96v-96h56zM1328 1072q-16 16 -33 -1l-350 -350q-17 -17 -1 -33t33 1l350 350q17 17 1 33zM1408 478v-190q0 -119 -84.5 -203.5t-203.5 -84.5h-832q-119 0 -203.5 84.5t-84.5 203.5v832q0 119 84.5 203.5t203.5 84.5h832 q63 0 117 -25q15 -7 18 -23q3 -17 -9 -29l-49 -49q-14 -14 -32 -8q-23 6 -45 6h-832q-66 0 -113 -47t-47 -113v-832q0 -66 47 -113t113 -47h832q66 0 113 47t47 113v126q0 13 9 22l64 64q15 15 35 7t20 -29zM1312 1216l288 -288l-672 -672h-288v288zM1756 1084l-92 -92 l-288 288l92 92q28 28 68 28t68 -28l152 -152q28 -28 28 -68t-28 -68z"
                        transform="matrix(1,0,0,-1,0,1280)"
                      />
                    </svg>
                  </div>
                  Posts
                </li>
                <li onClick={(event) => changeProps(event)}>
                  <div>
                    <svg
                      viewBox="0 0 1024 768"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M682.5 427q54.5 0 91.5 36.5t37 91t-37 91.5t-91.5 37t-91 -37t-36.5 -91.5t36.5 -91t91 -36.5zM341.5 427q54.5 0 91 36.5t36.5 91t-36.5 91.5t-91 37t-91.5 -37t-37 -91.5t37 -91t91.5 -36.5zM341 341q-39 0 -88.5 -9.5t-97 -27.5t-80 -47.5t-32.5 -64.5v-107h597v107    q0 35 -32.5 64.5t-80.5 47.5t-97.5 27.5t-88.5 9.5zM683 341q-26 0 -43 -4q40 -26 62.5 -63.5t22.5 -81.5v-107h256v107q0 35 -32.5 64.5t-80 47.5t-97 27.5t-88.5 9.5z"
                        transform="matrix(1,0,0,-1,0,768)"
                      />
                    </svg>
                  </div>
                  Customers
                </li>
                <li
                  id="messages"
                  name="messages"
                  onClick={(event) => changeProps(event)}
                >
                  <div>
                    <svg
                      viewBox="0 0 1024 768"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M682.5 427q54.5 0 91.5 36.5t37 91t-37 91.5t-91.5 37t-91 -37t-36.5 -91.5t36.5 -91t91 -36.5zM341.5 427q54.5 0 91 36.5t36.5 91t-36.5 91.5t-91 37t-91.5 -37t-37 -91.5t37 -91t91.5 -36.5zM341 341q-39 0 -88.5 -9.5t-97 -27.5t-80 -47.5t-32.5 -64.5v-107h597v107    q0 35 -32.5 64.5t-80.5 47.5t-97.5 27.5t-88.5 9.5zM683 341q-26 0 -43 -4q40 -26 62.5 -63.5t22.5 -81.5v-107h256v107q0 35 -32.5 64.5t-80 47.5t-97 27.5t-88.5 9.5z"
                        transform="matrix(1,0,0,-1,0,768)"
                      />
                    </svg>
                  </div>
                  Messages
                </li>
                <li onClick={(event) => changeProps(event)}>
                  <div>
                    <svg
                      viewBox="0 0 1024 768"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M682.5 427q54.5 0 91.5 36.5t37 91t-37 91.5t-91.5 37t-91 -37t-36.5 -91.5t36.5 -91t91 -36.5zM341.5 427q54.5 0 91 36.5t36.5 91t-36.5 91.5t-91 37t-91.5 -37t-37 -91.5t37 -91t91.5 -36.5zM341 341q-39 0 -88.5 -9.5t-97 -27.5t-80 -47.5t-32.5 -64.5v-107h597v107    q0 35 -32.5 64.5t-80.5 47.5t-97.5 27.5t-88.5 9.5zM683 341q-26 0 -43 -4q40 -26 62.5 -63.5t22.5 -81.5v-107h256v107q0 35 -32.5 64.5t-80 47.5t-97 27.5t-88.5 9.5z"
                        transform="matrix(1,0,0,-1,0,768)"
                      />
                    </svg>
                  </div>
                  Help
                </li>
                <li onClick={(event) => changeProps(event)}>
                  <div>
                    <svg
                      viewBox="0 0 1792 1280"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1024 640q0 106 -75 181t-181 75t-181 -75t-75 -181t75 -181t181 -75t181 75t75 181zM1536 749v-222q0 -12 -8 -23t-20 -13l-185 -28q-19 -54 -39 -91q35 -50 107 -138q10 -12 10 -25t-9 -23q-27 -37 -99 -108t-94 -71q-12 0 -26 9l-138 108q-44 -23 -91 -38 q-16 -136 -29 -186q-7 -28 -36 -28h-222q-14 0 -24.5 8.5t-11.5 21.5l-28 184q-49 16 -90 37l-141 -107q-10 -9 -25 -9q-14 0 -25 11q-126 114 -165 168q-7 10 -7 23q0 12 8 23q15 21 51 66.5t54 70.5q-27 50 -41 99l-183 27q-13 2 -21 12.5t-8 23.5v222q0 12 8 23t19 13 l186 28q14 46 39 92q-40 57 -107 138q-10 12 -10 24q0 10 9 23q26 36 98.5 107.5t94.5 71.5q13 0 26 -10l138 -107q44 23 91 38q16 136 29 186q7 28 36 28h222q14 0 24.5 -8.5t11.5 -21.5l28 -184q49 -16 90 -37l142 107q9 9 24 9q13 0 25 -10q129 -119 165 -170q7 -8 7 -22 q0 -12 -8 -23q-15 -21 -51 -66.5t-54 -70.5q26 -50 41 -98l183 -28q13 -2 21 -12.5t8 -23.5z"
                        transform="matrix(1,0,0,-1,0,1280)"
                      />
                    </svg>
                  </div>
                  Settings
                </li>
                <li onClick={(event) => changeProps(event)}>
                  <div>
                    <svg
                      viewBox="0 0 320 384"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M264 224h56v-240h-320v240h56v72c0 57 47 104 104 104s104 -47 104 -104v-72zM72 296v-72h176v72c0 49 -39 88 -88 88s-88 -39 -88 -88zM304 0v208h-288v-208h288zM160 160c18 0 32 -14 32 -32c0 -15 -10 -27 -24 -31v-33h-16v33c-14 4 -24 16 -24 31c0 18 14 32 32 32z M160 112c9 0 16 7 16 16s-7 16 -16 16s-16 -7 -16 -16s7 -16 16 -16z"
                        transform="matrix(1,0,0,-1,0,384)"
                      />
                    </svg>
                  </div>
                  Password
                </li>
                <li id="SignOut" onClick={(event) => changeProps(event)}>
                  <div>
                    <svg
                      viewBox="0 0 320 384"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M192 304h128v-304h-320v304h128v-16h-112v-272h288v272h-112v16zM97 330l-11 12l74 74l74 -74l-11 -12l-55 55v-243h-16v243z"
                        transform="matrix(1,0,0,-1,0,384)"
                      />
                    </svg>
                  </div>
                  Sign Out
                </li>
              </ul>
            </div>
          </div>
          <div className="workBox">
            <header>
              <h1>{props.redTo.toUpperCase()}</h1>
              <div className="seimg">
                <input type="text" placeholder="Search here" />
                <div className="simg">
                  <Image alt="sicon" src={search} />
                </div>
              </div>
            </header>
            <div className="contentBox">{props.children}</div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <>
        <div className="mainBody">
          <section className="mainSBox InAdmin">
            <div className="inputBox">
              <h1>Admin Login</h1>
              <form method="POST">
                <div className="fillImg">
                  <Image src={emailimg} alt="men" placeholder="blur" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="fillImg">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 320 384"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M264 224h56v-240h-320v240h56v72c0 57 47 104 104 104s104 -47 104 -104v-72zM72 296v-72h176v72c0 49 -39 88 -88 88s-88 -39 -88 -88zM304 0v208h-288v-208h288zM160 160c18 0 32 -14 32 -32c0 -15 -10 -27 -24 -31v-33h-16v33c-14 4 -24 16 -24 31c0 18 14 32 32 32z M160 112c9 0 16 7 16 16s-7 16 -16 16s-16 -7 -16 -16s7 -16 16 -16z"
                      transform="matrix(1,0,0,-1,0,384)"
                    />
                  </svg>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="submitbox">
                  <input
                    type="submit"
                    className="submitbutton"
                    value="Login In"
                    onClick={login}
                  />
                </div>
              </form>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default AdminPage;
