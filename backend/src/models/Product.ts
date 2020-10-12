import mongoose, { Schema, Document } from "mongoose";

interface InterfaceProduct extends Document {
  Varenavn: string,
  Volum: string,
  Pris: string,
}

const ProductSchema = new Schema({
  Varenavn: String,
  Volum: String,
  Pris: String,
});

export const Product = mongoose.model<InterfaceProduct>("Product", ProductSchema, "assortment");