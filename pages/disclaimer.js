import React from "react";
import Footer from "components/Footer";

function Disclaimer() {
  if (typeof window !== "undefined") {
    document.title = "Diclaimer";
  }
  return (
    <>
      <div className="private">
        <div>
          <h1>Disclaimer</h1>
          <p>
            This web site is brought to you by examsforcareers.com&apos;s
            developer. The content on examsforcareers.com website has been
            collected from various sources. The developer and content collector
            has made huge efforts to present accurate and reliable information
            on examsforcareers.com website. However,the developer and content
            collector does not take any legal responsibility for the
            accuracy,completeness, or usefulness of the information on the
            examsforcareers.com. The examsforcareers.com website designed,
            developed and maintained by developer of examsforcareers.com.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Disclaimer;
