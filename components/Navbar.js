import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import logo_main from "@/images/logo_main.png";
import lines from "@/images/lines.svg";

function Navbar() {
  if (typeof window !== "undefined") {
    document.title = "examsforcareers.com";
  }
  function $(id) {
    if (typeof window !== "undefined") {
      return document.querySelector(id);
    }
  }
  const history = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ($("#menuChoice").getElementsByClassName("highlight").length < 1) {
        const triggers = $("#menuChoice").querySelectorAll("a");
        const highlight = document.createElement("span");
        highlight.classList.add("highlight");
        $("#menuChoice").appendChild(highlight);
        function highlightLink() {
          const linkCoords = this.getBoundingClientRect();
          const coords = {
            width: linkCoords.width,
            height: linkCoords.height,
            top: linkCoords.top + window.scrollY,
            left: linkCoords.left + window.scrollX,
          };
          highlight.style.width = `${coords.width + 12}px`;
          highlight.style.height = `5px`;
          highlight.style.transform = `translate(${coords.left - 5}px, 40.5px)`;
        }
        triggers.forEach((a) =>
          a.addEventListener("mouseenter", highlightLink)
        );
      }
      const Droptriggers = document.querySelectorAll(".DropBox");
      const background = $(".dropdownBackground");
      const nav = $("#menuChoice");
      function handleEnter() {
        this.classList.add("trigger-enter");
        setTimeout(
          () =>
            this.classList.contains("trigger-enter") &&
            this.classList.add("trigger-enter-active"),
          150
        );
        background.classList.add("open");
        $(".arrow").classList.remove("arrowspecial");
        const dropdown = this.querySelector(".dropdown");
        const dropdownCoords = dropdown.getBoundingClientRect();
        const navCoords = nav.getBoundingClientRect();
        const coords = {
          height: dropdownCoords.height,
          width: dropdownCoords.width,
          top: dropdownCoords.top - navCoords.top,
          left: dropdownCoords.left - navCoords.left,
        };
        if (dropdown.classList.contains("special")) {
          $(".arrow").classList.add("arrowspecial");
          background.style.setProperty("width", `${coords.width}px`);
          background.style.setProperty("height", `70px`);
          background.style.setProperty(
            "transform",
            `translate(${coords.left}px, 60.5px)`
          );
          return;
        }
        background.style.setProperty("width", `${coords.width}px`);
        background.style.setProperty("height", `${coords.height}px`);
        background.style.setProperty(
          "transform",
          `translate(${coords.left}px, 55.5px)`
        );
      }
      function handleLeave() {
        this.classList.remove("trigger-enter", "trigger-enter-active");
        background.classList.remove("open");
      }
      Droptriggers.forEach((trigger) =>
        trigger.addEventListener("mouseenter", handleEnter)
      );
      Droptriggers.forEach((trigger) =>
        trigger.addEventListener("mouseleave", handleLeave)
      );
    }
  });
  var isDropped = false;
  const dropDown = () => {
    const el = $("#menuBar");
    const menuContent = $("#menuContent");
    el.classList.toggle("showMenu");
    if (el.classList.contains("showMenu")) {
      isDropped = true;
    } else {
      isDropped = false;
    }
    el.addEventListener("transitionrun", () => {
      el.style.zIndex = "3";
    });
    el.addEventListener("transitionstart", () => {
      el.style.zIndex = "3";
      if (!isDropped) {
        menuContent.style.visibility = "hidden";
      }
    });
    el.addEventListener("transitioncancel", () => {});
    el.addEventListener("transitionend", () => {
      menuContent.style.visibility = "visible";
      if (!isDropped) {
        el.style.zIndex = "25";
        menuContent.style.visibility = "hidden";
      }
    });
  };
  const site = () => {
    history.push("/");
  };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>examsforcareers.com</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Information Regarding Various Government Exams, State Exams, Entrance Exams and Institute Exams"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="toolbar">
        <div onClick={site} className="brand">
          <div className="logo">
            <Image alt="logo" src={logo_main} />
          </div>
          <span>
            <h1>
              examsforcareers.
              <b className="th">com</b>
            </h1>
          </span>
        </div>
        <div className="drop" onClick={dropDown}>
          <Image alt="Drop" src={lines} />
        </div>
        <div id="menuChoice" className="menu">
          <div className="dropdownBackground">
            <span className="arrow"></span>
          </div>
          <div>
            <Link href="/home">
              <a>Home</a>
            </Link>
          </div>
          <div className="DropBox">
            <Link href="/central_exams">
              <a>Central Exams</a>
            </Link>
            <div className="dropdown">Exams Conducted On Central Level</div>
          </div>
          <div className="DropBox">
            <Link href="/state_exams">
              <a>State Exams</a>
            </Link>
            <div className="dropdown">Exams Conducted By Respective States</div>
          </div>
          <div className="DropBox">
            <Link href="/engineering_exams">
              <a>Engineering Exams</a>
            </Link>
            <div className="dropdown">
              Exam Which Leads To Admission In Engineering Courses
            </div>
          </div>
          <div className="DropBox">
            <Link href="/medical_exams">
              <a>Medical Exams</a>
            </Link>
            <div className="dropdown">
              Exam Which Leads To Admission In Medical Courses
            </div>
          </div>
          <div className="DropBox">
            <Link href="/defence_exams">
              <a>Defence Exams</a>
            </Link>
            <div className="dropdown">
              Exam Which Leads To Job In Defence Profession
            </div>
          </div>
          <div className="DropBox">
            <Link href="/others_exams">
              <a>Others Exams</a>
            </Link>
            <div className="dropdown special">Other Categories Of Exams</div>
          </div>
        </div>
      </div>
      <div id="menuBar" className="menubar">
        <section id="menuContent">
          <div>
            <Link href="/home">
              <a>
                <li>Home</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/central_exams">
              <a>
                <li>Central Exams</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/state_exams">
              <a>
                <li>State Exams</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/engineering_exams">
              <a>
                <li>Engineering Exams</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/medical_exams">
              <a>
                <li>Medical Exams</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/defence_exams">
              <a>
                <li>Defence Exams</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/others_exams">
              <a>
                <li>Others Exams</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/sign_in">
              <a>
                <li>Sign In</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/sign_up">
              <a>
                <li>Sign Up</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/disclaimer">
              <a>
                <li>Disclaimer</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/privacy_policy">
              <a>
                <li>Privacy Policy</li>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/contact_us">
              <a>
                <li>Contact Us</li>
              </a>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Navbar;
