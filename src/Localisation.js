import React, {useEffect, useState} from 'react';
import { StyleSheet, Alert, Text, TextInput, Image, View, ScrollView, TouchableOpacity, Button} from 'react-native';


const Localisation = (props)=>{

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [numero, setNumero] = useState();
    const [url, setUrl] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {

    }, [])

    const commander = ()=>{
        Alert.alert(
            "Information",
            "Veuillez confirmer votre commande !!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                /*fetch(HOST+'addCommande.php', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idProduit: produit.id,
                        nombre: qte,
                        idClient: 2,
                        idLivraison: 1,
                        etat: 0,
                    })
                }).then((response) => response.json())
                  .then((responseJson) => {
                      Alert.alert(responseJson);
                  }).catch((error) => {
                      Alert.alert(error);
                })*/
                //Alert.alert('Enregistrement effectué avec succès !!')
              } }
            ]
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contTitle}>
                    <Text style={styles.titleT}>VOTRE POSITION ACTUELLE</Text>
                </View>
                <View style={styles.container_seach}>
                    <TextInput
                        style={styles.search}
                        onChangeText={setNom}
                        placeholder = 'COMMUNE'
                    />
                </View>
                <View style={styles.container_seach}>
                    <TextInput
                        style={styles.search}
                        onChangeText={setNom}
                        placeholder = 'QUARTIER'
                    />
                </View>
                <View style={styles.container_seach}>
                    <TextInput
                        style={styles.search}
                        onChangeText={setNom}
                        placeholder = 'CARREFOUR'
                    />
                </View>
                <View style={styles.container_seach}>
                    <TextInput
                        style={styles.search}
                        onChangeText={setNom}
                        placeholder = 'LIEU POPULAIRE'
                    />
                </View>
            </View>

            <View style={styles.container_btn}>
                <Button
                    color='green'
                    title='COMMANDER MAINTENANT'
                    onPress={()=>commander()}
                    />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    container_btn: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 2,
        marginTop: 100,
    },
    search: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a9a9a9',
    },
    container_seach: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#a9a9a9',
        paddingHorizontal: 8,
        backgroundColor: '#f0ffff',
        marginTop: 20,
    },
    content: {
        flex: 1,
    },
    titleT: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
    },
    contTitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'orange',
        marginTop: 20,
    },
});

export default Localisation;