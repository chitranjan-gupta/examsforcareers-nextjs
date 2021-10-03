import React, { useState } from "react";
import AdminPage from "@/components/AdminPage";
import AdminPostPage from "@/components/AdminPostPage";
import send_admin from "@/utils/send_admin";
export default function Update() {
  const [params, setParams] = useState({
    name: "",
    intro: "",
    fee: "",
    date: "",
    req: "",
    link: "",
    addType: "New_Updates",
  });
  const [isDisabled, setDisabled] = useState(false);
  const handleInputs = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };
  const onPress = () => {
    for (const el of Object.keys(params)) {
      if (el === "note") {
        continue;
      }
      const val = params[el];
      if (val.trim().length < 2) {
        alert(`${el} should be more than 2 characters`);
        return;
      }
    }
    setDisabled(true);
    send_admin(params)
      .then((res) => {
        setDisabled(false);
        if (res) {
          alert("Successfully Submitted");
        } else {
          alert("Error In the Submission");
        }
      })
      .catch((err) => {
        setDisabled(false);
        console.log(err);
      });
  };
  return (
    <AdminPage redTo="posts">
      <AdminPostPage>
        <h1>Update</h1>
        <div className="postsInputs">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={params.name}
            onChange={handleInputs}
            title="Name"
          />
          <input
            type="text"
            name="intro"
            placeholder="Intro"
            value={params.intro}
            onChange={handleInputs}
            title="Intro"
          />
          <input
            type="text"
            name="fee"
            placeholder="Fee"
            value={params.fee}
            onChange={handleInputs}
            title="fee"
          />
          <input
            type="text"
            name="date"
            placeholder="Date"
            value={params.date}
            onChange={handleInputs}
            title="date"
          />
          <input
            type="text"
            name="req"
            placeholder="Requirement"
            value={params.req}
            onChange={handleInputs}
            title="req"
          />
          <input
            type="text"
            name="link"
            placeholder="Official Link"
            value={params.link}
            onChange={handleInputs}
            title="link"
          />
          <input type="text" name="note" placeholder="Note" title="note" />
          <button disabled={isDisabled} onClick={onPress}>
            Submit
          </button>
        </div>
      </AdminPostPage>
    </AdminPage>
  );
}
