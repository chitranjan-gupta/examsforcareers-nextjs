import dbConnect from "@/utils/dbConnect";
import auth from "@/middleware/adminauth";
const handler = async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    const Contact = require("@/models/contact");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        Contact.find()
          .sort({ date: -1 })
          .then((contacts) => {
            res.status(200).json(contacts);
            res.end();
            return resolve();
          });
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
};
export default auth(handler, "GET");
