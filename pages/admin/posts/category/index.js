import React, { useState } from "react";
import AdminPage from "@/components/AdminPage";
import AdminPostPage from "@/components/AdminPostPage";
import send_admin from "@/utils/send_admin";
export default function Category() {
  const [params, setParams] = useState({
    name: "",
    addType: "Category",
  });
  const [isDisabled, setDisabled] = useState(false);
  const onPress = () => {
    if (params.name.length < 2) {
      alert(`Name should be more than 2 characters`);
      return;
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
        <h1>Category</h1>
        <div className="postsInputs">
          <input
            type="text"
            name="name"
            placeholder="Name"
            title="Name"
            value={params.name}
            onChange={(e) => {
              setParams({ ...params, [e.target.name]: e.target.value });
            }}
          />
          <button disabled={isDisabled} onClick={onPress}>
            Submit
          </button>
        </div>
      </AdminPostPage>
    </AdminPage>
  );
}
