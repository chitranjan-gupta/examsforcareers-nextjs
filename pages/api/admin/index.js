import dbConnect from "@/utils/dbConnect";
import Cookies from "cookies";
const bcrypt = require("bcryptjs");
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Admin = require("@/models/admin");
    await dbConnect();
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return new Promise((resolve) => {
          res
            .status(400)
            .json({ error: "Email or Password Should Not Be Empty" });
          res.end();
          return resolve();
        });
      }
      const adminLogin = await Admin.findOne({ email: email });
      if (adminLogin) {
        const isMatch = await bcrypt.compare(password, adminLogin.password);
        if (!isMatch) {
          return new Promise((resolve) => {
            res.status(400).json({ error: "Invalid Password" });
            res.end();
            return resolve();
          });
        } else {
          const token = await adminLogin.generateAuthToken();
          const cookies = new Cookies(req, res);
          let hourstoexpire = 2;
          cookies.set("adtoken", token, {
            expires: new Date(
              new Date().setHours(new Date().getHours() + hourstoexpire)
            ),
            httpOnly: true,
          });
          return new Promise((resolve) => {
            res.status(200).json({ message: "Admin Signin successfully" });
            res.end();
            return resolve();
          });
        }
      } else {
        return new Promise((resolve) => {
          res.status(404).json({ error: "Admin Not Found" });
          res.end();
          return resolve();
        });
      }
    } catch (err) {
      return new Promise((resolve) => {
        res.status(500).json([{ message: "Error In Server" }]);
        res.end();
        return resolve();
      });
    }
  } else {
    return new Promise((resolve) => {
      res.status(405).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
}
