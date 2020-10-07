import { Cat } from "./models/Cat";

export const resolvers = {
  Query: {
    hello: () => "HALLA BRO",
    cats: () => Cat.find(),
    age: () => 123,
    ingredients: (_: any, { ingredient }: any) => {
      const ingredients = ["tomato", "bacon", "broccoli"];
      const a = ingredients.find((item) => item === ingredient);
      return a ? a : "No such item";
    },
  },

  Mutation: {
    createCat: async (_: any, { name }: any) => {
      const kitty = new Cat({ name });
      await kitty.save();
      return kitty;
    },
  },
};
