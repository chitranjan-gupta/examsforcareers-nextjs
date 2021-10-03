export default async function send_admin(data) {
  const login = await fetch("/api/admin/exams/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (login.status === 200) {
    return true;
  } else {
    return false;
  }
}
