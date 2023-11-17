import { Schema, model } from "mongoose";

const journalSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = model("Journal", journalSchema);

export default Journal;