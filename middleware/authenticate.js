import dbConnect from "@/utils/dbConnect";
const jwt = require("jsonwebtoken");
const authenticate = (handler, meth) => {
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
      const User = require("@/models/user");
      const token = req.cookies.jwtoken;
      if (!token) {
        return new Promise((resolve) => {
          res.status(401).json({ message: "Unauthorized:No token provided" });
          res.end();
          return resolve();
        });
      }
      await dbConnect();
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const WUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (!WUser) {
        return new Promise((resolve) => {
          res.status(404).json({ message: "No User Found" });
          res.end();
          return resolve();
        });
      }
      var user = {
        name: WUser.name,
        email: WUser.email,
      };
      req.user = user;
      return handler(req, res);
    } catch (err) {
      console.log(err);
      return new Promise((resolve) => {
        res.status(500).json({ message: "Error In Server Auth" });
        res.end();
        return resolve();
      });
    }
  };
};

module.exports = authenticate;
