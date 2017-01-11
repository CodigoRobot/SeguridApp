// app/New Profile.js

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import  base64  from 'base-64'

var headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode("user:user"));

/*
  Main class scene
*/
export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { profileinfo: [] }
  }

  componentWillMount() {

    let profileinfo;
    fetch("https://seguridmap.coderobot.com.mx:8443/sm/api/users/user", {
        headers: headers
      })
      .then((response) => {
            if(response._bodyInit!==""){
              profileinfo =JSON.parse("["+response._bodyInit+"]");
              this.setState({ profileinfo });
            }
      })
      .done();
  }

  render () {
    actualUser = this.state.profileinfo.map(function (item) {
       return (

         <View style={styles.row} key={item.login}>
              <Text style={ styles.login } >
                {item.login}
              </Text>
              <Text style={ styles.cell } >
                <Text style={ styles.label } >Nombre: </Text>
                {item.firstName}
              </Text>
              <Text style={ styles.cell } >
                <Text style={ styles.label } >Apellido: </Text>
                {item.lastName}
              </Text>
              <Text style={ StyleSheet.flatten([styles.cell, styles.lastcell])} >
                <Text style={ styles.label } >Correo: </Text>
                {item.email}
              </Text>
         </View>
       );
    });

    return (
      <View style={styles.container}>

        <ScrollView style={ {alignSelf: 'stretch',} } >

            <View style={styles.container}>
                <TouchableHighlight key="user-edit" style={styles.wrapperImage} onPress={() => Actions.viewreport()} >
                  <Image elevation={40} source={require('./img/fixed-picture.jpg')} style={styles.profileImage} />
                </TouchableHighlight>
            </View>

            <View style={styles.actualUser}>
              {actualUser}
            </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 120,
    borderColor: '#ddd',
    borderWidth: 1
  },
  wrapperImage:{
    width: 120,
    height: 120,
    marginTop:66,
    borderRadius: 122,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label:{
    fontWeight: 'bold',
  },
  cell:{
    color: '#333',
    fontSize: 14,
    paddingBottom: 20,
    paddingTop: 20,
    textAlign: 'center',
    borderBottomColor: 'rgba(120,120,120,.3)',
    borderBottomWidth: .5,
  },
  lastcell:{
    marginBottom: 50,
  },
  login:{
    color: '#333',
    fontSize: 26,
    paddingBottom: 20,
    paddingTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
});
