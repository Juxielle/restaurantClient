import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Alert, TouchableOpacity, FlatList, SafeAreaView, View } from 'react-native';

import Produit_home from './composants/Produit_home'
import RoundCat from './composants/RoundCat';
import HOST from './host'

const Home = (props) => {
    const [donnees, setDonnees] = useState([]);

    useEffect(() => {
        fetch(HOST+'dataList.php')
              .then((response) => response.json())
              .then((responseJson) => {
                  setDonnees(responseJson);
              }).catch((error) => {
                  console.log(error);
              })
    }, [])

    const detailProduit = (id)=>{
        props.navigation.push('ProduitList', {donnees: donnees, idCat: id, libelle: donnees[id-1].libelle})
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cat}>
                {donnees.map((data) => 
                    <TouchableOpacity onPress={()=>detailProduit(donnees.indexOf(data)+1)}>
                        <RoundCat key={donnees.indexOf(data).toString()} datas = {data} couleurT='#248e44' couleurB='#f3f3f1'/>
                    </TouchableOpacity>)
                }
            </View>
            <FlatList
                data = {donnees}
                keyExtractor={item => donnees.indexOf(item).toString()}
                renderItem={({item}) => (
                    <View style={styles.container_prod}>
                        <TouchableOpacity style={styles.produit2} onPress={()=>detailProduit(donnees.indexOf(item)+1)}><Produit_home propriete={item}/></TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    container_prod: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    produit1: {
        flex: 1,
        height: 140,
        marginRight: 2,
    },
    produit2: {
        flex: 1,
        marginRight: 2,
    },
    btn: {
        flex: 1,
        alignItems: 'flex-end',
        margin: 2,
    },
    search1: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container_mail: {
        flex: 16,
    },
    input: {
        fontSize: 12,
        borderColor: 'gray',
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#fff',
        color: '#fb7f35',
        padding: 2,
        marginLeft: 1,
        marginRight: 8,
    },
    cat:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Home;