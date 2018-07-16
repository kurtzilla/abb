// to use shield see video https://www.youtube.com/watch?v=Jwz08YT8hbw minute 10 or so
import { rule, shield } from 'graphql-shield';

const isAuthenticated = rule()((_: any, __: any, context: any) => {
  return !!context.session.userId;
});

export const middlewareShield = shield({
  Mutation: {
    createListing: isAuthenticated,
    deleteListing: isAuthenticated
  }
});
