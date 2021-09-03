import dbConnect from "@/utils/dbConnect";
const authenticate = require("@/middleware/authenticate");
const handler = async (req, res) => {
  const { id } = req.query;
  const { method } = req;
  if (method === "DELETE") {
    const User = require("@/models/user");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        User.findById(id)
          .then((user) => {
            user.remove().then(() => {
              res.status(200).json({ success: true });
              res.end();
              return resolve();
            });
          })
          .catch((err) => {
            res.status(404).json({ success: false });
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

export default authenticate(handler, "DELETE");
