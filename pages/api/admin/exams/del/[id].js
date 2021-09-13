import dbConnect from "@/utils/dbConnect";
import auth from "@/middleware/adminauth";
const handler = async (req, res) => {
  const { id } = req.query;
  const { method } = req;
  if (method === "DELETE") {
    const Exam = require("@/models/exam");
    const Detail = require("@/models/details");
    const Update = require("@/models/updates");
    const Admit = require("@/models/admit");
    const Result = require("@/models/result");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        switch (req.body.deType) {
          case "New_Exam": {
            Exam.findById(id)
              .then((exam) => {
                exam.remove().then(() => {
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
            break;
          }
          case "New_Detail": {
            Detail.findById(id)
              .then((exam) => {
                exam.remove().then(() => {
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
            break;
          }
          case "New_Updates": {
            Update.findById(id)
              .then((exam) => {
                exam.remove().then(() => {
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
            break;
          }
          case "Admit_Card": {
            Admit.findById(id)
              .then((exam) => {
                exam.remove().then(() => {
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
            break;
          }
          case "Result": {
            Result.findById(id)
              .then((exam) => {
                exam.remove().then(() => {
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
            break;
          }
          default: {
            res.status(200).json({ message: "Waiting" });
            res.end();
            return resolve();
          }
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
};
export default auth(handler, "DELETE");
