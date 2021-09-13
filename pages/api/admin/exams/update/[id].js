import dbConnect from "@/utils/dbConnect";
import auth from "@/middleware/adminauth";
const handler = async (req, res) => {
  const { id } = req.query;
  const { method } = req;
  var Jsondata;
  var StatusCode;
  if (method === "PUT") {
    try {
      const Exam = require("@/models/exam");
      const Detail = require("@/models/details");
      const Update = require("@/models/updates");
      const Admit = require("@/models/admit");
      const Result = require("@/models/result");
      await dbConnect();
      switch (req.body.upType) {
        case "New_Exam": {
          //const data = req.body.data;
          // const result = await Exam.updateOne(
          //   { _id: id },
          //   {
          //     $set: {
          //       categoryMain: data,
          //     },
          //   },
          //   { upsert: true }
          // );
          Exam.findById(id).then((exam) => {
            Jsondata = JSON.stringify(exam);
            StatusCode = 200;
          });
          break;
        }
        case "New_Detail": {
          //const data = req.body.data;
          // const result = await Detail.updateOne(
          //   { _id: id },
          //   {
          //     $set: {
          //       categoryMain: data,
          //     },
          //   },
          //   { upsert: true }
          // );
          Detail.findById(id).then((detail) => {
            Jsondata = JSON.stringify(detail);
            StatusCode = 200;
          });
          break;
        }
        case "New_Updates": {
          //const data = req.body.data;
          // const result = await Update.updateOne(
          //   { _id: id },
          //   {
          //     $set: {
          //       categoryMain: data,
          //     },
          //   },
          //   { upsert: true }
          // );
          Update.findById(id).then((update) => {
            Jsondata = JSON.stringify(update);
            StatusCode = 200;
          });
          break;
        }
        case "Admit_Card": {
          //const data = req.body.data;
          // const result = await Admit.updateOne(
          //   { _id: id },
          //   {
          //     $set: {
          //       categoryMain: data,
          //     },
          //   },
          //   { upsert: true }
          // );
          Admit.findById(id).then((admit) => {
            Jsondata = JSON.stringify(admit);
            StatusCode = 200;
          });
          break;
        }
        case "Result": {
          //const data = req.body.data;
          //const result = await Result.updateOne(
          //   { _id: id },
          //   {
          //     $set: {
          //       categoryMain: data,
          //     },
          //   },
          //   { upsert: true }
          // );
          Result.findById(id).then((result) => {
            Jsondata = JSON.stringify(result);
            StatusCode = 200;
          });
          break;
        }
        default: {
          Jsondata = JSON.stringify({ message: "Waiting" });
          StatusCode = 200;
        }
      }
    } catch (err) {
      Jsondata = JSON.stringify({ message: "Error In Server" });
      StatusCode = 500;
    }
  } else {
    Jsondata = JSON.stringify({ message: "Method Not Allowed" });
    StatusCode = 405;
  }
  return new Promise((resolve) => {
    res.status(StatusCode).json(Jsondata);
    res.end();
    return resolve();
  });
};
export default auth(handler, "PUT");
