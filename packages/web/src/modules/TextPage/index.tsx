import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export class TextPage extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    console.log(this.props);
    const {
      location: { state }
    } = this.props;
    return <h2>{state && state.message ? state.message : 'hello'}</h2>;
  }
}
