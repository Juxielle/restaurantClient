import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Texte from './Texte'

const Commande =(props)=> {

    const com = props.commande
    const prod = Object.values(com.produits)

    return (
        <View style={styles.container}>
            <View style={styles.texte}>
                <Texte propriete={['Identifiant: IDMAX00'+com.id, 14, 'bold', 'italic', 'sans serif', '#0d4b85']}/>
                <Texte propriete={['Prix de livraison: '+com.frais+' Frs', 12, 'bold', 'italic', 'sans serif', '#248e44']}/>
                <Texte propriete={['Nombre de produits: '+prod.length, 12, 'bold', 'italic', 'sans serif', '#248e44']}/>
                <Texte propriete={['Minutes: '+com.duree+'mins', 12, 'bold', 'italic', 'sans serif', '#248e44']}/>
                <Texte propriete={['Total à payer: '+props.total+' Frs', 14, 'bold', 'italic', 'sans serif', '#c60000']}/>
            </View>

            <View style={styles.content_btn}>
                <TouchableOpacity onPress={()=>editer()}>
                    <FontAwesome style={styles.map} name='map-marker'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.handleAjout(true)}>
                    <FontAwesome style={styles.add} name='plus-square'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.handleDialogPower(props.id)}>
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
})

export default Commande