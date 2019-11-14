/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import Header from './src/components/Header';
import Movies from './src/components/Movies';
import MovieDetails from './src/components/MovieDetails';
import Login from './src/components/Login';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import _ from 'lodash';

class App extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    isLoading: true,
    dataSource: [],
    fetching_from_server: false,
    filterLanguage: '',
    loggedIn: false,
  };

  offset = 1;

  //LifeCycle methods
  componentDidMount() {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '31318755568-suojj00hbac7k3n8lgp6vvre5c2adc8a.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '124018728460-krv1hjdv0mp51pisuc1104q5nfd440ae.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    // async function bootstrap() {
    //   await GoogleSignin.configure({
    //     scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //     webClientId:
    //       '31318755568-suojj00hbac7k3n8lgp6vvre5c2adc8a.apps.googleusercontent.com', // required
    //   });
    // }

    return fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=f9340678aa6a61a60578f56c8f272f61&page=1',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.offset = this.offset + 1;
        this.setState({
          isLoading: false,
          //   dataSource: responseJson.results,
          dataSource: [...this.state.dataSource, ...responseJson.results],
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Custom methods
  firebaseGoogleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
      console.log(userInfo);
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };

  // _signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     this.setState({userInfo: userInfo, loggedIn: true});
  //     console.log(userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       console.log('user cancelled the login flow');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (f.e. sign in) is in progress already
  //       console.log('operation (f.e. sign in) is in progress already');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //       console.log('play services not available or outdated');
  //     } else {
  //       // some other error happened
  //       console.log('some other error happened');
  //     }
  //   }
  // };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log('user has not signed in yet');
        this.setState({loggedIn: false});
      } else {
        // some other error
        console.log('some other error happened');
        this.setState({loggedIn: false});
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null, loggedIn: false}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  loadMoreData = () => {
    this.setState({fetching_from_server: true}, () => {
      fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=f9340678aa6a61a60578f56c8f272f61&page=' +
          this.offset,
      )
        .then(response => response.json())
        .then(responseJson => {
          this.offset = this.offset + 1;
          this.setState({
            dataSource: [...this.state.dataSource, ...responseJson.results],
            fetching_from_server: false,
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  sortByKey = key => {
    const {dataSource} = this.state;
    const clonedData = _.orderBy(dataSource, [key], ['desc']);
    this.setState({dataSource: clonedData});
  };

  moviesRender = () => {
    const {dataSource, filterLanguage} = this.state;
    if (filterLanguage == '') {
      return dataSource;
    } else {
      const clonedData = _.filter(
        dataSource,
        item => item.original_language == filterLanguage,
      );
      return _.orderBy(clonedData, ['vote_count'], ['desc']);
    }
  };

  setFilter = key => {
    const filterLanguage = key;
    console.log(key);
    this.setState({filterLanguage});
  };

  loggedIn = () => {
    this.setState({loggedIn: true});
  };

  render() {
    return (
      <>
        <Header sortByKey={this.sortByKey} setFilter={this.setFilter} />
        <View>
          {!this.state.loggedIn && <Text>You are currently logged out</Text>}
        </View>
        {this.state.loggedIn && (
          <Movies
            navigation={this.props.navigation}
            loadMoreData={this.loadMoreData}
            isLoading={this.state.isLoading}
            movies={this.moviesRender()}
            fetching_from_server={this.state.fetching_from_server}
          />
        )}
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              console.log(result);
              AccessToken.getCurrentAccessToken().then(data => {
                this.setState({
                  loggedIn: true,
                  userID: data.userID,
                });
                console.log(data, data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() =>
            this.setState({
              loggedIn: false,
              userID: '',
            })
          }
        />
        {!this.state.loggedIn && (
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.firebaseGoogleLogin}
            disabled={this.state.isSigninInProgress}
          />
        )}
        {this.state.loggedIn && (
          <Button
            onPress={this.signOut}
            title="Signout"
            color="#841584"></Button>
        )}

        {/* <Button title="Login with Facebook" onPress={this.facebookLogin} /> */}
      </>
    );
  }
}
// }

const AppNavigator = createStackNavigator({
  Home: App,
  Details: MovieDetails,
});

export default createAppContainer(AppNavigator);
