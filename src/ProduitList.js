import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView } from 'react-native';
import firebase from 'firebase'

import ProduitCat from './composants/ProduitCat'
import RoundCat from './composants/RoundCat';

const ProduitList = (props) => {

    const [donnees, setDonnees] = useState([]);
    const [donnees2, setDonnees2] = useState([]);
    const [couleurBack, setCouleurBack] = useState(['#f3f3f1', '#f3f3f1', '#f3f3f1', '#f3f3f1'])
    const [couleurText, setCouleurText] = useState(['#248e44', '#248e44', '#248e44', '#248e44'])
    const id2 = props.route.params.idCat

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

        firebase.database().ref('produis').on('value', (data)=>{
            var dta = [], dnees = [];
            dta = Object.values(data.toJSON())
            dta.forEach((element) => {
                if(element.idCat==props.route.params.idCat){
                    dnees.push(element);
                }
            })
            setDonnees(dnees)
        })

        setTimeout(()=>{
            firebase.database().ref('categorie').on('value', (data)=>{
                setDonnees2(Object.values(data.toJSON()))
            })
        }, 1000)

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
        props.navigation.push('ProduitList', {idCat: id})
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
                flexDirection: 'row',
                marginBottom: 10,
            },
            produit1: {
                flex: 1,
                height: 140,
                marginRight: 2,
            },
            produit2: {
                flex: 1,
                height: 80,
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
                marginBottom: 8,
            },
        })
    )
}

export default ProduitList;