import React from "react";
import { useRouter } from "next/router";
function PageNumber({ page }) {
  const history = useRouter();
  page = page ? page : 1;
  const pageTest = new RegExp("page", "ig");
  const next = () => {
    if (pageTest.test(history.asPath)) {
      let last = history.asPath.lastIndexOf("/");
      history.push(`${history.asPath.substring(0, last)}/${++page}`);
    } else {
      history.push(`${history.asPath}/page/${++page}`);
    }
  };
  const prev = () => {
    if (pageTest.test(history.asPath)) {
      let last = history.asPath.lastIndexOf("/");
      if (!(page === "1")) {
        history.push(`${history.asPath.substring(0, last)}/${--page}`);
      }
    } else {
      if (!(page === "1")) {
        history.push(`${history.asPath}/page/${--page}`);
      }
    }
  };
  return (
    <div className="pagenumber">
      <div className="preno" title="Previous" onClick={prev}>
        <svg
          alt="Previous"
          width="64"
          height="64"
          viewBox="0 0 192 384"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M192 333l-150 -141l150 -141l-21 -19l-171 160l171 160z"
            transform="matrix(1,0,0,-1,0,384)"
          />
        </svg>
      </div>
      <div className="curno" title="Current">
        {page ? (page === "0" ? 1 : page) : 1}
      </div>
      <div className="nexno" title="Next" onClick={next}>
        <svg
          alt="Next"
          width="64"
          height="64"
          viewBox="0 0 192 384"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 333l21 19l171 -160l-171 -160l-21 19l150 141z"
            transform="matrix(1,0,0,-1,0,384)"
          />
        </svg>
      </div>
    </div>
  );
}

export default PageNumber;
