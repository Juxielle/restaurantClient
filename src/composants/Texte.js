import React from 'react';
import { StyleSheet, Text, Dimensions, View } from 'react-native';

export default class Texte extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        const prop = this.props.propriete;

        return (
        <Text style={this._get_style(
            prop[1],
            prop[2],
            prop[3],
            prop[4],
            prop[5]
        ).container}>{prop[0]}</Text>
        );
    }

    _get_style(size, weight, style, fam, col){
        return (
            StyleSheet.create({
                container: {
                    color: col,
                    fontSize: size,
                    fontStyle: style,
                    fontWeight: weight,
                    fontFamily: fam,
                },
            })
        )
    }

}
