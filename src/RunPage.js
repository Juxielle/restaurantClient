import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const RunPage = (props) => {

    useEffect(() => {
        setTimeout(()=>{
            props.navigation.navigate('Connexion')
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <Image
                style = {styles.logo}
                source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-5e5c6.appspot.com/o/max_logo.png?alt=media&token=774fbdec-0266-4dd3-93bb-8c06a0bc4be6'}}
            />
            <Text style = {styles.text}>Manger sain pour une santé saine</Text>
        </View>
    );

}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#248e44',
    },
    logo: {
        width: 150, 
        height: 50,
        borderRadius: 4,
    },
})

export default RunPage;