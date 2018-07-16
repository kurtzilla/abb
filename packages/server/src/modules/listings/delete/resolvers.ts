import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../entity/Listing';

export const resolvers: ResolverMap = {
  Mutation: {
    delete: async (_, { id }, { session }) => {
      if (!session.userId) {
        throw new Error('not authd');
      }

      const listing = await Listing.findOne({ where: { id } });

      if (!listing) {
        throw new Error('does not exist');
      }

      if (session.userId !== listing.userId) {
        throw new Error('not authd - not owner'); // TODO log this as a security error
      }

      await Listing.remove(listing);
      // await Listing.delete({ id });

      return true;
    }
  }
};
