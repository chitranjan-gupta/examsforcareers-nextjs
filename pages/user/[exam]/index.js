/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import user from "@/images/user.svg";
import man from "@/images/girl.svg";
import mile from "@/images/mile.svg";
import Prize from "@/images/Prize.svg";

function UserChoice() {
  const [loading, setLoading] = useState(false);
  const [loginStatus, setStatus] = useState(false);
  const history = useRouter();
  var param;
  if (history.query.exam) {
    param = history.query.exam.trim().toUpperCase().replace(/_/g, " ");
  }
  const checkStatus = async () => {
    try {
      const res = await fetch("/api/users/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 401) {
        history.push("/sign_in");
        console.log(await res.json());
        return;
      }
      if (res.status === 500) {
        history.push("/sign_in");
        console.log(await res.json());
        return;
      }
      if (res.status === 200) {
        setStatus(true);
      }
      const data = await res.json();
      await submit(param);
    } catch (err) {
      console.log(err);
      history.push("/signin");
    }
  };
  const submit = async (data) => {
    var json = await fetch("/api/exams/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    });
    console.log(await json.json());
  };
  useEffect(() => {
    if (!loading) {
      checkStatus();
    }
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  if (false) {
    return (
      <div>
        <div className="Userhome">
          <div>
            <Image className="Userhome-bg" alt="" src={user} />
            <Image className="Userhome-man" alt="" src={man} />
            <Image className="Userhome-Prize" alt="" src={Prize} />
            <div className="Userhome-mile mile-one">
              <Image className="" alt="" src={mile} />
              <label className="">{param}</label>
            </div>
            <div className="Userhome-mile mile-two">
              <Image className="" alt="" src={mile} />
              <label className="">12th Science(Math)</label>
            </div>
            <div className="Userhome-mile mile-three">
              <Image className="" alt="" src={mile} />
              <label className="">10th</label>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1>In Developement</h1>
      </>
    );
  }
}

export default UserChoice;
