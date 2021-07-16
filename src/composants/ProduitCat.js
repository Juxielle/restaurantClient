import React from 'react';
import { StyleSheet, Image, Dimensions, View } from 'react-native';

import Texte from './Texte'

export default class Produit_home extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        const prop = this.props.propriete;

        return (
            <View style={this._get_style().container}>
                <View style={this._get_style().container2}>
                    <View style={this._get_style().texte}>
                        <Texte propriete={[prop.libelle, 12, 'bold', 'normal', 'serif', 'black']}/>
                    </View>

                    <View style={this._get_style().btn_price}>
                        <View style={this._get_style().price}>
                            <Texte propriete={[prop.prix+' F CFA', 14, 'bold', 'italic', 'serif', '#248e44']}/>
                        </View>
                    </View>
                </View>

                <View style={this._get_style().img}>
                    <Image style={this._get_style().img2} source={{uri: prop.url}} />
                </View>
            </View>
        );
    }

    _get_style(){
        return (
            StyleSheet.create({
                img: {
                    flex: 1,
                    alignItems: 'flex-end',
                    borderRadius: 4,
                },
                img2: {
                    width: 80,
                    height: 80,
                    borderRadius: 4,
                },
                container: {
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#f3f3f1',
                    borderRadius: 4,
                    padding: 1,
                },
                container2: {
                    flex: 1,
                },
                texte: {
                    justifyContent: 'center',
                    marginLeft: 2,
                },
                btn_price: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                price: {
                    flex: 1,
                    alignItems: 'flex-start',
                    marginLeft: 2,
                },
                btn: {
                    flex: 1,
                    alignItems: 'flex-end',
                    margin: 2,
                }
            })
        )
    }

}
