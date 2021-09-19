import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Exam = require("@/models/exam");
    const Update = require("@/models/updates");
    const Admit = require("@/models/admit");
    const Result = require("@/models/result");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        if (req.body.abbreviation) {
          let results = [];
          let exam, update, admit, result, reg;
          reg = new RegExp(req.body.abbreviation.trim(), "ig");
          exam = Exam.find({ abbreviation: reg })
            .sort({ updated_at: -1 })
            .sort({ created_at: -1 })
            .limit(10);
          update = Update.find({ name: reg })
            .sort({ updated_at: -1 })
            .sort({ created_at: -1 })
            .limit(10);
          admit = Admit.find({ name: reg })
            .sort({ updated_at: -1 })
            .sort({ created_at: -1 })
            .limit(10);
          result = Result.find({ name: reg })
            .sort({ updated_at: -1 })
            .sort({ created_at: -1 })
            .limit(10);
          exam.exec((err, data) => {
            if (!err) {
              if (data && data.length && data.length > 0) {
                data.forEach((exa) => {
                  let obj = {
                    id: exa._id,
                    abbreviation: exa.abbreviation,
                    categoryBase: exa.categoryBase,
                  };
                  if (exa.categoryBase === "Board Exams") {
                    obj.categoryBase = "state exams/" + exa.categoryMain;
                  }
                  results.push(obj);
                });
                res.status(200).json(results);
                res.end();
                return resolve();
              } else {
                res.status(404).json([{ message: "Not Found" }]);
                res.end();
                return resolve();
              }
            }
          });
          update.exec((err, data) => {
            if (!err) {
              if (data && data.length && data.length > 0) {
                data.forEach((exa) => {
                  let obj = {
                    id: exa._id,
                    name: exa.name,
                  };
                  results.push(obj);
                });
              }
            }
          });
          admit.exec((err, data) => {
            if (!err) {
              if (data && data.length && data.length > 0) {
                data.forEach((exa) => {
                  let obj = {
                    id: exa._id,
                    name: exa.name,
                  };
                  results.push(obj);
                });
              }
            }
          });
          result.exec((err, data) => {
            if (!err) {
              if (data && data.length && data.length > 0) {
                data.forEach((exa) => {
                  let obj = {
                    id: exa._id,
                    name: exa.name,
                  };
                  results.push(obj);
                });
              }
            }
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
