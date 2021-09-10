import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, Image, Picker, View, ScrollView, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import * as SQLite from "expo-sqlite";


function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("db.db");
    return db;
}
  
const db = openDatabase();


const CodeNumber = (props)=>{

    const [code, setCode] = useState();
    const user = {}//props.route.params.user;

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

        /*db.transaction(
            (tx) => {
                tx.executeSql(
                    "create table if not exists numeros (id integer primary key not null, numero int);"
                );
                tx.executeSql("select * from numeros where id = ?", [0], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
        );*/
    }, [])

    const enregistrer = ()=>{
        if(user.type && code == user.code){
            let id = 0
            firebase.database().ref('clients').on('value', (data)=>{
                let donnees = [];
                if(data.toJSON() != undefined || data.toJSON() != null){
                    donnees = Object.values(data.toJSON())
                    for(let i=0; i<=donnees.length-1; i++){
                        if(id < donnees[i].id){ id = donnees[i].id; }
                    }
                    firebase.database().ref('clients/id'+id).set({
                        id: id,
                        nom: user.nom,
                        prenom: user.prenom,
                        numero: user.numero,
                        password: 'client',
                        url: iser.url,
                    }).then(()=> props.navigation.navigate('Home'))
                }
            })
        }else if(code == user.code){ 
            props.navigation.navigate('Home');
        }
        /*if(numero != ''){
            db.transaction(
                (tx) => {
                    //tx.executeSql("insert into numeros (id, numero) values (0, ?)", [numero]);
                    tx.executeSql("select * from numeros", [], (_, { rows }) =>
                        console.log(JSON.stringify(rows))
                    );
                },
            );
        }*/
    }

    return (
        <View style={styles.container}>

            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Saisissez le code</Text>
                <TextInput
                    style={styles.search}
                    onChangeText={setCode}
                    value={code}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.container_btn}>
                <TouchableOpacity style={styles.btn_success} onPress={()=>enregistrer()}>
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
    container_mail: {
        flex: 8,
        marginBottom: 20,
        marginLeft: 2,
        padding: 4,
    },
    container_btn: {
        flex: 1,
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
    btn_success: {
        flex: 1,
        height: 40,
        borderRadius: 4,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#248e44',
        padding: 4,
    },
    compte_social: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default CodeNumber;