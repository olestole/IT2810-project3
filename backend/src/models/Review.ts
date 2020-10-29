import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userEmail: string;
  varenummer: string;
  title: string;
  description: string;
  rating: number;
}

export interface IReviewResponse {
  code: string;
  success: boolean;
  message: string;
  user: string;
  title: string;
}

const ReviewSchema = new Schema({
  userEmail: String,
  varenummer: String,
  title: String,
  description: String,
  rating: Number,
});

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
