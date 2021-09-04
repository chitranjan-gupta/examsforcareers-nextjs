import React from "react";
import { useRouter } from "next/router";

function Error() {
  if (typeof window !== "undefined") {
    document.title = "500";
  }
  const history = useRouter();
  const goBack = (e) => {
    if (typeof window !== "undefined") {
      if (history) {
        history.push("/");
      } else {
        const el = document.createElement("a");
        el.href = "https://examsforcareers.com";
        el.click();
      }
    }
  };
  return (
    <div className="erro-home ERROR500">
      <h1>WE ARE SORRY!</h1>
      <span>THERE IS A PROBLEM IN THE SERVER</span>
      <div>
        <button onClick={goBack}>BACK TO EXAMSFORCAREERS.COM</button>
      </div>
    </div>
  );
}

export default Error;
