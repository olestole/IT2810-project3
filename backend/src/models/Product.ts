import mongoose, { Schema, Document } from "mongoose";

interface InterfaceProduct extends Document {
  Varenavn: string;
  Varenummer: string;
  Varetype: string;
  Volum: number;
  Pris: number;
  Produsent: string;
  Land: string;
}

const ProductSchema = new Schema({
  Varenavn: String,
  Varenummer: String,
  Varetype: String,
  Volum: Number,
  Pris: Number,
  Produsent: String,
  Land: String,
});

export const Product = mongoose.model<InterfaceProduct>(
  "Product",
  ProductSchema,
  "updated_assortment"
);
