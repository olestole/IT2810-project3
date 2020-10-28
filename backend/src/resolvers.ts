import { AuthenticationError } from "apollo-server-express";
import { Product } from "./models/Product";
import { WhiteWine } from "./models/WhiteWine";

import withAuth from "graphql-auth";

export const resolvers = {
  Query: {
    products: async (
      _: any,
      {
        searchSequence,
        varetyper,
        prisgt,
        prisls,
        volumgt,
        volumls,
        index,
      }: any
    ) =>
      await Product.find({
        Varenavn: { $regex: searchSequence, $options: "i" },
        Varetype: { $in: varetyper },
        Pris: { $gte: prisgt, $lte: prisls },
        Volum: { $gte: volumgt, $lte: volumls },
      })
        .sort({ Varenavn: 1 })
        .skip(index)
        .limit(20),
    startProducts: async (_: any, { startIndex }: any) => {
      //let products = await Product.find({}).skip(2).limit(4).exec()
      let products = await Product.find({ Volum: { $ne: 0.0 } })
        .sort({ Varenavn: 1 })
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
    // singleProduct: async (_: any, { productNumber }: any) => {
    //   // if (!isAuthenticated) {
    //   //   throw new AuthenticationError("Not logged in!");
    //   // }
    //   return (await Product.find({ Varenummer: productNumber })).length > 0
    //     ? (await Product.find({ Varenummer: productNumber }))[0]
    //     : null;
    // },
    // singleProduct: async (_ :any, { productNumber }: any) => await Product.find({Varenummer: productNumber}),
    searchProducts: async (_: any, { searchSequence, index }: any) =>
      await Product.find({
        Varenavn: { $regex: searchSequence, $options: "i" },
        Volum: { $ne: 0.0 },
      })
        .sort({ Varenavn: 1 })
        .skip(index)
        .limit(20),
    filterProducts: async (
      _: any,
      { varetyper, prisgt, prisls, volumgt, volumls, index }: any
    ) =>
      await Product.find({
        Varetype: { $in: varetyper },
        Pris: { $gte: prisgt, $lte: prisls },
        Volum: { $gte: volumgt, $lte: volumls },
      })
        .sort({ Varenavn: 1 })
        .skip(index)
        .limit(20),
    singleProduct: async (_: any, { productNumber }: any) => {
      // if (!isAuthenticated) {
      //   throw new AuthenticationError("Not logged in!");
      // }
      return (await Product.find({ Varenummer: productNumber })).length > 0
        ? (await Product.find({ Varenummer: productNumber }))[0]
        : null;
    },
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
    // searchProducts: async (_: any, { searchSequence }: any) =>
    //   await Product.find({
    //     Varenavn: { $regex: searchSequence, $options: "i" },
    //   }).limit(200),

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
