import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ChangePasswordController } from '@abb/controller';

import { ChangePasswordView } from './ui/ChangePasswordView';

// tell react router the name of the variable in the route taht we want to pull off
export class ChangePasswordConnector extends React.PureComponent<
  RouteComponentProps<{ key: string }>
> {
  onFinish = () => {
    this.props.history.push('/login');
  };

  render() {
    const {
      match: {
        params: { key }
      }
    } = this.props;
    console.log(key);

    // see minute 2 of vid 27 for a non-lambda solution
    // because the changepasswordview form does not have access to the props
    // we need to use a lambda to send in the key
    return (
      <ChangePasswordController>
        {({ submit }) => (
          <ChangePasswordView
            onFinish={this.onFinish}
            // tslint:disable-next-line:jsx-no-lambda
            submit={async ({ newPassword }) => submit({ key, newPassword })}
          />
        )}
      </ChangePasswordController>
    );

    // the non-lambda version
    // note that you will need to change the view to accept the props
    // <ChangePasswordController>
    //     {({ submit }) => (
    //       <ChangePasswordView
    //         onFinish={this.onFinish}
    //         key={key}
    //         submit={submit}
    //       />
    //     )}
    //   </ChangePasswordController>
  }
}
