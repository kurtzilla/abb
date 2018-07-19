import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { RouteProps, Route, Redirect, RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { MeQuery } from '../../schemaTypes';

type Props = RouteProps;

class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component } = this.props;

    if (!data || data.loading) {
      return null;
    }

    // if we make it to this point the data has loaded
    if (!data.me || !data.me.email) {
      // user is not logged in
      return <Redirect to="/login" />;
    }

    const Component = component as any;
    return <Component {...routeProps} />;
  };

  render() {
    // ignore data and component
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      email
    }
  }
`;

export const AuthRoute = graphql<Props, MeQuery>(meQuery)(C);
