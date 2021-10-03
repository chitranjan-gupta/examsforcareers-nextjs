import React, { useState } from "react";
import AdminPage from "@/components/AdminPage";
import AdminPostPage from "@/components/AdminPostPage";
import send_admin from "@/utils/send_admin";
export default function Detail() {
  const [params, setParams] = useState({
    name: "",
    abbreviation: "",
    link: "",
    logo: "",
    intro: "",
    type: "",
    duration: "",
    times: "",
    eligibility: "",
    language: "",
    wikipedia: "",
    regSdate: "",
    regEdate: "",
    lfeedate: "",
    admit: "",
    examdate: "",
    genobcfee: "",
    scstfee: "",
    phfee: "",
    addType: "New_Detail",
  });
  const [isDisabled, setDisabled] = useState(false);
  const handleInputs = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };
  const onPress = () => {
    for (const el of Object.keys(params)) {
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
        <h1>Detail</h1>
        <div className="postsInputs">
          <input
            type="text"
            title="Name"
            name="name"
            placeholder="Name"
            value={params.name}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Abbreviation"
            name="abbreviation"
            placeholder="Abbreviation"
            value={params.abbreviation}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Official Link"
            name="link"
            placeholder="Official Link"
            value={params.link}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Official Logo"
            name="logo"
            placeholder="Official Logo"
            value={params.logo}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Introduction"
            name="intro"
            placeholder="Introduction"
            value={params.intro}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Type"
            name="type"
            placeholder="Type"
            value={params.type}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Duration"
            name="duration"
            placeholder="Duration"
            value={params.duration}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Times"
            name="times"
            placeholder="Times"
            value={params.times}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Eligibility"
            name="eligibility"
            placeholder="Eligibility"
            value={params.eligibility}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Language"
            name="language"
            placeholder="Language"
            value={params.language}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Wikipedia"
            name="wikipedia"
            placeholder="Wikipedia"
            value={params.wikipedia}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Registration Starting Date"
            name="regSdate"
            placeholder="Registration Starting Date"
            value={params.regSdate}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Registration Ending Date"
            name="regEdate"
            placeholder="Registration Ending Date"
            value={params.regEdate}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Last Date Of Fee Payment"
            name="lfeedate"
            placeholder="Last Date Of Fee Payment"
            value={params.lfeedate}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Admit Card Date"
            name="admit"
            placeholder="Admit Card Date"
            value={params.admit}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="Exam Date"
            name="examdate"
            placeholder="Exam Date"
            value={params.examdate}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="General / OBC Fee"
            name="genobcfee"
            placeholder="General / OBC Fee"
            value={params.genobcfee}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="SC / ST Fee"
            name="scstfee"
            placeholder="SC / ST Fee"
            value={params.scstfee}
            onChange={handleInputs}
          />
          <input
            type="text"
            title="PH Fee"
            name="phfee"
            placeholder="PH Fee"
            value={params.phfee}
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
