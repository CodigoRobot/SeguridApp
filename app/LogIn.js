// app/New LogIn.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import t from 'tcomb-form-native';
const Form = t.form.Form
var styles_ = require('lodash');

// clone the default stylesheet
const stylesheet = styles_.cloneDeep(t.form.Form.stylesheet);

// overriding the text color
stylesheet.textbox.normal.backgroundColor = '#FFFFFF'
stylesheet.controlLabel.normal.color = '#FFFFFF'
stylesheet.textbox.normal.width = 250
stylesheet.textbox.error.backgroundColor = '#FFEBEE'
stylesheet.controlLabel.error.color = '#FFFFFF'
stylesheet.textbox.error.width = 250


const UserInit = t.struct({
  usuario: t.String,
  contraseña: t.String,
});

var options = {
  auto: 'placeholders',
  fields: {
    contraseña: {
      password: true,
      secureTextEntry: true
    },
    usuario: {
      error: 'Usuario y/o contraseña incorrecta'
    }
  },
  stylesheet: stylesheet
};

var LogIn = React.createClass({

    onPress: function () {
      var value = this.refs.form.getValue();
      if (value) {
        if(value.usuario=="sepaf"&&value.usuario=="sepaf")
            Actions.dashboard()
        else
            Actions.dashboard()

      }
    },

    render: function() {
      return (

        <View style={styles.container}>
          <Image source={require('./img/bck.png')} style={styles.backgroundImage} />
          {/* display */}
          <Form
            ref="form"
            type={UserInit}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableHighlight>
        </View>
      );
    }
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    width: 180,
    backgroundColor: '#C62828',
    borderColor: '#B71C1C',
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    resizeMode: 'cover',
    width: null
  }
});

export default LogIn;
