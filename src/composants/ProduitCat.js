import React from 'react';
import { StyleSheet, CheckBox, Image, TouchableOpacity, View } from 'react-native';

import Texte from './Texte'
import HOST from '../host'
import { connect } from 'react-redux';

const ProduitCat = (props)=> {

    const prop = props.propriete;
    const [isSelected, setSelection] = React.useState(false);
    const [qte, setQte] = React.useState(0);
    const [colorBtn, setColorBtn] = React.useState('grey');

    React.useEffect(() => {
        const index = props.commandes.findIndex(item => item.produit.id === prop.id)
        if(index !== -1){
            setQte(props.commandes[index].quantite); setSelection(true); setColorBtn('#11ac00');
        }else{ 
            setQte(0); setSelection(false); setColorBtn('grey');
        } 
    }, [])

    const quantite = (typeBtn)=>{
        if(typeBtn && isSelected){
            setQte(qte+1);
            const action = { type: 'MODIFIER_QTE', value: {produit: prop, quantite: qte+1} }
            props.dispatch(action)
        }else if(qte>0 && isSelected){
            setQte(qte-1);
            const action = { type: 'MODIFIER_QTE', value: {produit: prop, quantite: qte-1} }
            props.dispatch(action)
        }
    }

    const selected = () => {
        //On ajoute à la variable globale de la commande
        const index = props.commandes.findIndex(item => item.produit.id == prop.id)
        if(index !== -1){
            setQte(0); setSelection(false); setColorBtn('grey');
        }else{ 
            setQte(1); setSelection(true); setColorBtn('#11ac00');
        }
        const action = { type: 'MES_COMMANDES', value: {produit: prop, quantite: qte} }
        props.dispatch(action)
    }

    return (
        <View style={_get_style().container}>
            <View style={_get_style().container2}>
                <View style={_get_style().texte}>
                    <Texte propriete={[prop.libelle, 20, 'bold', 'normal', 'sans-serif', 'black']}/>
                </View>

                <View style={_get_style().texte}>
                    <Texte propriete={['Saved with French fries', 17, 'normal', 'normal', 'sans-serif', 'black']}/>
                </View>

                <View style={_get_style().btn1}>
                    <View style={_get_style().price}>
                        <Texte propriete={[prop.prix+' f cfa', 20, 'bold', 'italic', 'sans-serif', '#248e44']}/>
                    </View>

                    <TouchableOpacity style={[_get_style().btn_btn, {backgroundColor: colorBtn}]} onPress={()=>quantite(false)}>
                        <Texte propriete={['-', 20, 'bold', 'normal', 'serif', 'white']}/>
                    </TouchableOpacity>
                    <View style={_get_style().btn_btn2}>
                        <Texte propriete={[qte+'', 12, 'bold', 'normal', 'serif', 'black']}/>
                    </View>
                    <TouchableOpacity style={[_get_style().btn_btn, {backgroundColor: colorBtn}]} onPress={()=>quantite(true)}>
                        <Texte propriete={['+', 20, 'bold', 'normal', 'serif', 'white']}/>
                    </TouchableOpacity>
                </View>
                
            </View>

            <View style={_get_style().img}>
                <CheckBox
                    value={isSelected}
                    onValueChange={selected}
                    style={_get_style().checkbox}
                />
                <Image
                style={_get_style().img2}
                source={{uri: HOST+'img_prod/'+prop.image+'.jpg'}}
                />
            </View>
        </View>
    );
}

//Relier les données de notre state global aux props du component
//Dès que le state global change, il est mapper automatiquement dans les props du component
const mapStateToProps = (state)=>{
    return state != undefined ? { commandes: state.commandes } : { commandes: [] }
}

export default connect( mapStateToProps )(ProduitCat);

const _get_style = ()=>{
    return (
        StyleSheet.create({
            img: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                borderRadius: 4,
            },
            img2: {
                width: 90,
                height: 100,
                borderRadius: 4,
            },
            container: {
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 4,
                paddingHorizontal: 8,
            },
            container2: {
                flex: 1,
            },
            texte: {
                justifyContent: 'center',
                marginLeft: 2,
                marginBottom: 6,
            },
            btn_price: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
            price: {
                //flex: 1,
                //alignItems: 'flex-start',
                marginLeft: 2,
            },
            btn: {
                flex: 1,
                alignItems: 'flex-end',
                margin: 2,
            },
            btn1: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            btn_btn2: {
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8,
            },
            btn_btn: {
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8,
                borderRadius: 4,
            },
        })
    )
}
