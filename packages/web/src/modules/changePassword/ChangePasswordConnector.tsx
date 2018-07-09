import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ChangePasswordController } from '@abb/controller';

import { ChangePasswordView } from './ui/ChangePasswordView';

// tell react router the name of the variable in the route
export class ChangePasswordConnector extends React.PureComponent<
  RouteComponentProps<{ key: string }>
> {
  render() {
    const {
      match: {
        params: { key }
      }
    } = this.props;
    console.log(key);
    return (
      <ChangePasswordController>
        {({ submit }) => (
          <ChangePasswordView
            // tslint:disable-next-line:jsx-no-lambda
            submit={async ({ newPassword }) => submit({ key, newPassword })}
          />
        )}
      </ChangePasswordController>
    );
  }
}
