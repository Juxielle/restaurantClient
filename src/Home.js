import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView, View } from 'react-native';
import firebase from 'firebase';

import Produit_home from './composants/Produit_home'
import RoundCat from './composants/RoundCat';

const Home = (props) => {
    const [donnees, setDonnees] = useState([]);

    useEffect(() => {
        var firebaseConfig = {
            apiKey: "AIzaSyBv-sO25zuNtfRUgSDVaRLmZXAayi4vWMg",
            authDomain: "restaurant-5e5c6.firebaseapp.com",
            databaseURL: "https://restaurant-5e5c6-default-rtdb.firebaseio.com",
            projectId: "restaurant-5e5c6",
            storageBucket: "restaurant-5e5c6.appspot.com",
            messagingSenderId: "104661562958",
            appId: "1:104661562958:web:e3150aae2d4028d11b751f"
        };
      
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }else {
            firebase.app(); // if already initialized, use that one
         }
         
        firebase.database().ref('categorie').on('value', (data)=>{
            if(data.toJSON() != null && data.toJSON() != undefined){
                setDonnees(Object.values(data.toJSON()))
            }
        })
    }, [])

    const detailProduit = (id)=>{
        props.navigation.push('ProduitList', {idCat: id})
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cat}>
                {donnees.map((data) => 
                    <TouchableOpacity onPress={()=>detailProduit(donnees.indexOf(data)+1)}>
                        <RoundCat key={donnees.indexOf(data).toString()} datas = {data} couleurT='#248e44' couleurB='#f3f3f1'/>
                    </TouchableOpacity>)
                }
            </View>
            <FlatList
                data = {donnees}
                keyExtractor={item => donnees.indexOf(item).toString()}
                renderItem={({item}) => (
                    <View style={styles.container_prod}>
                        <TouchableOpacity style={styles.produit2} onPress={()=>detailProduit(donnees.indexOf(item)+1)}><Produit_home propriete={item}/></TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    container_prod: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    produit1: {
        flex: 1,
        height: 140,
        marginRight: 2,
    },
    produit2: {
        flex: 1,
        height: 200,
        marginRight: 2,
    },
    btn: {
        flex: 1,
        alignItems: 'flex-end',
        margin: 2,
    },
    search1: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container_mail: {
        flex: 16,
    },
    input: {
        fontSize: 12,
        borderColor: 'gray',
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#fff',
        color: '#fb7f35',
        padding: 2,
        marginLeft: 1,
        marginRight: 8,
    },
    cat:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Home;