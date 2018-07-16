import { ResolverMap } from "../../../types/graphql-utils";
import { Mailq } from "../../../entity/Mailq";

export const resolvers: ResolverMap = {
  Query: {
    allMailQs: () => Mailq.find({ order: { dtToProcess: 'DESC' } })
  }
};
