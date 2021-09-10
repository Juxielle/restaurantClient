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
                        <Texte propriete={[prop.libelle, 20, 'bold', 'normal', 'sans-serif', 'black']}/>
                    </View>

                    <View style={this._get_style().texte}>
                        <Texte propriete={['Saved with French fries', 17, 'normal', 'normal', 'sans-serif', 'black']}/>
                    </View>

                    <View style={this._get_style().btn_price}>
                        <View style={this._get_style().price}>
                            <Texte propriete={[prop.prix+' f cfa', 20, 'bold', 'italic', 'sans-serif', '#248e44']}/>
                        </View>
                    </View>
                    
                </View>

                <View style={this._get_style().img}>
                    <Image
                    style={this._get_style().img2}
                    source={{uri: 'http://192.168.1.64/restaurant_max/img_prod/'+prop.image+'.jpg'}}
                    />
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
