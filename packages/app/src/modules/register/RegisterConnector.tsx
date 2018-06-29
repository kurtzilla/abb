import * as React from 'react';
import { Button } from 'react-native-elements';
import { View } from 'react-native';

export class RegisterConnector extends React.PureComponent {
  onPress = () => {
    console.log('button pressed');
  };

  render() {
    return (
      <View style={{ margin: 100 }}>
        <Button title="BUTTON" onPress={this.onPress} />
      </View>
    );
  }
}
