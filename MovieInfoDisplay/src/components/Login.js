import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

export default class Login extends Component {
  // async facebookLogin() {
  //   try {
  //     const result = await LoginManager.logInWithPermissions([
  //       'public_profile',
  //       'email',
  //     ]);
  //     if (result.isCancelled) {
  //       throw new Error('User cancelled request');
  //     }
  //     console.log(
  //       `Login success with permissions: ${result.grantedPermissions.toString()}`,
  //     );

  //     const data = await AccessToken.getCurrentAccessToken();
  //     console.log('data', data);
  //     if (!data) {
  //       throw new Error(
  //         'Something went wrong obtaining the users access token',
  //       );
  //     }

  //     const credential = firebase.auth.FacebookAuthProvider.credential(
  //       data.accessToken,
  //     );
  //     console.log(credential);
  //     const firebaseUserCredential = await firebase
  //       .auth()
  //       .signInWithCredential(credential);
  //     console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     this.props.loggedIn();
  //   }
  // }

  render() {
    return (
      <View>
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
        {/* <Button title="Login with Facebook" onPress={this.facebookLogin} /> */}
      </View>
    );
  }
}
