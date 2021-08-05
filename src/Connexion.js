import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, Dimensions, View, ScrollView, TouchableOpacity} from 'react-native';
import firebase from 'firebase'

const Connexion = (props)=>{

    const [numero, setNumero] = useState();
    const [password, setPassword] = useState();

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
    }, [])

    const enregistrer = ()=>{
        let id = 0;
        firebase.database().ref('admin/id0').on('value', (data)=>{
            var donnees = [];
            if(data.toJSON() != undefined || data.toJSON() != null){
                donnees = Object.values(data.toJSON())
                if(donnees[3] == password || donnees[2] == numero){
                    props.navigation.navigate('Home')
                }
            }
        })
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Numero de téléphone</Text>
                <View style={styles.cont_num}>
                    <Text style={styles.pre_num}>+241</Text>
                    <TextInput
                        style={styles.search2}
                        onChangeText={setNumero}
                        value={numero}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Mot de passe</Text>
                <TextInput
                    style={styles.search}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity style={styles.btn_success} onPress={()=>enregistrer()}>
                <Text style={styles.compte_social}>Valider</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_mail: {
        flex: 1,
        marginBottom: 20,
        marginLeft: 2,
        padding: 4,
    },
    container_btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 2,
    },
    libelle: {
        fontSize: 14,
        color: '#248e44',
        fontWeight: 'bold',
    },
    search: {
        fontSize: 16,
        fontWeight: 'bold',
        height: 35,
        color: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 2,
    },
    search2: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        height: 35,
        color: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 2,
    },
    btn_success: {
        width: Dimensions.get("window").width,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#248e44',
        padding: 4,
        position: 'fixed',
        bottom: 1,
    },
    compte_social: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    cont_num: {
        flex: 1,
        flexDirection: 'row'
    },
    pre_num: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey',
        marginTop: 8,
        marginRight: 10,
    },
});

export default Connexion;