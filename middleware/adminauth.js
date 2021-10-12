import dbConnect from "@/utils/dbConnect";
const jwt = require("jsonwebtoken");
const auth = (handler, meth) => {
  return async (req, res) => {
    const { method } = req;
    if (method !== meth) {
      return new Promise((resolve) => {
        res.status(405).json({ message: "Method Not Allowed" });
        res.end();
        return resolve();
      });
    }
    try {
      const Admin = require("@/models/admin");
      const token = req.cookies.adtoken;
      if (!token) {
        return new Promise((resolve) => {
          res.status(401).json({ message: "Unauthorized:No token provided" });
          res.end();
          return resolve();
        });
      }
      await dbConnect();
      const verifyToken = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
      const admin = await Admin.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (!admin) {
        return new Promise((resolve) => {
          res.status(404).json({ message: "No Admin Found" });
          res.end();
          return resolve();
        });
      }
      let Adminuser = {
        name: admin.name,
      };
      req.admin = Adminuser;
      return handler(req, res);
    } catch (err) {
      return new Promise((resolve) => {
        res.status(500).json({ message: "Error in Admin Auth Server" });
        res.end();
        return resolve();
      });
    }
  };
};

export default auth;
