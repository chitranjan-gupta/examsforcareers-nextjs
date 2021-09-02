import React from "react";

function Loading() {
  if (typeof window !== "undefined") {
    document.title = "Loading";
  }
  return (
    <div id="Loading" className="Loading">
      <div className="center">
        <div className="pencil">
          <p>Examsforcareers.com</p>
          <div className="top"></div>
        </div>
      </div>
      <div className="stroke"></div>
    </div>
  );
}

export default Loading;
