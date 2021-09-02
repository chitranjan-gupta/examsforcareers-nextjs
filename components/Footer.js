import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="copyright">
      <div>
        <Link href="/disclaimer">
          <a className="disclaimer">
            Copyright © 2021 — examsforcareers.
            <b className="th">com</b>. All Rights Reserved.
          </a>
        </Link>
        <div>
          <Link href="/disclaimer">
            <a>
              <li>Disclaimer</li>
            </a>
          </Link>
          <Link href="/privacy_policy">
            <a>
              <li>Privacy Policy</li>
            </a>
          </Link>
          <Link href="/sign_in">
            <a>
              <li>Sign In</li>
            </a>
          </Link>
          <Link href="/sign_up">
            <a>
              <li>Sign Up</li>
            </a>
          </Link>
          <Link href="/contact_us">
            <a>
              <li>Contact Us</li>
            </a>
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
