// app/New MyReports.js

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import  base64  from 'base-64'

var headers = new Headers();
headers.append("Authorization", "Basic " + base64.encode("user:user"));


/*
  Main class scene
*/
export default class MyReports extends Component {

  constructor(props) {
    super(props);
    this.state = { listreports: [] }
  }

  componentWillMount() {

    let listreports;
    fetch("https://seguridmap.coderobot.com.mx:8443/sm/api/current-user-reports", {
        headers: headers
      })
      .then((response) => {
            if(response._bodyInit!==""){
              listreports =JSON.parse(response._bodyInit);
              this.setState({ listreports });
            }
      })
      .done();
  }

  render () {
        contents = this.state.listreports.map(function (item) {
            switch(item.estadoReporte){
                case 'EsperaAtencion':
                    st=styles.ea;
                break;
                case 'EnRevision':
                    st=styles.er;
                break;
                case 'EsperaInformacion':
                    st=styles.ei;
                break;
                case 'Concluido':
                    st=styles.cu;
                break;
            }
           return (
             <TouchableHighlight  key={item.id} onPress={() => Actions.viewreport({text:item.id})} >
             <View style={ StyleSheet.flatten([styles.row, st]) }>
                  <Text style={ styles.cell } >{item.id}</Text>
                  <Text style={ styles.cell } >{item.fechaDelitoPolicia}</Text>
             </View>
              </TouchableHighlight>
           );
        });
        return (
        <View style={ styles.container }>
          <ScrollView style={ {flex:1} } >
             <View style={ styles.header }>
               <Text style={ styles.headerText }>Identificador</Text>
               <Text style={ styles.headerText }>Fecha</Text>
             </View>
             <View style={ styles.content }>
                 { contents }
             </View>
           </ScrollView>
           <View style={ styles.statusrow }>
               <Text style={ StyleSheet.flatten([styles.statuscell, styles.ea]) }>
                 Espera de anteción
               </Text>
               <Text style={ StyleSheet.flatten([styles.statuscell, styles.er]) }>
                 En revisión
               </Text>
               <Text style={ StyleSheet.flatten([styles.statuscell, styles.ei]) }>
                 Espera de información
               </Text>
               <Text style={ StyleSheet.flatten([styles.statuscell, styles.cu]) }>
                 Culminado
               </Text>
           </View>
         </View>
       );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 54,
    backgroundColor: '#fff',
  },
  header:{
    flex:1,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  headerText:{
    fontWeight: 'bold',
    color: '#333',
    fontSize: 22,
    paddingTop: 20,
    paddingBottom: 20,
    flex: .5,
    textAlign: 'center'
  },
  row:{
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: 'rgba(120,120,120,.9)',
    borderBottomWidth: .5,
  },
  cell:{
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    flex: .5,
    paddingBottom: 20,
    paddingTop: 20,
    textAlign: 'center'
  },
  statusrow:{
    flexDirection: 'row',
    flex: .5,
    alignItems: 'flex-end',
  },
  statuscell:{
    color: '#333',
    fontSize: 14,
    flex: .5,
    textAlign: 'center',
    marginBottom:50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  ea:{
    backgroundColor: '#ffcdd2',
  },
  er:{
    backgroundColor: '#f8bbd0',
  },
  ei:{
    backgroundColor: '#e1bee7',
  },
  cu:{
    backgroundColor: '#bbdefb',
  },
})
