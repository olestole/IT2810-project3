import mongoose, { Schema, Document } from "mongoose";

interface ICat extends Document {
  name: string;
  color: string;
}

const CatSchema = new Schema({
  name: String,
  color: String
});

export const Cat = mongoose.model<ICat>("Cat", CatSchema);
