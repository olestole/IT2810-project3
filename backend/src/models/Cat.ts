import mongoose, { Schema, Document } from "mongoose";

interface ICat extends Document {
  name: string;
}

const CatSchema = new Schema({
  name: String,
});

export const Cat = mongoose.model<ICat>("Cat", CatSchema);
