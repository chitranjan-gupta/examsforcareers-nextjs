import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import man from "@/images/person.svg";
import emailimg from "@/images/gmail.png";
import sign_up from "@/images/sign_up.svg";

function Signup() {
  if (typeof window !== "undefined") {
    document.title = "Sign Up";
  }
  const history = useRouter();
  const [isDisabled, setDisabled] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    cemail: "",
    password: "",
    cpassword: "",
  });
  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const postData = async (e) => {
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
      if (name.trim().length < 2) {
        if (typeof window !== "undefined") {
          window.alert("Name Is Empty");
        }
        return;
      }
      if (checkSpace.test(email) || checkSpace.test(password)) {
        if (typeof window !== "undefined") {
          window.alert("Email or Password should not contain white spaces");
        }
        return;
      }
      if (checkNum.test(name) || checkNum.test(email)) {
        if (typeof window !== "undefined") {
          window.alert(
            "Name or Email should not be a number or start with number"
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
          window.alert("Password should be more than 6 character");
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
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setDisabled(false);
        if (typeof window !== "undefined") {
          window.alert("Successful Registration");
        }
        console.log("Successful Registration");
        console.log(data.message);
        history.push("/sign_in");
      } else if (res.status === 422 || !data) {
        setDisabled(false);
        if (typeof window !== "undefined") {
          window.alert("Email Already Exists!");
        }
        console.log("Email Already Exists!");
        console.log(data.message);
      } else {
        setDisabled(false);
        if (typeof window !== "undefined") {
          window.alert(data.message);
        }
        console.log(data);
      }
    } catch (err) {
      setDisabled(false);
      console.log(err);
    }
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
                disabled={isDisabled}
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
