import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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

const RunPage = (props) => {

    const [numero, setNumero] = useState(null)

    useEffect(() => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "create table if not exists numeros (id integer primary key not null, numero varchar);"
                );
            },
        );

        /*setTimeout(()=>{
            db.transaction(
                (tx) => {
                    tx.executeSql("select numero from numeros where id = 0", [], (_, { rows }) =>{
                        setNumero(rows._array[0].numero)
                        console.log(numero)
                    });
                },
            );
        }, 1000)*/

        setTimeout(()=>{
            //console.log(numero)
            //if(numero != null) props.navigation.navigate('Connexion', {num: numero});
            //else props.navigation.navigate('Connexion', {numero: numero});
            props.navigation.navigate('Home')
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <Image
                style = {styles.logo}
                source = {require('../assets/max_logo.png')}
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
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#C1BCBC',
    },
    logo: {
        width: 100, 
        height: 35,
        borderRadius: 4,
    },
})

export default RunPage;