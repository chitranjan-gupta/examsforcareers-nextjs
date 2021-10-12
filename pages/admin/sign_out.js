import React, { useEffect } from "react";
import { useRouter } from "next/router";
export default function SignOut() {
  const history = useRouter();
  useEffect(() => {
    fetch("/api/admin/signout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((val) => {
      if (val.status === 200) {
        history.push("/admin");
      } else if (val.status === 401) {
        history.push("/admin");
      } else if (val.status === 404) {
        history.push("/admin");
      }
    });
  }, []);
  return (
    <>
      <h1
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        See You!👋
      </h1>
    </>
  );
}
