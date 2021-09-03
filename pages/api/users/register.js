import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const User = require("@/models/user");
    await dbConnect();
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        cemail: req.body.cemail,
        phone: req.body.phone,
        cphone: req.body.cphone,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });
      await newUser.save();
    }
    return new Promise((resolve) => {
      try {
        if (user) {
          res.status(422).json({ message: "Email Already Exists" });
          res.end();
          return resolve();
        } else {
          res.status(200).json({ message: "Registered" });
          res.end();
          return resolve();
        }
      } catch (err) {
        res.status(500).json([{ message: "Error In Server" }]);
        res.end();
        return resolve();
      }
    });
  } else {
    return new Promise((resolve) => {
      res.status(405).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
}
