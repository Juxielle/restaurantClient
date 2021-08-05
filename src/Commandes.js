import React, {useEffect, useState}  from 'react';
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase'

import Produit_panier from './composants/Produit_panier'

const Commandes =(props)=> {

    const [produits, setProduids] = useState([]);
    const com = props.route.params.produits
    const prod = Object.values(com.produits)

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
         
        firebase.database().ref('produis').on('value', (data)=>{
            let dn = [], dn2 = []
            if(data.toJSON() != null && data.toJSON() != undefined){
                dn = Object.values(data.toJSON())
                for(let i=0; i<=prod.length-1; i++){
                    for(let j=0; j<=dn.length-1; j++){
                        if(dn[j].id == prod[i].id){
                            dn2 = [...dn2, dn[j]];
                        }
                    }
                }
                setProduids(dn2)
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content_prod}>
                <FlatList
                    data = {produits}
                    keyExtractor={item => produits.indexOf(item).toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.produit}><Produit_panier produit={item} nombre={prod[produits.indexOf(item)].qte}/></TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 2,
        paddingTop: 8,
    },
    produit: {
        marginBottom: 8,
    },
    content_prod: {
        flex: 13,
    },
    content_btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Commandes