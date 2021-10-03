import React from "react";
import AdminPage from "@/components/AdminPage";
import AdminPostPage from "@/components/AdminPostPage";
export default function Messages() {
  return (
    <AdminPage redTo="posts">
      <AdminPostPage></AdminPostPage>
    </AdminPage>
  );
}
