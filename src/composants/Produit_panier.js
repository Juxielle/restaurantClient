import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Texte from './Texte'

const Produit_panier =(props)=> {

    const prop = props.produit;
    const nombre = props.nombre

    return (
        <View style={styles.container}>
            <View style={styles.img}>
                <Image style={styles.img} source={{uri: prop.url}} />
            </View>
            <View style={styles.texte}>
                <Texte propriete={[prop.libelle, 14, 'bold', 'italic', 'sans serif', '#248e44']}/>
                <Texte propriete={[prop.prix+' F CFA', 12, 'bold', 'italic', 'sans serif', '#0d4b85']}/>
                <Texte propriete={['Nombre: '+nombre, 12, 'bold', 'italic', 'sans serif', '#c60000']}/>
            </View>

            <View style={styles.content_btn}>
                <TouchableOpacity onPress={()=>editer()}>
                    <FontAwesome style={styles.add} name='plus-square'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.handleDialogPower(props.id)}>
                    <FontAwesome style={styles.minus} name='minus-square'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.handleDialogPower(props.id)}>
                    <FontAwesome style={styles.trash} name='trash'/>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    img: {
        width: 75,
        height: 75,
        borderRadius: 4,
    },
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
        fontSize: 23,
        color: '#248e44',
        borderRadius: 4,
    },
    minus: {
        fontSize: 23,
        color: '#0d4b85',
        borderRadius: 4,
    },
    trash: {
        fontSize: 23,
        color: '#c60000',
        borderRadius: 4,
        marginLeft: 1,
    },
})

export default Produit_panier