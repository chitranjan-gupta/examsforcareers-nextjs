import React, { useState } from "react";
import Image from "next/image";
import emailimg from "@/images/gmail.png";
import Footer from "@/components/Footer";

function Contact() {
  if (typeof window !== "undefined") {
    document.title = "Contact Us";
  }
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleInputs = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const postMessage = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, message } = contact;
      const checkNum = new RegExp("^[0-9]", "g");
      const checkSpace = new RegExp(/\s/, "g");
      const checkEmail = new RegExp(
        "^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.][a-zA-Z]+$",
        "g"
      );
      const checkemail = new RegExp("email", "ig");
      if (!(name && email && phone && message)) {
        if (typeof window !== "undefined") {
          window.alert("Every Fields Is Must");
        }
        return;
      }
      if (checkSpace.test(email)) {
        if (typeof window !== "undefined") {
          window.alert(
            "Email or Name or Message should not contain white spaces"
          );
        }
        return;
      }
      if (
        checkNum.test(name) ||
        checkNum.test(email) ||
        checkNum.test(message)
      ) {
        if (typeof window !== "undefined") {
          window.alert(
            "Name or Email or Message should not be a number or start with number"
          );
        }
        return;
      }
      if (name.trim().length < 2 || message.trim().length < 10) {
        if (typeof window !== "undefined") {
          window.alert("Name or Message Is Empty");
        }
        return;
      }
      if (!checkEmail.test(email) || checkemail.test(email)) {
        if (typeof window !== "undefined") {
          window.alert("Not An Email Address");
        }
        return;
      }
      if (phone.length !== 10) {
        if (typeof window !== "undefined") {
          window.alert("Not An Phone Number");
        }
        return;
      }
      const res = await fetch("/api/users/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        if (typeof window !== "undefined") {
          window.alert(data.message);
        }
        console.log(res.status);
        console.log(data.message);
      } else {
        console.log(res.status);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="contactBody">
        <section className="contactinfo">
          <div className="detailBox">
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
            <div>
              <h4>Phone</h4>
              <span>+910123456789</span>
            </div>
          </div>
          <div className="detailBox">
            <Image alt="Email" src={emailimg} placeholder="blur" />
            <div>
              <h4>Email</h4>
              <span>admin@examsforcareers.com</span>
            </div>
          </div>
          <div className="detailBox">
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
            <div>
              <h4>Address</h4>
              <span>Banaras, India</span>
            </div>
          </div>
        </section>
        <section className="messageBox">
          <h1>Get In Touch</h1>
          <form method="POST">
            <div className="fromInfo">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                autoComplete="off"
                value={contact.name}
                onChange={handleInputs}
                required={true}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                autoComplete="off"
                value={contact.email}
                onChange={handleInputs}
                required={true}
              />
              <input
                type="number"
                name="phone"
                placeholder="Your Phone Number"
                autoComplete="off"
                value={contact.phone}
                onChange={handleInputs}
                required={true}
              />
            </div>
            <div>
              <textarea
                name="message"
                className="messageArea"
                placeholder="Message"
                cols="30"
                rows="10"
                autoComplete="off"
                value={contact.message}
                onChange={handleInputs}
                required={true}
              ></textarea>
            </div>
            <div className="sendButtonBox">
              <input
                className="sendButton"
                type="submit"
                value="Send Message"
                onClick={postMessage}
                onSubmit={postMessage}
              />
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
