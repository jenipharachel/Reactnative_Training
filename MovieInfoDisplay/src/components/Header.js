import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

export default class Header extends Component {
  render() {
    const sortData = [
      {key: 0, section: true, label: 'Sort Movies based on'},
      {key: 'vote_count', label: 'Votes'},
      {key: 'release_date', label: 'Release Dates'},
    ];
    const filterData = [
      {key: 1, section: true, label: 'Filter Movies based on language'},
      {key: 'en', label: 'English'},
      {key: 'ja', label: 'Japanese'},
      {key: 'ca', label: 'Canadian'},
      {key: 'ko', label: 'Korean'},
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Movie List</Text>
        <View style={{flex: 0.3, justifyContent: 'space-around'}}>
          <ModalSelector
            data={sortData}
            initValue="Sort"
            onChange={option => {
              this.props.sortByKey(option.key);
            }}
          />
        </View>
        <View style={{flex: 0.3, justifyContent: 'space-around'}}>
          <ModalSelector
            data={filterData}
            initValue="Filter"
            onChange={option => {
              this.props.setFilter(option.key);
            }}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 26,
  },
});
