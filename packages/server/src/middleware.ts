// to use shield see video https://www.youtube.com/watch?v=Jwz08YT8hbw minute 10 or so

const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.session.userId) {
    // user is not logged in
    throw new Error('not authenticated from graphql middleware');
  }

  return resolve(parent, args, context, info);
};

export const middleware = {
  Mutation: {
    createListing: isAuthenticated,
    deleteListing: isAuthenticated
  }
};
