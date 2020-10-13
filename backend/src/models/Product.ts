import mongoose, { Schema, Document } from "mongoose";

interface InterfaceProduct extends Document {
  Varenavn: string,
  Varenummer: string,
  Varetype: string,
  Volum: string,
  Pris: string,
  Produsent: string,
  Land: string,
}

const ProductSchema = new Schema({
  Varenavn: String,
  Varenummer: String,
  Varetype: String,
  Volum: String,
  Pris: String,
  Produsent: String,
  Land: String,
});

export const Product = mongoose.model<InterfaceProduct>("Product", ProductSchema, "assortment");