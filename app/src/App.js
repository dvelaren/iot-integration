/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {Container, Content} from 'native-base';
import {CounterDemo} from './components/CounterDemo';
import Plot from './components/Plot';

import {StyleSheet} from 'react-native';

export default class App extends Component {
  state = {
    active: false,
  };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <CounterDemo />
          <Plot />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
