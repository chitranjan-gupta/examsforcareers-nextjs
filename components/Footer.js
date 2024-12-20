import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="copyright">
      <div>
        <Link href="/disclaimer">
          <p className="disclaimer">
            Copyright © 2021 — examsforcareers.
            <b className="th">com</b>. All Rights Reserved.
          </p>
        </Link>
        <div>
          <Link href="/disclaimer">
            <p>
            Disclaimer
            </p>
          </Link>
          <Link href="/privacy_policy">
            <p>
            Privacy Policy
            </p>
          </Link>
          <Link href="/sign_in">
            <p>
            Sign In
            </p>
          </Link>
          <Link href="/sign_up">
            <p>
            Sign Up
            </p>
          </Link>
          <Link href="/contact_us">
            <p>
            Contact Us
            </p>
          </Link>
        </div>
      </div>
      <div className="weight">
        <h1>
          examsforcareers.
          <b className="th">com</b>
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
