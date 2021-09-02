import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import man from "../images/person.svg";
import emailimg from "../images/gmail.png";
import sign_up from "../images/sign_up.svg";

function Signup() {
  if (typeof window !== "undefined") {
    document.title = "Sign Up";
  }
  const history = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    cemail: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    try {
      const { name, email, cemail, password, cpassword } = user;
      if (!(name && email && cemail && password && cpassword)) {
        if (typeof window !== "undefined") {
          window.alert("Every Fields Is Must");
        }
        return;
      }
      if (!(email === cemail && password === cpassword)) {
        if (typeof window !== "undefined") {
          window.alert(
            "Email And Confirm Email or Password And Confirm Password are not same"
          );
        }
        return;
      }
      if (!isNaN(name)) {
        if (typeof window !== "undefined") {
          window.alert("name should not be a number");
        }
        return;
      }
      if (!isNaN(email)) {
        if (typeof window !== "undefined") {
          window.alert("email should not be a number");
        }
        return;
      }
      const contains = (param, str) => {
        for (var i = 0; i < param.length; i++) {
          if (param.charAt(i) === str.charAt(0)) {
            if (param.substr(i, str.length) === str) {
              return true;
            }
          }
        }
        return false;
      };
      if (
        !contains(email, ".") ||
        !contains(email, "@") ||
        contains(email, "email")
      ) {
        if (typeof window !== "undefined") {
          window.alert("Not An Email Address");
        }
        return;
      }
      if (password.length < 6) {
        if (typeof window !== "undefined") {
          window.alert("Password should be more than 6 character");
        }
        return;
      }
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        if (typeof window !== "undefined") {
          window.alert("Email Already Exists!");
        }
        console.log("Email Already Exists!");
      } else {
        if (typeof window !== "undefined") {
          window.alert("Successful Registration");
        }
        console.log("Successful Registration");
        history.push("/sign_in");
      }
    } catch (err) {}
  };

  return (
    <div className="mainBody">
      <section className="mainBox">
        <div className="inputBox">
          <h1>Sign up</h1>
          <form method="POST">
            <div className="SignCB">
              <Image alt="men" src={man} />
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleInputs}
                placeholder="Your Name"
                autoComplete="off"
              />
            </div>
            <div className="SignCB">
              <Image alt="men" src={emailimg} placeholder="blur" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={user.email}
                onChange={handleInputs}
                autoComplete="off"
              />
            </div>
            <div className="SignCB">
              <Image alt="men" src={emailimg} placeholder="blur" />
              <input
                type="email"
                name="cemail"
                id="cemail"
                placeholder="Confirm Your Email"
                value={user.cemail}
                onChange={handleInputs}
                autoComplete="off"
              />
            </div>
            <div className="SignCB">
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
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={user.password}
                onChange={handleInputs}
                autoComplete="off"
              />
            </div>
            <div className="SignCB">
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
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Your Password"
                value={user.cpassword}
                onChange={handleInputs}
                autoComplete="off"
              />
            </div>
            <div className="submitbox">
              <input
                type="submit"
                className="submitbutton"
                value="Sign Up"
                onClick={postData}
              />
            </div>
            <div className="alreadyreg">
              <Link href="/sign_in">
                <a>Already Registered? Sign In</a>
              </Link>
            </div>
          </form>
        </div>
        <div className="picBox">
          <Image alt="" src={sign_up} />
        </div>
      </section>
    </div>
  );
}

export default Signup;
