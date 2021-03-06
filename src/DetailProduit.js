import React, {useEffect, useState} from 'react';
import { StyleSheet, Alert, Image, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import Texte from './composants/Texte'
import HOST from './host'

const DetailProduit = (props) => {

    const [qte, setQte] = useState(1);
    const [quartier, setQuartier] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [donnees, setDonnees] = useState([]);
    const produit = props.route.params.produit;
    const id = props.route.params.id;

    useEffect(() => {
        const index = props.commandes.findIndex(item => item.produit.id === produit.id)
        if(index !== -1){
            setQte(props.commandes[index].quantite);
        }else{
            const action = { type: 'MES_COMMANDES', value: {produit: produit, quantite: qte} }
            props.dispatch(action)
        } 
    }, [])

    const getProduit = (index)=>{
        const prod = Object.values(donnees[index].produits)
        let dn = []
        for(let i=0; i<=prod.length-1; i++){
            dn = [...dn, ['id'+prod[i].id, prod[i]]]
        }
        dn = [...dn, ['id'+produit.id, {id: produit.id, qte: qte}]]
        return Object.fromEntries(dn)
    }

    const ajout_panier = ()=>{
        props.navigation.navigate('Localisation');
    }

    const handleDialog = (nom)=>{
        setQuartier(nom)
        console.log(quartier)
        setModalVisible(false)
    }

    const quantite = (typeBtn)=>{
        if(typeBtn){
            setQte(qte+1);
        }else if(qte>1){
            setQte(qte-1);
        }
    }

    return (
        <View style={_get_style().container}>

            <View style={_get_style().container_img}>
                <Image
                    style={_get_style().img}
                    source={{uri: HOST+'img_prod/'+produit.image+'.jpg'}}
                />
                <TouchableOpacity style={_get_style().contentfleche} onPress={()=>props.navigation.goBack()}>
                    <FontAwesome style={_get_style().fleche} name='arrow-left' />
                </TouchableOpacity>
            </View>

            <View style={_get_style().container_detail}>
                <View style={_get_style().container_title_price}>
                    <View style={_get_style().title_price}>
                        <View style={_get_style().title}>
                            <Texte propriete={[produit.libelle, 20, 'bold', 'normal', 'sans-serif', 'black']}/>
                        </View>
                        <View style={_get_style().price}>
                            <View style={_get_style().price1}>
                                <Texte propriete={[produit.prix+' F CFA', 25, 'bold', 'normal', 'sans-serif', '#248e44']}/>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={_get_style().btn1}>
                    <TouchableOpacity style={_get_style().btn_btn} onPress={()=>quantite(false)}>
                        <Texte propriete={['-', 20, 'bold', 'normal', 'sans-serif', 'white']}/>
                    </TouchableOpacity>
                    <View style={_get_style().btn_btn2}>
                        <Texte propriete={[qte+'', 12, 'bold', 'normal', 'sans-serif', 'black']}/>
                    </View>
                    <TouchableOpacity style={_get_style().btn_btn} onPress={()=>quantite(true)}>
                        <Texte propriete={['+', 20, 'bold', 'normal', 'sans-serif', 'white']}/>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={_get_style().btn2} onPress={()=>ajout_panier()}>
                        <Texte propriete={['COMMANDEZ MAINTENANT', 16, 'bold', 'normal', 'sans-serif', 'white']}/>
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
                height: 200,
            },
            container_detail: {
                flex: 10,
                flexDirection: 'column',
                borderRadius: 20,
                backgroundColor: '#fff',
            },
            container_title_price: {
                flex: 6,
                flexDirection: 'row',
                paddingTop: 4,
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
                backgroundColor: '#248e44',
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
            fleche: {
                fontSize: 30,
                color: '#fff',
            },
            contentfleche: {
                position: 'absolute',
                left: 10,
                top: 40,
            },
        })
    )
}

const mapStateToProps = (state)=>{
    return state != undefined ? { commandes: state.commandes } : { commandes: [] }
}

export default connect( mapStateToProps )(DetailProduit);