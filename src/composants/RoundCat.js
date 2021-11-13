import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

import HOST from '../host'

const RoundCat = (props)=> {
    
    return (
        <View style={[{borderColor: props.couleurB, borderWidth: 1}, styles.container]}>
            <Image
                style={styles.img}
                source = {{uri: HOST+'img_cat/'+props.datas.image+'.jpg'}}
            />
            <Text 
                style={[{color: props.couleurT}, styles.texte]}
            >
                {props.datas.libelle}
            </Text>
        </View>
    )

}

const styles =  StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 4,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 4,
        padding: 2,
        borderRadius: 4,
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    texte: {
        fontSize: 12,
        fontStyle: 'italic',
    },
})

export default RoundCat;