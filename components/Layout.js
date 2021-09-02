import React from "react";
import Navbar from "./Navbar";
import Loading from "./Loading";
function Layout({ children }) {
  return (
    <>
      <Loading />
      <div id="App" className="App">
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </>
  );
}

export default Layout;
