import dbConnect from "../../../utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Update = require("../../../models/updates");
    const Admit = require("../../../models/admit");
    const Result = require("../../../models/result");
    await dbConnect();
    return new Promise((resolve) => {
      try {
        if (req.body.type) {
          switch (req.body.type.trim()) {
            case "New_Updates": {
              Update.find()
                .sort({ date: -1 })
                .limit(20)
                .then((update) => {
                  var arr = update.map((upd) => {
                    return {
                      _id: upd._id,
                      name: upd.name,
                    };
                  });
                  res.status(200).json(arr);
                  return resolve();
                });
              break;
            }
            case "Admit_Card": {
              Admit.find()
                .sort({ date: -1 })
                .limit(20)
                .then((admit) => {
                  var arr = admit.map((adm) => {
                    return {
                      _id: adm._id,
                      name: adm.name,
                    };
                  });
                  res.status(200).json(arr);
                  return resolve();
                });
              break;
            }
            case "Result": {
              Result.find()
                .sort({ date: -1 })
                .limit(20)
                .then((result) => {
                  var arr = result.map((re) => {
                    return {
                      _id: re._id,
                      name: re.name,
                    };
                  });
                  res.status(200).json(arr);
                  return resolve();
                });
              break;
            }
            default: {
              res.status(200).json([{ message: "Getting Updates" }]);
              res.end();
              return resolve();
            }
          }
        } else {
          res.status(404).json([{ message: "Not Found" }]);
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
