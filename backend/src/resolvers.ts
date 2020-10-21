import { AuthenticationError } from "apollo-server-express";
import { Cat } from "./models/Cat";
import { Product } from "./models/Product";
import { WhiteWine } from "./models/WhiteWine";

import withAuth from "graphql-auth";

export const resolvers = {
  Query: {
    products: async () => {
      //let products = await Product.find({}).skip(2).limit(4).exec()
      let products = await Product.find({ Volum: { $ne: "0,00" } })
        .limit(10)
        .exec();
      return products;
    },
    startProducts: async (_: any, { startIndex }: any) => {
      //let products = await Product.find({}).skip(2).limit(4).exec()
      let products = await Product.find({ Volum: { $ne: "0,00" } })
        .skip(startIndex)
        .limit(20)
        .exec();
      return products;
    },
    whiteWines: async () => {
      let whiteWines = await WhiteWine.find({ Varetype: "Hvitvin" })
        .limit(10)
        .exec();
      return whiteWines;
    },
    singleProduct: withAuth(async (_: any, { productNumber }: any) => {
      // if (!isAuthenticated) {
      //   throw new AuthenticationError("Not logged in!");
      // }
      return (await Product.find({ Varenummer: productNumber })).length > 0
        ? (await Product.find({ Varenummer: productNumber }))[0]
        : null;
    }),
    // singleProduct: async (
    //   _: any,
    //   { productNumber }: any,
    //   { isAuthenticated }: any
    // ) => {
    //   if (!isAuthenticated) {
    //     throw new AuthenticationError("Not logged in!");
    //   }
    //   return (await Product.find({ Varenummer: productNumber })).length > 0
    //     ? (await Product.find({ Varenummer: productNumber }))[0]
    //     : null;
    // },
    searchProducts: async (_: any, { searchSequence }: any) =>
      await Product.find({
        Varenavn: { $regex: searchSequence, $options: "i" },
      }).limit(200),
    typeProduct: async (_: any, { type }: any) =>
      await Product.find().byType(type),
    nameProduct: async (_: any, { name }: any) =>
      await Product.find().byName(name),
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
