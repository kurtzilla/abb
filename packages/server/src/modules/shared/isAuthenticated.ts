import { Session } from '../../types/graphql-utils';

export const isAuthenticated = (session: Session) => {
  if (!session.userId) {
    throw new Error('not authenticated');
  }
};
