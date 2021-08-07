// ./navigation/StackNavigator.js

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from '../src/Home'
import ProduitList from '../src/ProduitList'
import DetailProduit from '../src/DetailProduit'
//import Map from '../src/Map'

//import Inscription from '../src/Inscription'
import Connexion from '../src/Connexion'
import RunPage from '../src/RunPage'
import Panier from "../src/Panier";
import Commandes from "../src/Commandes";

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
        name="Panier" 
        component={Panier}
        options={ styleNav('Panier', props) }
        />
        <Stack.Screen
        name="Commandes" 
        component={Commandes}
        options={ styleNav('Panier', props) }
        />
        <Stack.Screen
        name="Connexion" 
        component={Connexion}
        options={ styleNav('Connexion', props) }
        />
        <Stack.Screen
        name="Home" 
        component={Home}
        options={(props)=> styleNav('Accueil', props) }
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
    </Stack.Navigator>
  );
}


export {
  MainStackNavigator,
};

const styleNav = (title, props) => {
  if(title == 'Accueil'){
    return (
      {
      title: title,
      headerLeft: null,
      headerRight: ()=>(<TouchableOpacity onPress={()=>props.navigation.navigate('Panier')}>
                          <FontAwesome style={styles.camera3} name='shopping-cart'/>
                          <Text style={styles.rounded}>8</Text>
                        </TouchableOpacity>),
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
  }else if(title == 'Connexion' || title == 'Inscription'){
    return (
      {
      title: title,
      headerLeft: null,
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
  }else if(title == 'run' || title == 'Detail Produit'){
    return (
      {
      headerShown: false,
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


const styles = StyleSheet.create({
  camera3: {
    fontSize: 30,
    color: '#fb7f35',
    borderRadius: 4,
    marginRight: 6,
  },
  rounded:{
    fontSize: 8,
    fontStyle: 'italic',
    backgroundColor: '#248e44',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    position: 'absolute',
    left: -4,
    top: 4,
  },
})