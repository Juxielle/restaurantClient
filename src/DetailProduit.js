import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

import Texte from './composants/Texte'

const DetailProduit = (props) => {

    const [qte, setQte] = useState(0);
    const produit = props.route.params.produit;
    const id = props.route.params.id;

    useEffect(() => {
        setQte(1);
    }, [])

    const _displayMenu = ()=>{
        props.navigation.navigate('Localisation', {id: id, qte: qte})
    }

    const quantite = (typeBtn)=>{
        if(typeBtn){
            setQte(qte+1);
        }else if(qte>0){
            setQte(qte-1);
        }
    }

    return (
        <View style={_get_style().container}>
            <View style={_get_style().container_img}>
                <Image
                    style={_get_style().img}
                    source={{uri: produit.url}}
                />
            </View>

            <View style={_get_style().container_detail}>
                <View style={_get_style().container_title_price}>
                    <View style={_get_style().title_price}>
                        <View style={_get_style().title}>
                            <Texte propriete={[produit.libelle, 16, 'bold', 'normal', 'serif', 'black']}/>
                        </View>
                        <View style={_get_style().price}>
                            <View style={_get_style().price1}>
                                <Texte propriete={[produit.prix+' F CFA', 25, 'bold', 'normal', 'serif', '#fb7f35']}/>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={_get_style().btn1}>
                    <TouchableOpacity style={_get_style().btn_btn} onPress={()=>quantite(false)}>
                        <Texte propriete={['-', 20, 'bold', 'normal', 'serif', 'white']}/>
                    </TouchableOpacity>
                    <View style={_get_style().btn_btn2}>
                        <Texte propriete={[qte+'', 12, 'bold', 'normal', 'serif', 'black']}/>
                    </View>
                    <TouchableOpacity style={_get_style().btn_btn} onPress={()=>quantite(true)}>
                        <Texte propriete={['+', 20, 'bold', 'normal', 'serif', 'white']}/>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={_get_style().btn2} onPress={()=>_displayMenu()}>
                        <Texte propriete={['Commander maintenant', 20, 'bold', 'normal', 'serif', 'white']}/>
                </TouchableOpacity>
            </View>

        </View>
    );

}

function _get_style(){
    return (
        StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
            },
            container_img: {
                flex: 1,
                borderRadius: 4,
            },
            img: {
                height: 150,
                borderRadius: 4,
            },
            container_detail: {
                flex: 10,
                flexDirection: 'column',
                marginTop: -20,
                borderRadius: 20,
                backgroundColor: '#fff',
            },
            container_title_price: {
                flex: 6,
                flexDirection: 'row',
                paddingTop: 15,
                paddingLeft: 4,
                marginBottom: 4,
            },
            title_price: {
            },
            title: {
                marginBottom: 8,
            },
            price: {
                flexDirection: 'row'
            },
            price1: {
                marginRight: 20,
            },

            container_desc: {
                padding: 4,
                justifyContent: 'center',
                borderRadius: 4,
                backgroundColor: '#f3f3f1',
                marginBottom: 4,
            },
            container_btn: {
                flexDirection: 'row',
                alignItems: 'center',
            },
            btn1: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            btn2: {
                flex: 1,
                backgroundColor: '#fb7f35',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 2,
                borderRadius: 4,
            },

            container_img: {
                flexDirection: 'column',
                marginBottom: 4,
            },

            btn_btn: {
                width: 30,
                height: 30,
                backgroundColor: '#11ac00',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8,
                borderRadius: 4,
            },
            btn_btn2: {
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8,
            },
        })
    )
}

export default DetailProduit;



/*

                <View style={_get_style().container_cat}>
                    <View style={_get_style().texte_cat}>
                        <Texte propriete={['Catégorys', 12, 'bold', 'italic', 'arial', '#11ac00']}/>
                    </View>
                    <View style={_get_style().container_img}>
                        <View style={_get_style().img_cat}><ProduitSimilaire /></View>
                        <View style={_get_style().img_cat}><ProduitSimilaire /></View>
                        <View style={_get_style().img_cat}><ProduitSimilaire /></View>
                        <View style={_get_style().img_cat}><ProduitSimilaire /></View>
                        <View style={_get_style().img_cat}><ProduitSimilaire /></View>
                    </View>
                </View>

*/