import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Category = require("@/models/category");
    await dbConnect();
    if (!req.body.pageNum) {
      req.body.pageNum = 0;
    }
    return new Promise((resolve) => {
      try {
        if (req.body.type === "Category") {
          Category.find()
            .sort({ date: -1 })
            .skip(req.body.pageNum * 20)
            .limit(20)
            .then((cate) => {
              res.status(200).json(cate);
              res.end();
              return resolve();
            });
        } else if (req.body.name) {
          const reg = new RegExp(req.body.name, "ig");
          Category.find({ name: reg })
            .sort({ date: -1 })
            .limit(20)
            .then((cate) => {
              res.status(200).json(cate);
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
