import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

import ProduitCat from './composants/ProduitCat'
import RoundCat from './composants/RoundCat';
import Texte from './composants/Texte'
import HOST from './host'

const ProduitList = (props) => {

    const [donnees, setDonnees] = useState([]);
    let donnees2 = props.route.params.donnees
    const [couleurBack, setCouleurBack] = useState(['#f3f3f1', '#f3f3f1', '#f3f3f1', '#f3f3f1'])
    const [couleurText, setCouleurText] = useState(['#248e44', '#248e44', '#248e44', '#248e44'])
    const id2 = props.route.params.idCat
    const libelle = props.route.params.libelle

    useEffect(() => {
        fetch(HOST+'listeProduits.php', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idCat: id2,
            })
        }).then((response) => response.json())
              .then((responseJson) => {
                  setDonnees(responseJson);
              }).catch((error) => {
                  Alert.alert(error);
              })

        let cb = [...couleurBack]
        cb[id2-1] = '#248e44'
        setCouleurBack(cb)

        let ct = [...couleurText]
        ct[id2-1] = '#fff'
        setCouleurText(ct)

    }, [])

    const detailProduit = (prod, id)=>{
        props.navigation.push('DetailProduit', {produit: prod, id: id})
    }

    const detailProduit2 = (id)=>{
        props.navigation.push('ProduitList', {donnees: donnees2, idCat: id, libelle: donnees2[id-1].libelle})
    }

    return (
        <SafeAreaView style={_get_style().container}>
            <View style={_get_style().cat}>
                {donnees2.map((data) =>
                    <TouchableOpacity onPress={()=>detailProduit2(donnees2.indexOf(data)+1)}>
                        <RoundCat
                            key={donnees2.indexOf(data).toString()} 
                            datas = {data}
                            couleurT={couleurText[donnees2.indexOf(data).toString()]}
                            couleurB={couleurBack[donnees2.indexOf(data).toString()]}
                        />
                    </TouchableOpacity>)}
            </View>

            <View style={_get_style().texte}>
                <Texte propriete={[libelle, 22, 'bold', 'normal', 'sans-serif', 'black']}/>
            </View>
            <FlatList
                data = {donnees}
                keyExtractor={item => donnees.indexOf(item).toString()}
                renderItem={({item}) => (
                    <View style={_get_style().container_prod}>
                        <TouchableOpacity style={_get_style().produit2} onPress={()=>detailProduit(item, donnees.indexOf(item))}><ProduitCat propriete={item}/></TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );

}

function _get_style(){
    return (
        StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#fff',
                paddingLeft: 4,
                paddingTop: 4,
            },
            container_prod: {
                height: 140,
                justifyContent: 'center',
                borderTopWidth: 1,
                borderTopColor: 'grey',
                //borderBottomWidth: 1,
                //borderBottomColor: 'grey',
                paddingTop: 20,
                //marginBottom: 30,
            },
            produit1: {
                flex: 1,
                height: 140,
                marginRight: 2,
            },
            produit2: {
                flex: 1,
                marginRight: 2,
                justifyContent: 'center',
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
                marginBottom: 8,
            },
            texte: {
                justifyContent: 'center',
                marginBottom: 30,
                marginLeft: 8,
            },
        })
    )
}

export default ProduitList;