import { Cat } from "./models/Cat";
import { Product } from "./models/Product";


export const resolvers = {
  Query: {
    hello: () => "HALLA BRO",
    cats: async () => await Cat.find().exec(),
    age: () => 123,
    ingredients: (_: any, { ingredient }: any) => {
      const ingredients = ["tomato", "bacon", "broccoli"];
      const a = ingredients.find((item) => item === ingredient);
      return a ? a : "No such item";
    },
    yo: () => "YOOOO BRO",
    products: async () => await Product.find().exec()
  },
  
  Mutation: {
    createProduct: async (_: any,  Varenavn: String ) => {
      const product = new Product({ Varenavn });
      await product.save();
      return product;
    },
  },
  
};
