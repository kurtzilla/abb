import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../entity/Listing';
// import { isAuthenticated } from '../../shared/isAuthenticated';

export const resolvers: ResolverMap = {
  Mutation: {
    deleteListing: async (_, { id }, { session }) => {
      // isAuthenticated(session);

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
