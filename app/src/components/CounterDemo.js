import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {Button, Text, H1, View} from 'native-base';

export const CounterDemo = () => {
  const [counter, setCounter] = useState(0);

  const increaseCounter = () => {
    console.log('[App] Counter:', counter);
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    console.log('[App] Counter:', counter);
    setCounter(counter - 1);
  };

  return (
    <View>
      <H1 style={styles.H1}>Hello World: {counter}</H1>
      <View style={styles.buttonView}>
        <Button
          rounded
          success
          style={styles.button}
          onPress={() => increaseCounter()}>
          <Text>+</Text>
        </Button>
        <Button
          rounded
          danger
          style={styles.button}
          onPress={() => decreaseCounter()}>
          <Text>-</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  H1: {
    marginBottom: 10,
  },
  buttonView: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    width: 70,
    justifyContent: 'center',
  },
});
