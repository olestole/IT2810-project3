import mongoose, { Schema, Document } from "mongoose";

interface Review extends Document {
  title: string;
  description: string;
  rating: number;
}

interface IUser extends Document {
  uid: string;
  name: string;
  reviews: Review[];
}

const UserSchema = new Schema({
  uid: String,
  name: String,
  reviews: [
    {
      title: String,
      description: String,
      rating: Number,
    },
  ],
});

export const Cat = mongoose.model<IUser>("User", UserSchema);
