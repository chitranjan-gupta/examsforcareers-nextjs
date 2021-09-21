import dbConnect from "@/utils/dbConnect";
import auth from "@/middleware/adminauth";
const handler = async (req, res) => {
  const { method } = req;
  var Jsondata;
  var StatusCode;
  if (method === "POST") {
    try {
      const Exam = require("@/models/exam");
      const Detail = require("@/models/details");
      const Update = require("@/models/updates");
      const Admit = require("@/models/admit");
      const Result = require("@/models/result");
      const Category = require("@/models/category");
      await dbConnect();
      switch (req.body.addType.trim()) {
        case "New_Exam": {
          const exam = await Exam.findOne({
            abbreviation: req.body.abbreviation,
          });
          if (exam) {
            Jsondata = JSON.stringify({ message: "Exam Already Exists" });
            StatusCode = 422;
          } else {
            const newExam = new Exam({
              name: req.body.name,
              abbreviation: req.body.abbreviation,
              link: req.body.link,
              logo: req.body.logo,
              categoryMain: req.body.categoryMain,
              categoryBase: req.body.categoryBase,
            });
            const newexam = await newExam.save();
            Jsondata = JSON.stringify(newexam);
            StatusCode = 200;
          }
          break;
        }
        case "New_Detail": {
          const detail = await Detail.findOne({
            abbreviation: req.body.abbreviation,
          });
          if (detail) {
            Jsondata = JSON.stringify({ message: "Exam Already Exists" });
            StatusCode = 422;
          } else {
            const newDetail = new Detail({
              name: req.body.name,
              abbreviation: req.body.abbreviation,
              link: req.body.link,
              logo: req.body.logo,
              intro: req.body.intro,
              type: req.body.type,
              duration: req.body.duration,
              times: req.body.times,
              eligibility: req.body.eligibility,
              language: req.body.language,
              wikipedia: req.body.wikipedia,
              regSdate: req.body.regSdate,
              regEdate: req.body.regEdate,
              lfeedate: req.body.lfeedate,
              admit: req.body.admit,
              examdate: req.body.examdate,
              genobcfee: req.body.genobcfee,
              scstfee: req.body.scstfee,
              phfee: req.body.phfee,
            });
            const newdetail = await newDetail.save();
            Jsondata = JSON.stringify(newdetail);
            StatusCode = 200;
          }
          break;
        }
        case "New_Updates": {
          const newUpdate = new Update({
            name: req.body.name,
            intro: req.body.intro,
            fee: req.body.fee,
            date: req.body.date,
            req: req.body.req,
            link: req.body.link,
          });
          const newupdate = await newUpdate.save();
          Jsondata = JSON.stringify(newupdate);
          StatusCode = 200;
          break;
        }
        case "Admit_Card": {
          const newAdmit = new Admit({
            name: req.body.name,
            intro: req.body.intro,
            date: req.body.date,
            isAvail: req.body.isAvail,
            link: req.body.link,
            note: req.body.note,
          });
          const newadmit = await newAdmit.save();
          Jsondata = JSON.stringify(newadmit);
          StatusCode = 200;
          break;
        }
        case "Result": {
          const newResult = new Result({
            name: req.body.name,
            intro: req.body.intro,
            date: req.body.date,
            isAvail: req.body.isAvail,
            link: req.body.link,
            note: req.body.note,
          });
          const newresult = await newResult.save();
          Jsondata = JSON.stringify(newresult);
          StatusCode = 200;
          break;
        }
        case "Category": {
          const newCategory = new Category({
            name: req.body.name,
          });
          const newcategory = await newCategory.save();
          Jsondata = JSON.stringify(newcategory);
          StatusCode = 200;
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
export default auth(handler, "POST");
