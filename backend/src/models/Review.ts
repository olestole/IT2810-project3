import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  user: string;
  title: string;
  description: string;
  rating: number;
}

const ReviewSchema = new Schema({
  user: String,
  title: String,
  description: String,
  rating: Number,
});

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
