import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Texte from './Texte'
import HOST from '../host'



export default class Produit_home extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        const prop = this.props.propriete;

        return (
            <View style={this._get_style().container}>
                
                <View style={this._get_style().img}>
                    <Image
                    style={this._get_style().img2}
                    source={{uri: HOST+'/img_cat/'+prop.image+'.jpg'}}
                    />
                </View>

                <View style={this._get_style().quantite}>
                    <Texte propriete={['30-35', 18, 'bold', 'normal', 'sans-serif', 'black']}/>
                </View>

                <View style={this._get_style().texte}>
                    <Texte propriete={[prop.libelle, 22, 'bold', 'normal', 'sans-serif', 'black']}/>
                </View>

                <View style={this._get_style().btn_price}>
                    <FontAwesome style={this._get_style().camera3} name='star-o'/>
                    <View style={this._get_style().price}>
                        <Texte propriete={['4.8', 20, 'normal', 'italic', 'sans-serif', 'black']}/>
                    </View>
                    <FontAwesome style={this._get_style().camera3} name='shopping-basket'/>
                    <View style={this._get_style().price}>
                        <Texte propriete={[prop.prix+' f', 20, 'normal', 'italic', 'sans-serif', 'black']}/>
                    </View>
                </View>

                <View style={this._get_style().texte}>
                    <Texte propriete={['€€ - '+prop.libelle, 20, 'normal', 'normal', 'sans-serif-thin', 'black']}/>
                </View>

            </View>
        );
    }

    _get_style(){
        return (
            StyleSheet.create({
                img: {
                    margin: 20,
                },
                img2: {
                    height: 180,
                    borderRadius: 8,
                },
                container: {
                    flex: 1,
                    //backgroundColor: '#f3f3f1',
                },
                texte: {
                    justifyContent: 'center',
                    marginLeft: 2,
                    marginLeft: 20,
                    marginBottom: 5,
                },
                btn_price: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20,
                },
                price: {
                    alignItems: 'flex-start',
                    marginLeft: 2,
                },
                quantite: {
                    height: 50,
                    backgroundColor: '#fff',
                    position: 'absolute',
                    right: 25,
                    top: 10,
                    marginTop: 165,
                    paddingHorizontal: 10,
                    paddingTop: 5,
                    borderRadius: 15,
                },
                camera3: {
                    fontSize: 20,
                    marginLeft: 15,
                  },
            })
        )
    }

}
