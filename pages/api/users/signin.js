import dbConnect from "@/utils/dbConnect";
import Cookies from "cookies";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const User = require("@/models/user");
    const bcrypt = require("bcryptjs");
    await dbConnect();
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return new Promise((resolve) => {
          res
            .status(400)
            .json({ error: "Email Or Should Should Not Be Empty" });
          res.end();
          return resolve();
        });
      }
      const userLogin = await User.findOne({ email: email });
      if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
          return new Promise((resolve) => {
            res.status(400).json({ error: "Password wrong" });
            res.end();
            return resolve();
          });
        } else {
          const token = await userLogin.generateAuthToken();
          const cookies = new Cookies(req, res);
          let hourstoexpire = 5;
          cookies.set("jwtoken", token, {
            expires: new Date(
              new Date().setHours(new Date().getHours() + hourstoexpire)
            ),
            httpOnly: true,
          });
          return new Promise((resolve) => {
            res.status(200).json({ message: "User Signin successfully" });
            res.end();
            return resolve();
          });
        }
      } else {
        return new Promise((resolve) => {
          res.status(404).json({ error: "No User Found" });
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
