// app/New Dashboard.js

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Linking,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps'
import  base64  from 'base-64'
import Icon from 'react-native-vector-icons/MaterialIcons'

var headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode("admin:admin3044"));

export default class DashBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
       markers: [],
       region: {
          latitude: 21.3,
          longitude: -103.6,
          latitudeDelta: 4.5,
          longitudeDelta: 4.5,
        },
       visiblePosition: false,
    }
  }
componentDidUpdate(){
  console.log("xfdfdsfsdf");
}
  componentWillMount() {

    let markers;
    fetch("https://seguridmap.coderobot.com.mx:8443/sm/api/user-reports?page=0&size=10000", {
        headers: headers
      })
      .then((response) => {
            if(response._bodyInit!==""){
              markers =JSON.parse(response._bodyInit);
              this.setState({ markers });
            }
      })
      .done();
  }

  updateCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        var region= {
           latitude: Number(position.coords.latitude),
           longitude: Number(position.coords.longitude),
           latitudeDelta: Number(.1),
           longitudeDelta: Number(.1),
         }
         var visiblePosition=true;
        this.setState({region});
        this.setState({visiblePosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render(){
    var color="";

    custoMarket= this.state.markers.map(function (marker) {

      if(marker.position!==""&&marker.position!==null){
        marker.position2=marker.position.replace("POINT (", "").replace(")","").split(" ");
        marker.latlng={latitude: Number(marker.position2[1]),
            longitude: Number(marker.position2[0])}

      switch (marker.estadoReporte){

        case 'EsperaAtencion':
            color= '#b71c1c'
        break;
        case 'Proceso':
            color= '#b71c1c'
        break;
        case 'Resuelto':
            color= '#b71c1c'
        break;
        default:
            color='white'
        break;
      }
       return (
           <MapView.Marker
             key={marker.id}
             coordinate={marker.latlng}
             title=  {"Reporte "+marker.id}
           >
            <Icon style={{fontSize: 40}}  name={"place"} color={color}/>
            </MapView.Marker>
        )
      }
    });
  return (

    <View style ={styles.container}>
      <MapView
        style ={styles.map}
        showsUserLocation={this.state.visiblePosition}
        region={this.state.region}
        >
          {custoMarket}
        </MapView>
        <TouchableHighlight style={styles.button_new} onPress={() => Actions.newreport()} >
              <Text elevation={5} style={styles.textplus} >+</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button_panic} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.jpriskcorp.botonpanicoapp.jal')}>
              <Text elevation={25} style={styles.textpanic} > Botón de Pánico </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.current_position} onPress={() => this.updateCurrentPosition()}>
            <Icon style={{fontSize: 24}}  name={'gps-fixed'} color='#333'/>
        </TouchableHighlight>
      </View>
    );
  }
};



const styles = StyleSheet.create({

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
   current_position:{
     width: 35,
     height: 35,
     borderRadius:20,
     marginLeft:10,
     marginTop:-60,
     alignSelf: 'flex-start',
     borderColor: 'gray',
     backgroundColor: 'white',
     transform: [{'translate':[0,0,1]}],
     elevation: 12,
     borderWidth : 5,
     borderColor : 'white',
   },
   textplus:{
     color: 'white',
     fontSize: 43,
     textAlign: 'center',
   }

});
