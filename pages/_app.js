import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@/styles/Loading.css";
import "@/styles/Admin.css";
import "@/styles/Home.css";
import "@/styles/Contact.css";
import "@/styles/Error.css";
import "@/styles/Signin.css";
import "@/styles/Signup.css";
import "@/styles/User.css";
import "@/styles/Details.css";
import "@/styles/Viewall.css";
import "@/styles/Open.css";
import "@/styles/Userhome.css";
import "@/styles/Adminposts.css";

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
