import { AuthenticationError } from "apollo-server-express";
import { Cat } from "./models/Cat";
import { Product } from "./models/Product";
import { WhiteWine } from "./models/WhiteWine";

import withAuth from "graphql-auth";
// import { Review } from "./models/User";
import { IReview, IReviewResponse, Review } from "./models/Review";

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
    singleProduct: async (_: any, { productNumber }: any) => {
      // if (!isAuthenticated) {
      //   throw new AuthenticationError("Not logged in!");
      // }
      return (await Product.find({ Varenummer: productNumber })).length > 0
        ? (await Product.find({ Varenummer: productNumber }))[0]
        : null;
    },
    // singleProduct: withAuth(async (_: any, { productNumber }: any) => {
    //   // if (!isAuthenticated) {
    //   //   throw new AuthenticationError("Not logged in!");
    //   // }
    //   return (await Product.find({ Varenummer: productNumber })).length > 0
    //     ? (await Product.find({ Varenummer: productNumber }))[0]
    //     : null;
    // }),
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
    reviews: async (_: any, { varenummer }: any) =>
      await Review.find({
        varenummer: varenummer,
      }),

    searchProducts: async (_: any, { searchSequence }: any) =>
      await Product.find({
        Varenavn: { $regex: searchSequence, $options: "i" },
      }).limit(200),
    typeProduct: async (_: any, { type }: any) =>
      await Product.find().byType(type),
    nameProduct: async (_: any, { name }: any) =>
      await Product.find().byName(name),
  },

  Mutation: {
    addReview: async (_: any, { review }: any) => {
      const newReview = new Review({
        userEmail: review.userEmail,
        varenummer: review.varenummer,
        title: review.title,
        description: review.description,
        rating: review.rating,
      }) as IReview;

      try {
        await newReview.save();
        return {
          code: "200",
          success: true,
          message: "Successfully added a review",
          title: review.title,
          user: review.userEmail,
        } as IReviewResponse;
      } catch (error) {
        return {
          code: "400",
          success: false,
          message: error,
          title: "",
          user: "",
        } as IReviewResponse;
      }
    },
    // helloWorld: (_: any, { hello }: any) => {
    //   return hello;

    //   return new Number(123);

    //   const review = new Review({
    //     user: "Ole August",
    //     title: "Fett",
    //     description: "Nice beer",
    //     rating: 3,
    //   });
    //   return review;
    // },
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
