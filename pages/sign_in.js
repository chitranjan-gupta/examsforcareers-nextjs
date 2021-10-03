import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import emailimg from "@/images/gmail.png";
import sign_in from "@/images/sign_in.svg";

function Signin() {
  if (typeof window !== "undefined") {
    document.title = "Sign In";
  }
  const history = useRouter();
  const [isDisabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (typeof window !== "undefined") {
    const regGen = (param) => {
      return new RegExp(param, "ig");
    };
    let reg = regGen("Android");
    let reg1 = regGen("iphone");
    if (
      reg.test(window.navigator.userAgent) ||
      reg1.test(window.navigator.userAgent)
    ) {
    }
  }
  const loginUser = async (e) => {
    e.preventDefault();
    try {
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
        }
        return;
      }
      if (checkSpace.test(email) || checkSpace.test(password)) {
        if (typeof window !== "undefined") {
          window.alert(
            "Email Or Pasword Field should not contain white spaces"
          );
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
      if (!checkUpper.test(password)) {
        if (typeof window !== "undefined") {
          window.alert("Password Should Contain An UpperCase Letter");
        }
        return;
      }
      if (!checkLower.test(password)) {
        if (typeof window !== "undefined") {
          window.alert("Password Should Contain An LowerCase Letter");
        }
        return;
      }
      if (!checkNumber.test(password)) {
        if (typeof window !== "undefined") {
          window.alert("Password Should Contain An Number");
        }
        return;
      }
      if (!checkSpecial.test(password)) {
        if (typeof window !== "undefined") {
          window.alert("Password Should Contain any Of The @, #, %, !");
        }
        return;
      }
      setDisabled(true);
      const res = await fetch("/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setDisabled(false);
        if (typeof window !== "undefined") {
          window.alert(data.message);
        }
        history.push("/user");
      } else {
        setDisabled(false);
        console.log(data.message);
        if (typeof window !== "undefined") {
          window.alert(data.message);
        }
        return;
      }
    } catch (err) {
      setDisabled(false);
      console.log(err);
    }
  };
  return (
    <div className="mainBody">
      <section id="signinmainSBox" className="mainSBox">
        <div className="picBox">
          <Image src={sign_in} alt="" />
        </div>
        <div className="inputBox">
          <h1>Sign In</h1>
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
                onClick={loginUser}
                disabled={isDisabled}
              />
            </div>
          </form>
          <div className="already">
            <Link href="/sign_up">
              <a>Create An Account to get started</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin;
