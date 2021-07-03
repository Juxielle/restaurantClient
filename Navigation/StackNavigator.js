// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../src/Home'
import ProduitList from '../src/ProduitList'
import DetailProduit from '../src/DetailProduit'
import Localisation from '../src/Localisation'

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
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptionStyle}>
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
    </Stack.Navigator>
  );
}


export {
  MainStackNavigator,
};

  const styleNav = (title, props) => {
    return (
        {
        title: title,
        headerStyle: {
            height: 50,
            backgroundColor: '#f3f3f1',
            },
            headerTintColor: '#fb7f35',
            headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            },
        }
    )
  }
