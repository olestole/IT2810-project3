import mongoose, { Schema, Document, DocumentQuery } from "mongoose";

interface InterfaceProduct extends Document {
  Varenavn: string;
  Varenummer: string;
  Varetype: string;
  Volum: number;
  Pris: number;
  Produsent: string;
  Land: string;
  Farge: string;
  Lukt: string;
  Smak: string;
}

const ProductSchema = new Schema({
  Varenavn: String,
  Varenummer: String,
  Varetype: String,
  Volum: Number,
  Pris: Number,
  Produsent: String,
  Land: String,
  Farge: String,
  Lukt: String,
  Smak: String,
});

let productQueryHelpers = {
  byType(this: DocumentQuery<any, InterfaceProduct>, type: string) {
    return this.find().where({
      Varetype: new RegExp(type, "i"),
    });
  },
  byName(this: DocumentQuery<any, InterfaceProduct>, name: string) {
    return this.find().where({
      Varenavn: new RegExp(name, "i"),
    });
  },
};

ProductSchema.query = productQueryHelpers;

export const Product = mongoose.model<
  InterfaceProduct,
  mongoose.Model<InterfaceProduct, typeof productQueryHelpers>
>("Product", ProductSchema, "assortment");
