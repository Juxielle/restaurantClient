import * as React from 'react';
import { StyleSheet, Text, Picker, View } from 'react-native';
//import {executeAction} from '../serveurs/Serveur'

export default function FPicker(props) {
    const [selectedValue, setSelectedValue] = React.useState("java");

    return (
        <View style={styles.contForm}>
            <Text style={styles.titleForm}>COMMUNE</Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.form}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    contForm: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    titleForm: {
        fontSize: 20,
        fontFamily: 'sans-serif',
    },
    form: {
        borderRadius: 4,
        height: 40,
        fontSize: 24,
        fontFamily: 'sans-serif',
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: 'black',
    },
})