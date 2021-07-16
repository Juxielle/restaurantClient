import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, Image, Picker, View, ScrollView, TouchableOpacity} from 'react-native';
import firebase from 'firebase'

const Inscription = (props)=>{

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [numero, setNumero] = useState();
    const [password, setPassword] = useState();
    const [reapetPassword, setReapetPassword] = useState();

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
        const id = 0
        if(password == reapetPassword){
            firebase.database().ref('admin/id'+id).set({
                id: id,
                nom: nom,
                numero: numero,
                prenom: prenom,
                password: password,
                url: 'https://firebasestorage.googleapis.com/v0/b/restaurant-5e5c6.appspot.com/o/icons%2Fuser.png?alt=media&token=1d7cb465-7ec3-4881-9a32-0b6041663c0a',
            })
    
            props.navigation.navigate('Connexion')
        }
    }

    const annuler = ()=>{
        
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Nom</Text>
                <TextInput
                    style={styles.search}
                    onChangeText={setNom}
                />
            </View>

            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Prenom</Text>
                <TextInput
                    style={styles.search}
                    onChangeText={setPrenom}
                />
            </View>

            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Numero</Text>
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

            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Repeter le mot de passe</Text>
                <TextInput
                    style={styles.search}
                    onChangeText={setReapetPassword}
                    value={reapetPassword}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity style={styles.container_img}>
                <Image
                    style={styles.img}
                    source={{uri:'https://firebasestorage.googleapis.com/v0/b/restaurant-5e5c6.appspot.com/o/amburger2.jpg?alt=media&token=2fb270d8-37f6-423d-ab1d-a60bb9b5bf38'}}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.container_img}>
                <Image
                    style={styles.camera}
                    source={{uri:'https://firebasestorage.googleapis.com/v0/b/restaurant-5e5c6.appspot.com/o/icons%2Ffolder.png?alt=media&token=ceca8731-d02e-4951-93f9-0b0bd20295ed'}}
                />
                <Text style={styles.camera_text}>Choisir une image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container_img}>
                <Image
                    style={styles.camera}
                    source={{uri:'https://firebasestorage.googleapis.com/v0/b/restaurant-5e5c6.appspot.com/o/icons%2Fcamera.png?alt=media&token=238ca6e2-3496-46ce-b66e-85ed8816a8d2'}}
                />
                <Text style={styles.camera_text}>Prende une photo</Text>
            </TouchableOpacity>

            <View style={styles.container_btn}>
                <TouchableOpacity style={styles.btn_success} onPress={()=>enregistrer()}>
                    <Text style={styles.compte_social}>Valider</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_cancel} onPress={()=>annuler()}>
                    <Text style={styles.compte_social}>Annuler</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_mail: {
        marginBottom: 20,
        marginLeft: 2,
        padding: 4,
    },
    container_mail2: {
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        padding: 2,
    },
    container_comment: {
        marginBottom: 4,
        marginLeft: 2,
        padding: 4,
    },
    container_btn: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
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
    btn_cancel: {
        flex: 1,
        height: 30,
        borderRadius: 4,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e57373',
        marginLeft: 10,
        padding: 4,
    },
    btn_success: {
        flex: 1,
        height: 30,
        borderRadius: 4,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#248e44',
        marginRight: 10,
        padding: 4,
    },
    compte_social: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    container_img: {
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 10,
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    camera: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    camera_text: {
        fontSize: 10,
        fontStyle: 'italic',
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

export default Inscription;