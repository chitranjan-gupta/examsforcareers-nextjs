import React, { useState } from "react";
import AdminPage from "@/components/AdminPage";
import Image from "next/image";
import edit from "@/images/edit.svg";
export default function DashBoard() {
  const [userData, setUserData] = useState({
    name: "",
  });
  return (
    <AdminPage redTo="dashboard">
      <div>
        <h1>Hello, {userData.name || "John Doe"}</h1>
      </div>
      <div className="statBox">
        <div className="statCard">
          <div className="imgC">
            <Image alt="edit" src={edit} />
          </div>
          <span>Total Posts</span>
          <h3>1000</h3>
          <i>Increased by 60%</i>
        </div>
        <div className="statCard">
          <div className="imgC">
            <Image alt="edit" src={edit} />
          </div>
          <span>Total Posts</span>
          <h3>1000</h3>
          <i>Increased by 60%</i>
        </div>
        <div className="statCard">
          <div className="imgC">
            <Image alt="edit" src={edit} />
          </div>
          <span>Total Posts</span>
          <h3>1000</h3>
          <i>Increased by 60%</i>
        </div>
      </div>
    </AdminPage>
  );
}
