import React from "react";
import Footer from "../components/Footer";

function Privacy() {
  if (typeof window !== "undefined") {
    document.title = "Privacy Policy";
  }
  return (
    <>
      <Footer />
    </>
  );
}

export default Privacy;
