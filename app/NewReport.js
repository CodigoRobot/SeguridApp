// app New NewReport.js
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  TextInput,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import t from 'tcomb-form-native'
import validator from 'tcomb-validation'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialIcons'

var validate = validator.validate
const Form = t.form.Form
var styles_ = require('lodash')




// clone the default stylesheet
const stylesheet = styles_.cloneDeep(t.form.Form.stylesheet);

// Overriding the text color
stylesheet.textbox.normal={
  backgroundColor : '#FFFFFF',
  borderBottomColor :'#333',
  borderWidth : 0,
  borderBottomWidth : 1,
  alignSelf: 'stretch',
};
stylesheet.textbox.error={
  backgroundColor : '#FFEBEE',
  borderBottomColor :'#b92c28',
  borderWidth : 0,
  borderBottomWidth : 1,
  alignSelf: 'stretch',
};
stylesheet.controlLabel.normal={
  color : '#555',
};
/*Function to custom validation*/
function sameUser(x) {
  return x.usuario === "user";
}

/*Dafault structure to Form*/
var Gender = t.enums({
  'Masculino': 'Masculino',
  'Femenino': 'Femenino',
}, "Genero");
var Estatus = t.enums({
'Espera Atencion': 'Espera Atencion',
  'Proceso': 'Proceso',
  'Resuelto':'Resuelto',
},"Estado Reporte");
const Report = t.subtype(t.struct({
aliasPolicia : t.maybe(t.String),
anonimo : t.Boolean,
apellidoMaternoDenunciado : t.maybe(t.String),
apellidoMaternoDenunciante : t.maybe(t.String),
apellidoPaternoDenunciado : t.maybe(t.String),
apellidoPaternoDenunciante : t.maybe(t.String),
calleCruceDelito : t.maybe(t.String),
calleDelito : t.maybe(t.String),
callePrincipalDelito : t.maybe(t.String),
colorUnidadaPolicia : t.maybe(t.String),
corporacionPolicia : t.maybe(t.String),
correoDenunciante : t.maybe(t.String),
cpDenunciante : t.Number,
delito : t.maybe(t.String),
descripcionDenunciado : t.maybe(t.String),
descripcionDomicilioDelito : t.maybe(t.String),
descripcionHechosPolicia : t.maybe(t.String),
diaDelito : t.maybe(t.String),
domicilioDenunciante : t.maybe(t.String),
domicilioPolicia : t.maybe(t.String),
estadoReporte : Estatus,
fechaDelitoPolicia : t.maybe(t.String),
genero : Gender,
generoDenunciado : Gender,
horaAproximadaDelitoPolicia : t.maybe(t.String),
horarioDelito : t.maybe(t.String),
id : t.Number,
municipioPolicia : t.maybe(t.String),
narracionDelito : t.maybe(t.String),
nombreDenunciado : t.maybe(t.String),
nombreDenunciante : t.maybe(t.String),
nombrePolicia : t.maybe(t.String),
numIntDelito : t.maybe(t.String),
numeroExtDelito : t.maybe(t.String),
numeroUnidadPolicia : t.maybe(t.String),
observacion : t.maybe(t.String),
placasPolicia : t.maybe(t.String),
policia : t.Boolean,
sobrenombreDenunciado : t.maybe(t.String),
telefonoDenunciante : t.maybe(t.String)
}), sameUser);


/*Options to Form*/
var options = {
  auto: 'placeholders',
   order: ['nombreDenunciante', 'apellidoPaternoDenunciante', 'apellidoMaternoDenunciante',,'genero','correoDenunciante','telefonoDenunciante','cpDenunciante',
   'nombreDenunciado','apellidoPaternoDenunciado','apellidoMaternoDenunciado','sobrenombreDenunciado','generoDenunciado','descripcionDenunciado',
   'delito','horarioDelito','diaDelito',
   'calleDelito','numeroExtDelito','numIntDelito','callePrincipalDelito','calleCruceDelito','descripcionDomicilioDelito','narracionDelito',
   'policia','fechaDelitoPolicia','horaAproximadaDelitoPolicia','municipioPolicia','corporacionPolicia','numeroUnidadPolicia','colorUnidadaPolicia','placasPolicia','nombrePolicia','aliasPolicia','domicilioPolicia','descripcionHechosPolicia'],
  fields: {
    contraseña: {
      password: true,
      secureTextEntry: true
    },
    usuario: {
      error: 'Usuario y/o contraseña incorrecta'
    },
    genero: {
        nullOption: {value: '', text: '- Seleccione -'}
    },
    generoDenunciado: {
        nullOption: {value: '', text: '- Seleccione -'}
    },
  },
  stylesheet: stylesheet
};

/*Main Class*/
var NewReport = React.createClass({


  clearForm() {
   // clear content from all textbox
   this.setState({ value: null });
   this.setState({ markup: [] });
 },
 getInitialState() {
    return {
      value: {},
      options: options,
       region: {
          latitude: 21.3,
          longitude: -103.6,
          latitudeDelta: 4.5,
          longitudeDelta: 4.5,
        },
       visiblePosition: false,
       marker:[],
       idmark: 0,
    };
  },
  onChange(value) {
     this.setState({value});
   },
  onMapPress(e) {
     this.setState({
       marker: [
         {
           coordinate: e.nativeEvent.coordinate,
           key: 1,
           color: 'red',
         },
       ],
     });
   },
  onPress () {
      var value = this.refs.form.getValue();
      if (!value) {
            this.clearForm();
            Actions.myreports();
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
    
    updateCurrentPosition() {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          var region= {
             latitude: Number(position.coords.latitude),
             longitude: Number(position.coords.longitude),
             latitudeDelta: Number(.01),
             longitudeDelta: Number(.01),
           }
          var visiblePosition=true;
          this.setState({region});
          this.setState({visiblePosition});
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    },

    render(){
      return (

        <View style={styles.container}>
            <ScrollView style={ styles.scroll } >
              <Text>Ubicación</Text>
                <Text style={styles.description}>Presione sobre el mapa para seleccionar la ubicación relacionada al reporte.</Text>
              <MapView
                style={styles.map}
                showsUserLocation={this.state.visiblePosition}
                region={this.state.region}
                onPress={(e) => this.onMapPress(e)}
                onChange={this.onChange}
                >
                {this.state.marker.map(marker => (
                     <MapView.Marker
                       key={this.state.idmark}
                       coordinate={marker.coordinate}
                     >
                       <Icon style={{fontSize: 40}}  name={"place"} color={'#b71c1c'}/>
                    </MapView.Marker>
                  ))
                 }
              </MapView>
              <TouchableHighlight style={styles.current_position} onPress={() => this.updateCurrentPosition()}>
                  <Icon style={{fontSize: 24}}  name={'gps-fixed'} color='#333'/>
              </TouchableHighlight>
              <View style={styles.container}>
              </View>
              <Form
                ref="form"
                type={Report}
                 options={this.state.options}
                 value={this.state.value}
                 onChange={this.onChange}
                 style={styles.form}
              />
              <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Crear Denuncia</Text>
              </TouchableHighlight>
          </ScrollView>
        </View>
      );
    }
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  scroll:{
    marginTop:70,
    flex:1,
    alignSelf: 'stretch',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 50,
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
    width: 150,
    backgroundColor: 'rgba(0, 103, 99, 0.9)',
    borderColor: '#61E8E1',
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 20,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  current_position:{
    width: 35,
    height: 35,
    marginTop: 70,
    marginLeft: 50,
    borderRadius:20,
    alignSelf: 'flex-start',
    borderColor: 'gray',
    backgroundColor: 'white',
    transform: [{'translate':[0,0,1]}],
    elevation: 1,
    borderWidth : 5,
    borderColor : 'white',
    position: 'absolute'
  },
  map:{
    height:300,
    marginRight: 40,
    marginLeft: 40,
  },
  description:{
    color: '#777',
    marginBottom:10,
    fontSize:10,
  }
});

export default NewReport;
