// app New LogIn.js
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import t from 'tcomb-form-native'
import validator from 'tcomb-validation'
var validate = validator.validate
const Form = t.form.Form
var styles_ = require('lodash')

// clone the default stylesheet
const stylesheet = styles_.cloneDeep(t.form.Form.stylesheet);

// Overriding the text color
stylesheet.textbox.normal.backgroundColor = '#FFFFFF'
stylesheet.controlLabel.normal.color = '#FFFFFF'
stylesheet.textbox.normal.width = 250
stylesheet.textbox.error.backgroundColor = '#FFEBEE'
stylesheet.controlLabel.error.color = '#FFFFFF'
stylesheet.textbox.error.width = 250

/*Function to custom validation*/
function sameUser(x) {
  return x.usuario === "ciudadano";
}

/*Dafault structure to Form*/
const UserInit = t.subtype(t.struct({
  usuario: t.String,
  contraseña: t.String,
}), sameUser);

/*Options to Form*/
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

/*Main Class*/
var LogIn = React.createClass({

  componentWillMount() {
   if(!false) {
       Actions.dashboard()
   }
  },
  clearForm() {
   // clear content from all textbox
   this.setState({ value: null });
 },
 getInitialState() {
    return {
      value: {},
      options: options
    };
  },
  onChange(value) {
    this.setState({value});
  },
  onPress: function () {
      var value = this.refs.form.getValue();
      if (value) {
        if(value.usuario=="ciudadano"&&value.usuario=="ciudadano")
            Actions.dashboard()
      }
      else{

        this.setState({options: t.update(this.state.options, {
         fields: {
           usuario: {
             hasError: { $set: true },
             error: { $set: 'Usuario y/o contraseña incorrecta' }
           }
         }
       })});
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
             options={this.state.options}
             value={this.state.value}
             onChange={this.onChange}
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
    height: 38,
    width: 180,
    backgroundColor: 'rgba(0, 103, 99, 0.9)',
    borderColor: '#61E8E1',
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
