import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Signout() {
  const history = useRouter();
  useEffect(() => {
    fetch("/api/users/signout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        history.push("/sign_in");
      })
      .catch((err) => console.log(err));
  });
  return <></>;
}

export default Signout;
