const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const StateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.State || mongoose.model("State", StateSchema);
