import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Exam = require("@/models/exam");
    const Update = require("@/models/updates");
    const Admit = require("@/models/admit");
    const Result = require("@/models/result");
    await dbConnect();
    if (!req.body.pageNum) {
      req.body.pageNum = 0;
    }
    async function ExamSearch(reg, ski) {
      const exam = await Exam.find({ abbreviation: reg })
        .sort({ updated_at: -1 })
        .sort({ created_at: -1 })
        .skip(ski * 5)
        .limit(5);
      return exam;
    }
    async function UpdateSearch(reg, ski) {
      const update = await Update.find({ name: reg })
        .sort({ updated_at: -1 })
        .sort({ created_at: -1 })
        .skip(ski * 5)
        .limit(5);
      return update;
    }
    async function AdmitSearch(reg, ski) {
      const admit = await Admit.find({ name: reg })
        .sort({ updated_at: -1 })
        .sort({ created_at: -1 })
        .skip(ski * 5)
        .limit(5);
      return admit;
    }
    async function ResultSearch(reg, ski) {
      const result = await Result.find({ name: reg })
        .sort({ updated_at: -1 })
        .sort({ created_at: -1 })
        .skip(ski * 5)
        .limit(5);
      return result;
    }
    try {
      if (req.body.abbreviation) {
        let results = [];
        const reg = new RegExp(req.body.abbreviation.trim(), "ig");
        const exams = await ExamSearch(reg, req.body.pageNum);
        const updates = await UpdateSearch(reg, req.body.pageNum);
        const admits = await AdmitSearch(reg, req.body.pageNum);
        const result = await ResultSearch(reg, req.body.pageNum);
        if (exams.length >= 1) {
          exams.forEach((exa) => {
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
        }
        if (updates.length >= 1) {
          updates.forEach((exa) => {
            let obj = {
              id: exa._id,
              name: exa.name,
            };
            results.push(obj);
          });
        }
        if (admits.length >= 1) {
          admits.forEach((exa) => {
            let obj = {
              id: exa._id,
              name: exa.name,
            };
            results.push(obj);
          });
        }
        if (result.length >= 1) {
          result.forEach((exa) => {
            let obj = {
              id: exa._id,
              name: exa.name,
            };
            results.push(obj);
          });
        }
        return new Promise((resolve) => {
          if (results.length >= 1) {
            res.status(200).json(results);
            res.end();
            return resolve();
          } else {
            res.status(404).json({ message: "Not Found" });
            res.end();
            return resolve();
          }
        });
      }
    } catch (err) {
      return new Promise((resolve) => {
        res.status(500).json([{ message: "Error In Server" }]);
        res.end();
        return resolve();
      });
    }
  } else {
    return new Promise((resolve) => {
      res.status(405).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
}
