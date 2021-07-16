// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../src/Home'
import ProduitList from '../src/ProduitList'
import DetailProduit from '../src/DetailProduit'
import Localisation from '../src/Localisation'

import CameraPhoto from "../src/composants/CameraPhoto";
import Inscription from '../src/Inscription'
import Connexion from '../src/Connexion'
import RunPage from '../src/RunPage'

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName="RunPage" screenOptions={screenOptionStyle}>
        <Stack.Screen
        name="RunPage" 
        component={RunPage}
        options={ styleNav('run', props) }
        />
        <Stack.Screen
        name="Inscription" 
        component={Inscription}
        options={ styleNav('Inscription', props) }
        />
        <Stack.Screen
        name="Connexion" 
        component={Connexion}
        options={ styleNav('Connexion', props) }
        />
        <Stack.Screen
        name="Home" 
        component={Home}
        options={ styleNav('Accueil', props) }
        />
        <Stack.Screen
        name="ProduitList" 
        component={ProduitList}
        options={ styleNav('Liste Produits', props) }
        />
        <Stack.Screen
        name="DetailProduit" 
        component={DetailProduit}
        options={ styleNav('Detail Produit', props) }
        />
        <Stack.Screen
        name="Localisation" 
        component={Localisation}
        options={ styleNav('Localisation', props) }
        />
        <Stack.Screen
        name="CameraPhoto" 
        component={CameraPhoto}
        options={ styleNav('Camera', props) }
        />
    </Stack.Navigator>
  );
}


export {
  MainStackNavigator,
};

const styleNav = (title, props) => {
  if(title == 'run'){
    return (
      {
      title: title,
      headerStyle: {
          height: 50,
          backgroundColor: '#fff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontSize: 20,
          textAlign: 'center',
          },
      }
    )
  }else{
    return (
      {
      title: title,
      headerStyle: {
          height: 50,
          backgroundColor: '#f3f3f1',
          },
          headerTintColor: '#248e44',
          headerTitleStyle: {
          fontSize: 20,
          textAlign: 'center',
          },
      }
    )
  }
}
