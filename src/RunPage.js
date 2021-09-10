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
                tx.executeSql("select * from numeros where id = 0", [], (_, { rows }) =>{
                    setNumero(rows._array[0].numero)
                });
            },
        );

        setTimeout(()=>{
            if(numero != null) props.navigation.navigate('Connexion');
            else props.navigation.navigate('Connexion');
        }, 2100)
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