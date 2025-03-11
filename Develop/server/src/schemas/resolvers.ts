import { GraphQLContext } from '../types/GraphQLContext'; // Ensure you define this type
import User, { IUser } from '../models/User';
import { signToken } from '../services/auth';

export const resolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    login: async (_: unknown, { email, password }: { email: string; password: string }) => {
      const user: IUser | null = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (
      _: unknown,
      { username, email, password }: { username: string; email: string; password: string }
    ) => {
      const user: IUser = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (_: unknown, { input }: { input: any }, context: GraphQLContext) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: input } },
        { new: true }
      );
    },

    removeBook: async (_: unknown, { bookId }: { bookId: string }, context: GraphQLContext) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};
