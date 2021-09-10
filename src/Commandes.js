import React, {useEffect, useState}  from 'react';
import { StyleSheet, Alert, SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';

import Produit_panier from './composants/Produit_panier'
import HOST from './host'

const Commandes =(props)=> {

    const [produits, setProduids] = useState([]);
    const com = props.route.params.produits
    
    useEffect(() => {
        fetch(HOST+'produitsCommande.php', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idCommande: com.id,
            })
        }).then((response) => response.json())
          .then((responseJson) => {
              setProduids(responseJson);
          }).catch((error) => {
              Alert.alert(error);
        })
    }, [])

    const handleDialogPower = (id)=>{
        showAlertDelete('INFORMATION', 'Voulez-vous vraiment supprimer ce produit de la commande?', id);
    }

    const showAlertDelete = (title, sms, id)=>{
        Alert.alert(
            title,
            sms,
            [
                {
                    text: 'OUI',
                    onPress: () => {
                        console.log('');
                    }
                },
                {
                    text: 'NON',
                    onPress: () => console.log(title)
                }
            ]
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content_prod}>
                <FlatList
                    data = {produits}
                    keyExtractor={item => produits.indexOf(item).toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.produit}>
                            <Produit_panier produit={item} handleDialogPower={handleDialogPower}/>
                        </TouchableOpacity>
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

export default Commandes