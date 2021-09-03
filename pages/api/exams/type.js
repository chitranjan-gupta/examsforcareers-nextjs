import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Update = require("@/models/updates");
    const Admit = require("@/models/admit");
    const Result = require("@/models/result");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        if (req.body.type) {
          switch (req.body.type.trim()) {
            case "New_Updates": {
              Update.find({ name: req.body.name.trim() }).then((update) => {
                res.status(200).json(update);
                res.end();
                return resolve();
              });
              break;
            }
            case "Admit_Card": {
              Admit.find({ name: req.body.name.trim() }).then((admit) => {
                res.status(200).json(admit);
                res.end();
                return resolve();
              });
              break;
            }
            case "Result": {
              Result.find({ name: req.body.name.trim() }).then((result) => {
                res.status(200).json(result);
                res.end();
                return resolve();
              });
              break;
            }
            default: {
              res.status(200).json({ message: "No Update" });
              res.end();
              return resolve();
            }
          }
        } else {
          res.status(404).json({ message: "Not Found" });
          res.end();
          return resolve();
        }
      } catch (err) {
        res.status(500).json({ message: "Error In The Server" });
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
