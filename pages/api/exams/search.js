import dbConnect from "../../../utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Exam = require("../../../models/exam");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        if (req.body.abbreviation) {
          var result = [];
          var reg = new RegExp(req.body.abbreviation.trim(), "i");
          var exam = Exam.find({ abbreviation: reg })
            .sort({ updated_at: -1 })
            .sort({ created_at: -1 })
            .limit(20);
          exam.exec(function (err, data) {
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
                  result.push(obj);
                });
                res.status(200).json(result);
                res.end();
                return resolve();
              } else {
                exam = "";
                res.status(404).json({ message: "Not Found" });
                res.end();
                return resolve();
              }
            }
          });
        } else {
          res.status(404).json({ message: "Not Found" });
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
      res.status(401).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
}
