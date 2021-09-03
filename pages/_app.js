import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@/styles/loading.css";
import "@/styles/admin.css";
import "@/styles/home.css";
import "@/styles/contact.css";
import "@/styles/error.css";
import "@/styles/signin.css";
import "@/styles/signup.css";
import "@/styles/user.css";
import "@/styles/details.css";
import "@/styles/listbox.css";
import "@/styles/open.css";
import "@/styles/userhome.css";

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      console.log("[log] App Loaded");
      document.getElementById("Loading").style.display = "none";
      document.getElementById("App").style.display = "block";
    }, 3000);
  });
}

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
