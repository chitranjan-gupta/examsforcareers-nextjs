/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageNumber from "@/components/PageNumber";
import Footer from "@/components/Footer";

function State_Exams() {
  const [loading, setLoading] = useState(false);
  if (typeof window !== "undefined") {
    document.title = "State Exams";
  }
  const [states, setState] = useState([]);
  const getState = async () => {
    const res = await fetch("/api/exams/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "State" }),
    });
    setState(await res.json());
  };
  useEffect(() => {
    if (!loading) {
      getState();
    }
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  return (
    <div>
      <div className="card-container">
        {states.map((state) => {
          return (
            <div className="card" key={state._id}>
              <h1>
                <Link href={`/state_exams/${state.name.replace(/ /g, "_")}`}>
                  {state.name}
                </Link>
              </h1>
            </div>
          );
        })}
      </div>
      <PageNumber />
      <Footer />
    </div>
  );
}

export default State_Exams;
