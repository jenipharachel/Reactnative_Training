/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Header from './src/components/Header';
import Movies from './src/components/Movies';

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Movies />
      </>
    );
  }
}
