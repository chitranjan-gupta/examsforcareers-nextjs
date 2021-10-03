import React, { useState } from "react";
import AdminPage from "@/components/AdminPage";
import AdminPostPage from "@/components/AdminPostPage";
import send_admin from "@/utils/send_admin";
export default function Admit() {
  const [params, setParams] = useState({
    name: "",
    intro: "",
    date: "",
    isAvail: "",
    link: "",
    note: "",
    addType: "Admit_Card",
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
    const isTrue =
      new RegExp("true", "ig").test(isAvail) ||
      new RegExp("yes", "ig").test(isAvail);
    const isFalse =
      new RegExp("false", "ig").test(isAvail) ||
      new RegExp("no", "ig").test(isAvail);
    if (isTrue && !isFalse) {
      params.isAvail = true;
    } else {
      params.isAvail = false;
    }
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
        <h1>Admit</h1>
        <div className="postsInputs">
          <input
            type="text"
            name="name"
            placeholder="Name"
            title="Name"
            value={params.name}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="intro"
            placeholder="Introduction"
            title="Intro"
            value={params.intro}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="date"
            placeholder="Date"
            title="date"
            value={params.date}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="isAvail"
            placeholder="Is Available"
            title="is Available"
            value={params.isAvail}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="link"
            placeholder="Official Link"
            title="Link"
            value={params.link}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="note"
            placeholder="Note"
            title="Note"
            value={params.note}
            onChange={handleInputs}
          />
          <button disabled={isDisabled} onClick={onPress}>
            Submit
          </button>
        </div>
      </AdminPostPage>
    </AdminPage>
  );
}
