// app ViewReport.js

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackAndroid,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import  base64  from 'base-64'

var headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode("ciudadano:ciudadano"));

/*
  Main class scene
*/
export default class ViewReport extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {return true});
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={ {flex:1, alignSelf: 'stretch'} } >
        <View style={styles.row}>
          <Text style={styles.label}>
              Nombre denunciado:
          </Text>
          <Text style={styles.data}>
              Carlos Antonio Patiño
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
              Sobrenombre:
          </Text>
          <Text style={styles.data}>
              El Programador
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
              Genero:
          </Text>
          <Text style={styles.data}>
              Masculino
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
              Descripcion del enunciado:
          </Text>
          <Text style={styles.data}>
              Cuerpo delgado, come pitza y café todo el día.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
              Delito
          </Text>
          <Text style={styles.data}>
              Robo a mano armada
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
              Horario Delito
          </Text>
          <Text style={styles.data}>
              15:00
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
              Día del delito
          </Text>
          <Text style={styles.data}>
              25/12/2016
          </Text>
        </View>
      </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: 60,
  },
  row:{
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
    borderBottomColor: 'rgba(0, 103, 99, 0.9)',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  data: {
    color: '#555',
    marginTop: 5,
  },
  label: {
    color: '#333',
    fontWeight: 'bold'
  },
});
