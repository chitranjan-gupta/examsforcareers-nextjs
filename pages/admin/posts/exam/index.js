import React, { useState } from "react";
import AdminPage from "@/components/AdminPage";
import AdminPostPage from "@/components/AdminPostPage";
import send_admin from "@/utils/send_admin";
export default function Exam() {
  const [params, setParams] = useState({
    name: "",
    abbreviation: "",
    link: "",
    logo: "",
    categoryMain: "",
    categoryBase: "",
    addType: "New_Exam",
  });
  const [autoText, setAutoText] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const handleInputs = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };
  const getCategory = async (e) => {
    let login = await fetch("/api/exams/categoryall", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: params.categoryBase }),
    });
    if (login.status === 200) {
      setAutoText(await login.json());
    } else {
      console.log(login.status);
    }
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
        <h1>Exam</h1>
        <div className="postsInputs">
          <input
            type="text"
            name="name"
            title="Name"
            placeholder="Name"
            value={params.name}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="abbreviation"
            title="Abbreviation"
            placeholder="Abbreviation"
            value={params.abbreviation}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="link"
            title="Official Link"
            placeholder="Official Link"
            value={params.link}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="logo"
            title="Official Logo"
            placeholder="Official Logo"
            value={params.logo}
            onChange={handleInputs}
          />
          <input
            type="text"
            name="categoryMain"
            title="Category Main"
            placeholder="Category Main"
            value={params.categoryMain}
            onChange={(e) => {
              handleInputs(e);
            }}
          />
          <div className="autocomplete">
            <input
              type="text"
              id="categoryb"
              name="categoryBase"
              title="Category Base"
              placeholder="Category Base"
              autoComplete="off"
              value={params.categoryBase}
              onChange={(e) => {
                handleInputs(e);
                getCategory(e);
              }}
            />
            <ul className="autocompletetext">
              {autoText.map((val, i) => {
                return (
                  <li
                    key={i}
                    onClick={(e) => {
                      params.categoryBase = e.target.innerText;
                    }}
                  >
                    {val.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <button disabled={isDisabled} onClick={onPress}>
            Submit
          </button>
        </div>
      </AdminPostPage>
    </AdminPage>
  );
}
