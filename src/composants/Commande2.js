import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, Alert, Image, TouchableOpacity, View, Text } from 'react-native';

import HOST from '../host'

const Commande =(props)=> {

    const com = props.commande
    const [etat, setEtat] = useState(com.etat)
    const [total, setTotal] = useState(0);
    const [nbreProduits, setNbreProduits] = useState(0);
    const [produits, setProduids] = useState([]);

    useEffect(()=>{
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
              Alert.alert('Une erreur est survenu lors du chargement !!');
        })
    }, [])

    const stringForEtat = ()=>{
        if(etat == 0) return {text: 'Commandez maintenant', color: '#248e44'};
        else if(etat == 1) return {text: '...Attente de confirmation', color: 'grey'};
        else return {text: '...Attente de livraison', color: 'grey'};
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentNumAvatar}>
                <View style={styles.contentNum}>
                    <Text style={styles.lbNum}>Order #{com.id}</Text>
                    <Text style={styles.lbSubText}>{com.date}, {com.heure} FM</Text>
                </View>
                <View style={styles.contentAvatar}>
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/profile.png')}
                    />
                </View>
            </View>
            <FlatList
                data = {produits}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <View style={styles.contentNumAvatar}>
                        <View style={styles.contentProduit}>
                            <Image
                                style={styles.imgProduit}
                                source={{uri: HOST+'img_prod/'+item.image+'.jpg'}}
                            />
                        </View>
                        <View style={styles.contentDetail}>
                            <Text style={styles.lbNum}>{item.libelle}</Text>
                            <Text style={styles.lbSubText}>Aliment 100% Bio</Text>
                            <View style={styles.contentPrice}>
                                <Text style={styles.lbPrice}>{item.prix} Fcfa</Text>
                                <Text style={styles.lbQte}>Qty: 1</Text>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View style={styles.contentNumAvatar}>
                <View style={styles.contentNum}>
                    <Text style={styles.lbSubText}>X2 Items</Text>
                    <Text style={styles.lbNum}>$10.50</Text>
                </View>
                <TouchableOpacity style={styles.contentAvatar} onPress={()=>props.handleMap(com)}>
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/location.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentAvatar}>
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/accept.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentAvatar}>
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/cancel.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    },
    contentNumAvatar: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    contentNum: {
        flexDirection: 'column',
    },
    lbNum: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#040404'
    },
    lbSubText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#C1BCBC'
    },
    contentAvatar: {
        flex: 1,
        alignItems: 'flex-end'
    },
    contentProduit: {
        alignItems: 'flex-start',
    },
    contentDetail: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#8D8585',
        marginBottom: 5,
    },
    avatar: {
        width: 35,
        height: 35
    },
    imgProduit: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    contentPrice: {
        flexDirection: 'row',
        marginTop: 10,
    },
    lbPrice: {
        flex: 1,
        alignItems: 'flex-start',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#040404'
    },
    lbQte: {
        flex: 1,
        alignItems: 'flex-end',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#040404'
    },
})

export default Commande