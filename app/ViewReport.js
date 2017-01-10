// app ViewReport.js

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import  base64  from 'base-64'

var headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode("user:user"));

/*
  Main class scene
*/
export default class ViewReport extends Component {

  componentWillMount() {

    let profileinfo;
    fetch("https://seguridmap.coderobot.com.mx:8443/sm/api/users/user", {
        headers: headers
      })
      .then((response) => {
            if(response._bodyInit!==""){
              profileinfo =JSON.parse(response._bodyInit);
              console.log(profileinfo);
              this.setState({ profileinfo });
            }
      })
      .done();
  }

  render () {
    return (
      <View style={styles.container}>
        <Text
          style={styles.welcome}
        >
            Picture and some data from the actual user.
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});
