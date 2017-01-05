// app/New Dashboard.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';


const Dashboard = () => {
  return (

    <View style ={styles.container}>
      <MapView
        style ={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
      <TouchableHighlight style={styles.button} onPress={() => Actions.newreport()} >
            <Text elevation={5} style={styles.textplus} >+</Text>
    </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  container: {
     flex: 2,
     alignItems: 'flex-end',
   },
   map: {
     ...StyleSheet.absoluteFillObject,
     flex: 1,
   },
   button:{
      width: 60,
      height: 60,
      backgroundColor: '#DD4337',
      borderRadius:120,
      marginRight:10,
      marginTop:70,
      borderColor: 'gray',
      transform: [{'translate':[0,0,1]}],
      elevation: 5,
      borderWidth : .1,
      borderColor : '#222',
   },
   textplus:{
     color: 'white',
     fontSize: 43,
     textAlign: 'center',
   }

});


export default Dashboard;
