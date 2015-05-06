import mongoose from "mongoose/lib/browser";
const Schema = mongoose.Schema;

const CountSchema = new Schema({
  value: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now },
});

export default CountSchema;

