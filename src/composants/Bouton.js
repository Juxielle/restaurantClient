import React from 'react';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import Texte from './Texte'

export default class Bouton extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View>{this._get_btn()}</View>
        );
    }

    _get_btn(){
        const prop = this.props.propriete;
        return(
            <View style={this._get_style(
                prop[2],
                prop[3],
                prop[4],
                prop[5]
            ).container_btn}>
                <Texte propriete={[prop[0], prop[1], 'bold', 'normal', 'serif', prop[3]]}/>
            </View>
        );
    }

    _get_style(color_fond, color_text, raduis, pad){
        return (
            StyleSheet.create({
                container_btn: {
                    flex: 1,
                    color: color_text,
                    backgroundColor: 'orange',
                    backgroundColor: color_fond,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: raduis,
                    padding: pad,
                },
            })
        )
    }

}
