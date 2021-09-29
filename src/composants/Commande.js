import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Texte from './Texte'
import HOST from '../host'

const Commande =(props)=> {

    const com = props.commande
    const [etat, setEtat] = useState(com.etat)
    const [total, setTotal] = useState(0);
    const [nbreProduits, setNbreProduits] = useState(0);

    useEffect(()=>{
        fetch(HOST+'calculTotalCom.php', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idCommande: com.id,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setTotal(responseJson[0]);
            setNbreProduits(responseJson[1]);
        }).catch((error) => {
            Alert.alert(error);
        })
    }, [])

    const stringForEtat = ()=>{
        if(etat == 0) return {text: 'Commandez maintenant', color: '#248e44'};
        else if(etat == 1) return {text: '...Attente de confirmation', color: 'grey'};
        else return {text: '...Attente de livraison', color: 'grey'};
    }

    return (
        <View style={styles.container}>
            <View style={styles.texte}>
                <Texte propriete={['ID: IDMAX00'+com.id, 16, 'bold', 'italic', 'sans-serif', '#0d4b85']}/>
                <Texte propriete={['Nombre de produits: '+nbreProduits, 14, 'bold', 'italic', 'sans-serif', '#248e44']}/>
                <Texte propriete={['Date: '+com.date, 14, 'bold', 'italic', 'sans-serif', '#248e44']}/>
                <Texte propriete={['Heure: '+com.heure, 14, 'bold', 'italic', 'sans-serif', '#248e44']}/>
                <Texte propriete={['Total à payer: '+total+' Frs', 15, 'bold', 'italic', 'sans-serif', '#c60000']}/>
                
                <TouchableOpacity style={[styles.contentBtn2, {backgroundColor: stringForEtat().color}]} onPress={()=>props.handlechangestate(com, etat, id)}>
                    <Text style={styles.btn}>{stringForEtat().text}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content_btn}>
                <TouchableOpacity onPress={()=>props.handleMap(com)}>
                    <FontAwesome style={styles.map} name='map-marker'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.handleAjout(true, com.etat)}>
                    <FontAwesome style={styles.add} name='plus-square'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.handleDialogPower(com.id)}>
                    <FontAwesome style={styles.trash} name='trash'/>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f3f3f1',
        padding: 1,
        borderRadius: 4,
    },
    texte: {
        flex: 2,
        flexDirection: 'column',
        margin: 2,
    },

    content_btn: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 4,
    },
    add: {
        fontSize: 24,
        color: '#248e44',
        borderRadius: 4,
        marginRight: 6,
    },
    map: {
        fontSize: 25,
        color: '#0d4b85',
        borderRadius: 4,
        marginLeft: 2,
    },
    trash: {
        fontSize: 24,
        color: '#c60000',
        borderRadius: 4,
        marginLeft: 2,
    },
    contentBtn2: {
        height: 20,
        margin: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        fontSize: 12,
        fontStyle: 'italic',
        fontFamily: 'sans-serif',
        color: '#fff',
    },
})

export default Commande