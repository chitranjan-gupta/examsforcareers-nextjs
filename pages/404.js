import React from "react";
import { useRouter } from "next/router";

function Error() {
  if (typeof window !== "undefined") {
    document.title = "404";
  }
  const history = useRouter();
  const goBack = (e) => {
    history.back();
  };
  return (
    <div className="erro-home">
      <h1>WE ARE SORRY, PAGE NOT FOUND!</h1>
      <span>
        THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, HAD ITS NAME
        CHANGED OR ITS TEMPORARY UNAVAILABLE
      </span>
      <div>
        <button onClick={goBack}>BACK TO PREVIOUS PAGE</button>
      </div>
    </div>
  );
}

export default Error;
