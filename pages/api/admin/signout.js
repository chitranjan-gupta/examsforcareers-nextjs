import Cookies from "cookies";
import dbConnect from "@/utils/dbConnect";
import auth from "@/middleware/adminauth";
const handler = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    try {
      const Admin = require("@/models/admin");
      const token = req.cookies.adtoken;
      await dbConnect();
      await Admin.updateOne(
        {
          name: req.admin.name,
          "tokens.token": token,
        },
        { $pull: { tokens: { token: { $in: [token] } } } }
      );
      return new Promise((resolve) => {
        const cookies = new Cookies(req, res);
        cookies.set("adtoken", token, {
          expires: new Date(0),
          httpOnly: true,
        });
        res.status(200).json({ message: "Log Out Successfully" });
        res.end();
        return resolve();
      });
    } catch (err) {
      console.log(err);
      return new Promise((resolve) => {
        res.status(500).json({ message: "Error In The Server" });
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
};

export default auth(handler, "POST");
