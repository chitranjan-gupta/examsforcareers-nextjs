const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  messages: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
