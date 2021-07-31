import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, Image, TouchableOpacity, View} from 'react-native';

const Localisation = (props) => {

    const [quartier, setQuartier] = useState('');

    const change_page = ()=>{
        props.handleDialog(quartier)
    }

    return (
        <View style={styles.container}>

            <View style={styles.bloc}>
                <View style={styles.bloc1}>
                    <TextInput
                        style={styles.search}
                        placeholder="Saisir le lieu de livraison"
                        onChangeText={setQuartier}
                    />
                </View>

                <View style={styles.bloc2}>
                    <Image style={styles.img_loc} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-5e5c6.appspot.com/o/map.jpg?alt=media&token=a9e06543-34bb-46b0-849a-9102fa58a806'}} />
                </View>

                <TouchableOpacity style={styles.google} onPress={()=>change_page()}>
                    <Text style={styles.compte_social}>Valider</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_title: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    text_title: {
        fontSize: 15,
        color: 'orange',
    },
    bloc:{
        flex: 10,
        padding: 2,
    },
    bloc1: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 2,
    },
    bloc2: {
        flex: 10,
        borderRadius: 4,
        marginBottom: 2,
    },
    img_loc: {
        height: 300,
        borderRadius: 4,
    },
    google: {
        height: 50,
        borderRadius: 4,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        fontStyle: 'italic',
        backgroundColor: '#248e44',
        margin: 2,
        marginBottom: 2,
    },
    compte_social: {
        fontSize: 20,
        color: '#fff',
    },
    search: {
        height: 50,
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        fontStyle: 'italic',
        fontSize: 20,
        backgroundColor: '#fff',
    },
});

export default Localisation;