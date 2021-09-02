const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const ResultSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  isAvail: {
    type: Boolean,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

module.exports =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);
