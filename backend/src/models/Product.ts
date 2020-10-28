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

// ProductSchema.query.byType = function (type: string) {
//   return this.where({
//     Varetype: new RegExp(type, "i"),
//   });
// };

export const Product = mongoose.model<
  InterfaceProduct,
  mongoose.Model<InterfaceProduct, typeof productQueryHelpers>
>("Product", ProductSchema, "assortment");

// let animal2QueryHelpers = {
//   byName<Q extends mongoose.DocumentQuery<any, Animal2>>(this: Q, name: string) {
//     return this.where({ name: new RegExp(name, 'i') });
//   }
// };
// animal2Schema.query = animal2QueryHelpers;
// var Animal2 = mongoose.model<Animal2, mongoose.Model<Animal2, typeof animal2QueryHelpers>>('Animal', animal2Schema);
// Animal2.find().byName('fido').exec(function(err, animals) {
//   console.log(animals);
// });
// Animal2.findOne().byName('fido').exec(function(err, animal) {
//   console.log(animal);
// });
