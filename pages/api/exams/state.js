import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const State = require("@/models/state");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        if (req.body.type === "State") {
          State.find()
            .sort({ date: -1 })
            .then((exam) => {
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
