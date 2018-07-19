import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export class DemoDelete extends React.PureComponent {
  render() {
    return (
      <Mutation
        mutation={gql`
          mutation {
            deleteListing(id: 'blah')
          }
        `}
      >
        {mutate => <button onClick={() => mutate()}>delete listing</button>}
      </Mutation>
    );
  }
}
