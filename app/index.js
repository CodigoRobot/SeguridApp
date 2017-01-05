import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

// New Imports
import LogIn from './LogIn';
import NewReport from './NewReport';
import DashBoard from './DashBoard';
import MyReports from './MyReports';
import Profile from './Profile';

// Simple component to render something in place of icon
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? '#006064' :'#333333'}}>{title}</Text>
  );
}

const App = () => {
  return (

    <Router>



      <Scene key="root">
        {/* Tab Container */}
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Tab and it's scenes */}
          <Scene key="dashboard" title="Incidentes" icon={TabIcon}>
            <Scene key="dash"
              component={DashBoard}
              title="Incidentes"
            />
          </Scene>

          <Scene key="login"
            component={LogIn}
            title="SeguridApp Jalisco"
            hideTabBar={true}
            initial
          />

          <Scene key="newreport"
            component={NewReport}
            title="Nuevo Reporte"
          />

          {/* Tab and it's scenes */}
          <Scene key="myreports" title="Mis Reportes" icon={TabIcon}>
            <Scene
              key="myrep"
              component={MyReports}
              title="Mis reportes"
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

export default App;
