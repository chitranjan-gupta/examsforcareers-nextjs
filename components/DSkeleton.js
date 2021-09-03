import React from "react";

function DSkeleton() {
  return (
    <>
      <div className="Detail-Container skeleton">
        <section className="aboutBox">
          <h1></h1>
          <div className="iLogoBox"></div>
        </section>
        <section className="SkeletonContentBox">
          <div className="SK N1">
            <div className="SKN G1"></div>
            <div className="SKN G2"></div>
          </div>
          <div className="SK N2">
            <div className="SKN G1"></div>
            <div className="SKN G2"></div>
          </div>
          <div className="SK N3">
            <div className="SKN G1"></div>
            <div className="SKN G2"></div>
          </div>
          <div className="SK N4">
            <div className="SKN G1"></div>
            <div className="SKN G2"></div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DSkeleton;
