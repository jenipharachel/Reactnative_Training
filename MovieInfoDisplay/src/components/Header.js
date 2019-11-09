import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

export default class Header extends Component {
  // _onSort() {
  //   // alert('You tapped Sort the button!');
  //   Alert.alert(
  //     'Sort Movies',
  //     'Sort Based On',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Votes',
  //         onPress: () => {
  //           this.props.sortByKey('vote_count');
  //         },
  //       },
  //       {text: 'Release Dates', onPress: () => console.log('OK Pressed')},
  //     ],
  //     {cancelable: false},
  //   );
  // }

  // _onFilter() {
  //   // alert('You tapped Filter the button!');
  //   Alert.alert(
  //     'Filter Movies',
  //     'Select Language',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'en',
  //         onPress: () => console.log('Ask me later pressed'),
  //       },
  //       {text: 'ja', onPress: () => console.log('OK Pressed')},
  //       {text: 'cn', onPress: () => console.log('OK Pressed')},
  //       {text: 'ko', onPress: () => console.log('OK Pressed')},
  //     ],
  //     {cancelable: false},
  //   );
  // }

  render() {
    let index = 0;
    const sortData = [
      {key: index++, section: true, label: 'Sort Movies based on'},
      {key: 'vote_count', label: 'Votes'},
      {key: 'release_date', label: 'Release Dates'},
    ];
    const filterData = [
      {key: index++, section: true, label: 'Filter Movies based on language'},
      {key: 'en', label: 'English'},
      {key: 'ja', label: 'Japanese'},
      {key: 'ca', label: 'Canadian'},
      {key: 'ko', label: 'Korean'},
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Movie List</Text>
        {/* <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={this._onSort} title="Sort" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={this._onFilter}
            title="Filter"
          />
        </View> */}
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
              this.props.sortByKey(option.key);
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
  buttonContainer: {
    flex: 0.3,
  },
  button: {
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 26,
  },
});
