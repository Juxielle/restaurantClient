import React, {useState, useEffect} from 'react';
import { StyleSheet, Modal, SafeAreaView, FlatList, Image, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase';

import Commande from './composants/Commande'
import Dialogue from './composants/Dialogue'
//import Map from './Map'

const Panier =(props)=> {

    const prop = props.propriete;
    const [modalVisible, setModalVisible] = useState(false);
    const [donnees, setDonnees] = useState([]);
    const [id, setId] = useState(0);

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
         
        firebase.database().ref('commandes').on('value', (data)=>{
            if(data.toJSON() != null && data.toJSON() != undefined){
                setDonnees(Object.values(data.toJSON()))
            }
        })

    }, [])

    const getTotal = (item)=>{
        let total = 0
        const prod = Object.values(item.produits)
        firebase.database().ref('produis').on('value', (data)=>{
            let dn = []
            if(data.toJSON() != null && data.toJSON() != undefined){
                dn = Object.values(data.toJSON())
                for(let i=0; i<=prod.length-1; i++){
                    for(let j=0; j<=dn.length-1; j++){
                        if(dn[j].id == prod[i].id){
                            total += total + dn[j].prix * prod[i].qte;
                        }
                    }
                } return total;
            }
        });
        setTimeout(()=>{return total}, 2000)
    }

    const handleAjout = (test)=>{
        if(test){
            props.navigation.navigate('Home')
        }
    }

    const handleDialog = (type)=>{
        if(type){
            supprimer(id)
        }
        setModalVisible(false)
    }

    const handleDialogPower = (id)=>{
        setId(id)
        setModalVisible(true)
    }

    const produit = (item)=>{
        props.navigation.navigate('Commandes', {produits: item})
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Dialogue id={id} handleDialog={handleDialog}/>
            </Modal>
                <FlatList
                    data = {donnees}
                    keyExtractor={item => donnees.indexOf(item).toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.produit} onPress={()=>produit(item)}>
                            <Commande commande={item} total={getTotal(item)} handleAjout={handleAjout} handleDialogPower={handleDialogPower}/>
                        </TouchableOpacity>
                    )}
                />
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

export default Panier