// app/New Dashboard.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Linking,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';


const Dashboard = () => {
  return (

    <View style ={styles.container}>
      <MapView
        style ={styles.map}
        region={{
          latitude: 21.3,
          longitude: -103.6,
          latitudeDelta: 4.5,
          longitudeDelta: 4.5,
        }}
      >
      </MapView>
      <TouchableHighlight style={styles.button_new} onPress={() => Actions.newreport()} >
            <Text elevation={5} style={styles.textplus} >+</Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.button_panic} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.jpriskcorp.botonpanicoapp.jal')}>
            <Text elevation={25} style={styles.textpanic} > Botón de Pánico {this.props}</Text>
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
   button_new:{
      width: 60,
      height: 60,
      backgroundColor: 'rgba(0, 103, 99, 0.9)',
      borderRadius:120,
      marginRight:10,
      marginTop:70,
      borderColor: 'gray',
      transform: [{'translate':[0,0,1]}],
      elevation: 20,
      borderWidth : .1,
      borderColor : '#222',
   },
   button_panic:{
      width: 60,
      height: 60,
      borderRadius:120,
      marginRight:90,
      marginTop:-60,
      borderColor: 'gray',
      backgroundColor: '#CC4949',
      transform: [{'translate':[0,0,1]}],
      elevation: 12,
      borderWidth : 5,
      borderColor : '#b92c28',
   },
   textpanic:{
      width: 50,
      height: 60,
      padding: 4,
      textAlign: 'center',
      borderRadius:120,
      color: '#000',
      fontSize: 11,
      color: '#fff',
      fontWeight: 'bold'
   },
   textplus:{
     color: 'white',
     fontSize: 43,
     textAlign: 'center',
   }

});


export default Dashboard;
