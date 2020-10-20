import { Cat } from "./models/Cat";
import { Product } from "./models/Product";
import { WhiteWine } from "./models/WhiteWine";

export const resolvers = {
  Query: {
    products: async () => {
      //let products = await Product.find({}).skip(2).limit(4).exec()
      let products = await Product.find({Volum: {$ne: "0,00"}}).limit(10).exec()
      return products
    },
    startProducts: async (_ :any, { startIndex }: any) => {
      //let products = await Product.find({}).skip(2).limit(4).exec()
      let products = await Product.find({Volum: {$ne: "0,00"}}).skip(startIndex).limit(20).exec()
      return products
    },
    whiteWines: async () => {
      let whiteWines = await WhiteWine.find({Varetype: "Hvitvin"}).limit(10).exec()
      return whiteWines
    },
    singleProduct: async (_ :any, { productNumber }: any) => await Product.find({Varenummer: productNumber}),
    searchProducts: async (_ :any, { searchSequence }: any) => await Product.find({Varenavn: { "$regex": searchSequence, "$options": "i" }}).limit(200),
    filterProducts: async (_ :any, { varetyper }: any) => await Product.find({Varetype: {"$in": varetyper }}).limit(200),
  },

  /*
  Mutation: {
    createProduct: async (_: any,  Varenavn: String ) => {
      const product = new Product({ Varenavn });
      await product.save();
      return product;
    },
  },
  */
};
