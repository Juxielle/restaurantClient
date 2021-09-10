import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, Alert, View, ScrollView, TouchableOpacity} from 'react-native';
import firebase from 'firebase'
import * as SMS from 'expo-sms';
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

const Connexion = (props)=>{

    const [numero, setNumero] = useState();

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

    const genereCode = ()=>{
        const codep1 = Math.floor(Math.random() * (999 - 100) + 100);
        const codep2 = Math.floor(Math.random() * (999 - 100) + 100);
        return codep1.toString() +' '+ codep2.toString();
    }

    const handleSend = async (num, code)=> {
        const numbersArr = [num];
        const isAvailable = await SMS.isAvailableAsync()
        if (isAvailable) {
          while (numbersArr.length > 0) {
            const n = numbersArr.pop()
            const result = await SMS.sendSMSAsync(n, 'Bienvenu sur MAXI\'IN APP\n\t Votre code est: '+code);
            console.log('results', result)
          }
        } else {
          // misfortune... there's no SMS available on this device
        }
    }

    const showAlertInfo = (title, sms)=>{
        Alert.alert(
            title,
            sms,
            [
                {
                    text: 'COMPRIS',
                    onPress: () => console.log(title)
                }
            ]
        )
    }

    const enregistrer = ()=>{
        firebase.database().ref('clients').on('value', (data)=>{
            let donnees = [];
            if(data.toJSON() != undefined || data.toJSON() != null){
                donnees = Object.values(data.toJSON())
                for(let i=0; i<=donnees.length-1; i++){
                    if(numero == donnees[i].numero){
                        db.transaction(
                            (tx) => {
                                tx.executeSql("insert into numeros (id, numero) values (0, ?)", [numero]);
                                setTimeout(()=>{
                                    props.navigation.navigate('Home');
                                }, 2100)
                            },
                        ); break;
                    }else if(i == donnees.length-1){
                        showAlertInfo('Information', 'Numero non reconnu !!\nEnregistrez-vous si vous n\'avez pas de compte');
                    }
                }
            }
        })
    }

    return (
        <View style={styles.container}>
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

            <View style={styles.container_btn}>
                <TouchableOpacity style={styles.btn_success} onPress={()=>enregistrer()}>
                    <Text style={styles.compte_social}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_cancel} onPress={()=>props.navigation.navigate('Inscription')}>
                    <Text style={styles.compte_social}>S'enregistrer</Text>
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
        justifyContent: 'center',
        padding: 4,
    },
    container_btn: {
        flex: 1,
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
        height: 40,
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
        height: 40,
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