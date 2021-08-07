import React from 'react';
import { StyleSheet, Image, Text, SafeAreaView, TouchableOpacity, FlatList, View } from 'react-native';

const Dialogue = (props) => {

    const message = props.message

    return (
        <View style={styles.container1}>
            <View style={styles.box}>
                <Text style={styles.msg}>Voulez-vous supprimer cet élément ?</Text>
                <View style={styles.cont_btn}>
                    <TouchableOpacity style={styles.btn} onPress={()=>props.handleDialog(true)}>
                        <Text style={styles.btn_msg}>OUI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={()=>props.handleDialog(false)}>
                        <Text style={styles.btn_msg}>NON</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Dialogue

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    box: {
        height: 200,
        backgroundColor: 'grey',
        borderRadius: 4,
        padding: 8,
        margin: 4,
    },
    msg:{
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cont_btn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    btn: {
        height: 50,
        flex: 1,
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn2: {
        height: 50,
        flex: 1,
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_msg: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    }
})