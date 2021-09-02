import React from "react";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
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
