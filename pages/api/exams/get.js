import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Detail = require("@/models/details");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        if (req.body.abbreviation) {
          const abbreviation = req.body.abbreviation.trim();
          Detail.find({ abbreviation: abbreviation }).then((exam) => {
            res.status(200).json(exam);
            res.end();
            return resolve();
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
      res.status(405).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
}
