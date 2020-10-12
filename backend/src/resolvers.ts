import { Cat } from "./models/Cat";
import { Product } from "./models/Product";
import { WhiteWine } from "./models/WhiteWine";



export const resolvers = {
  Query: {
    products: async () => {
      let products = await Product.find({}).skip(2).limit(4).exec()
      return products
    },
    whiteWines: async () => {
      let whiteWines = await WhiteWine.find({Varetype: "Hvitvin"}).limit(10).exec()
      return whiteWines
    }
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
