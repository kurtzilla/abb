import * as bcrypt from 'bcryptjs';
import { changePasswordSchema } from '@abb/common';

import { ResolverMap } from '../../../types/graphql-utils';
// import { forgotPasswordLockAccount } from '../../../utils/forgotPasswordLockAccount';
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink';
import { User } from '../../../entity/User';
import { expiredKeyError } from './errorMessages';
import { forgotPasswordPrefix } from '../../../constants';
import { formatYupError } from '../../../utils/formatYupError';
import { sendEmail } from '../../../utils/sendEmail';

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis }
    ) => {
      const user = await User.findOne({ where: { email } });
      console.log('send forgot user', user);
      if (!user) {
        return { ok: true };

        // we don't want to send too much info to the user
        // return [
        //   {
        //     path: 'email',
        //     message: userNotFoundError
        //   }
        // ];
      }

      // todo - evaluate if this is something we want to do here
      // await forgotPasswordLockAccount(user.id, redis);

      // add frontend url
      const url = await createForgotPasswordLink(
        process.env.FRONTEND_HOST as string,
        user.id,
        redis
      );

      // send email with url
      await sendEmail(email, url, 'reset password');

      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) =>
      // if doing auto-login...
      // { redis, session, req }
      {
        const redisKey = `${forgotPasswordPrefix}${key}`;

        const userId = await redis.get(redisKey);
        if (!userId) {
          return [
            {
              path: 'newPassword',
              message: expiredKeyError
            }
          ];
        }

        try {
          await changePasswordSchema.validate(
            { newPassword },
            { abortEarly: false }
          );
        } catch (err) {
          return formatYupError(err);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatePromise = User.update(
          { id: userId },
          {
            forgotPasswordLocked: false,
            password: hashedPassword
          }
        );

        const deleteKeyPromise = redis.del(redisKey);

        await Promise.all([updatePromise, deleteKeyPromise]);

        // auto login a sucessful change
        // session.userId = userId;
        // if (req.sessionID) {
        //   await redis.lpush(`${userSessionIdPrefix}${userId}`, req.sessionID);
        // }
        // native will need a return
        // return { sessionId: req.sessionID };

        return null;
      }
  }
};
