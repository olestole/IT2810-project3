import mongoose, { Schema, Document } from "mongoose";

interface IWhiteWines extends Document {
  Varenavn: string,
  Volum: string,
  Pris: string,
}

const WhiteWineSchema = new Schema({
  Varenavn: String,
  Volum: String,  
  Pris: String,
  Lukt: String,
  Smak: String,
  Land: String,
  Distrikt: String,
});

export const WhiteWine = mongoose.model<IWhiteWines>("WhiteWine", WhiteWineSchema, "assortment");