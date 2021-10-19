import React, {useState, useEffect} from 'react';
import { StyleSheet, Alert, SafeAreaView, FlatList, Image, TouchableOpacity, View } from 'react-native';

import Commande from './composants/Commande'
import HOST from './host'

const Panier =(props)=> {
    const [donnees, setDonnees] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        fetch(HOST+'listeCommandes.php', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idClient: 2,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setDonnees(responseJson);
        }).catch((error) => {
            Alert.alert(error);
        })
    }, [])

    const handleAjout = (test, etat)=>{
        if(test && etat == 0){
            props.navigation.navigate('Home')
        }else{
            Alert.alert('Vous ne pouvez plus ajouter un produit, car votre commande est déjà confirmée !!')
        }
    }

    const handleDialogPower = (id)=>{
        showAlertDelete('INFORMATION', 'Voulez-vous vraiment supprimer cette commande?', id);
    }

    const showAlertDelete = (title, sms, id)=>{
        Alert.alert(
            title,
            sms,
            [
                {
                    text: 'OUI',
                    onPress: () => console.log(title)
                },
                {
                    text: 'NON',
                    onPress: () => console.log(title)
                }
            ]
        )
    }

    const handleMap = (item)=>{
        props.navigation.navigate('Map3')
    }

    const produit = (item)=>{
        props.navigation.navigate('Commandes', {produits: item})
    }

    const handlechangestate = (item, state, id2)=>{
        if(state == 0){
            /*fetch(HOST+'updateCommande.php', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idCom: id2,
                    })
                }).then((response) => response.json())
                  .then((responseJson) => {
                      Alert.alert(responseJson);
                  }).catch((error) => {
                      Alert.alert(error);
                })*/
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data = {donnees}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.produit} onPress={()=>produit(item)}>
                        <Commande
                            commande={item}
                            handleAjout={handleAjout} 
                            handleDialogPower={handleDialogPower}
                            handleMap={handleMap}
                        />
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
        marginBottom: 20,
        paddingHorizontal: 10,
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