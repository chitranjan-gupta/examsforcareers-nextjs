import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Exam = require("@/models/exam");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        if (req.body.categoryMain && req.body.categoryBase) {
          const categoryMain = req.body.categoryMain.trim();
          const categoryBase = req.body.categoryBase.trim();
          Exam.find({
            categoryMain: categoryMain,
            categoryBase: categoryBase,
          }).then((exam) => {
            res.status(200).json(exam);
            res.end();
            return resolve();
          });
        } else if (req.body.categoryMain) {
          const categoryMain = req.body.categoryMain.trim();
          Exam.find({ categoryMain: categoryMain }).then((exam) => {
            res.status(200).json(exam);
            res.end();
            return resolve();
          });
        } else if (req.body.categoryBase) {
          const categoryBase = req.body.categoryBase.trim();
          Exam.find({ categoryBase: categoryBase }).then((exam) => {
            res.status(200).json(exam);
            res.end();
            return resolve();
          });
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
