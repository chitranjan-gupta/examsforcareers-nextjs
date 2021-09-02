import dbConnect from "../../../../utils/dbConnect";
import auth from "../../../../middleware/adminauth";
const handler = async (req, res) => {
  const { id } = req.query;
  const { method } = req;
  if (method === "GET") {
    const Exam = require("../../../../models/exam");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        Exam.findById(id)
          .then((user) => {
            res.status(200).json(user);
            res.end();
            return resolve();
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
      res.status(401).json({ message: "Not Authorized" });
      res.end();
      return resolve();
    });
  }
};
export default auth(handler, "GET");
