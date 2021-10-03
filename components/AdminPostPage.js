import React from "react";
import { useRouter } from "next/router";
export default function AdminPostPage(props) {
  const router = useRouter();
  function goTo(link) {
    router.push(`/admin/posts/${link}`);
  }
  return (
    <div className="AdminPostPage">
      <section className="AdminPostAdd">
        <div className="AdminPostAddButton">
          <button>+</button>
        </div>
        <div className="AdminPostAddOptions">
          <div
            onClick={() => {
              goTo("update");
            }}
          >
            <p>Update</p>
            <p>U</p>
          </div>
          <div
            onClick={() => {
              goTo("admit");
            }}
          >
            <p>Admit</p>
            <p>A</p>
          </div>
          <div
            onClick={() => {
              goTo("result");
            }}
          >
            <p>Result</p>
            <p>R</p>
          </div>
          <div
            onClick={() => {
              goTo("exam");
            }}
          >
            <p>Exam</p>
            <p>E</p>
          </div>
          <div
            onClick={() => {
              goTo("detail");
            }}
          >
            <p>Detail</p>
            <p>D</p>
          </div>
          <div
            onClick={() => {
              goTo("category");
            }}
          >
            <p>Category</p>
            <p>C</p>
          </div>
        </div>
      </section>
      <section className="postsInputsContent">{props.children}</section>
    </div>
  );
}
