import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Router, Scene } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Imprting Scenes
import LogIn from './LogIn';
import NewReport from './NewReport';
import DashBoard from './DashBoard';
import MyReports from './MyReports';
import Profile from './Profile';
import ViewReport from './ViewReport';

// Simple to render tabs icons
const TabIcon = ({ selected, title }) => {
  var icon="";
  switch(title){
      case 'Denuncias':
        icon='map';
      break;
      case 'Mis Denuncias':
        icon='assignment'
      break;
      case 'Perfil':
        icon='face'
      break;
  }
  return (
    <View style={ {alignItems: 'center', borderTopColor: selected ? 'rgba(0, 103, 99, 0.9)' :'#FFF' , borderTopWidth: 3, flex:1}}>
      <Text style={{color: selected ? 'rgba(0, 103, 99, 0.9)' :'#333333',  alignItems: 'center',marginTop: 2}}>
        <Icon style={{color: selected ? 'rgba(0, 103, 99, 0.9)' :'#333333', fontSize: 22}}  name={icon} color='#333'/>
      </Text>
      <Text style={{color: selected ? 'rgba(0, 103, 99, 0.9)' :'#333333'}}>
      {title}
      </Text>
    </View>
  );
}
/*
  Main class scene
*/
export default class App extends Component {

  componentDidMount () {

    setTimeout(function(){
        SplashScreen.hide();
    }, 100);
  }

  render () {
      return (
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene}>
          <Scene key="root">
            <Scene
              key="tabbar"
              tabs={true}
              tabBarStyle={{ backgroundColor: '#FFFFFF' }}
            >

              <Scene
                key="login"
                component={LogIn}
                title="SeguridApp Jalisco"
                hideTabBar={true}
                initial
              />

              <Scene
                key="newreport"
                component={NewReport}
                title="Nueva Denuncia"
              />
              <Scene
                key="viewreport"
                component={ViewReport}
                title="Reporte"
              />

              {/* Tab and it's scenes */}
              <Scene key="dashboard" title="Denuncias" icon={TabIcon} >
                <Scene
                  key="dash"
                  component={DashBoard}
                  title="Denuncias"
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="myreports" title="Mis Denuncias" icon={TabIcon}>
                <Scene
                  key="myrep"
                  component={MyReports}
                  title="Mis Denuncias"
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="perfil" title="Perfil" icon={TabIcon}>
                <Scene
                  key="profile"
                  component={Profile}
                  title="Perfil"
                />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      );
    }
};

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    borderBottomColor: 'rgba(0, 103, 99, 0.9)',
    borderBottomWidth: 4, // changing navbar color
  },
  navTitle: {
    color: '#333', // changing navbar title color
  },
  iconNav:{
     fontSize: 24,
  }
})
