import { AuthenticationError } from "apollo-server-express";
import { Product } from "./models/Product";
import { WhiteWine } from "./models/WhiteWine";
import withAuth from "graphql-auth";
import { IReview, IReviewResponse, Review } from "./models/Review";

export const resolvers = {
  Query: {
    products: async () => {
      let products = await Product.find().limit(10).exec();
      return products;
    },
    startProducts: async (_: any, { startIndex }: any) => {
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
    reviews: async (_: any, { varenummer }: any) =>
      await Review.find({
        varenummer: varenummer,
      }),
    typeProduct: async (_: any, { type }: any) =>
      await Product.find().byType(type),
    nameProduct: async (_: any, { name }: any) =>
      await Product.find().byName(name),
    personalReviews: async (_: any, { userEmail }: any) =>
      await Review.find({
        userEmail: userEmail,
      }),
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
  },
};
