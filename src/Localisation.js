import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Picker, Image, TouchableOpacity, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FPicker from './composants/FPicker';


const Localisation = (props)=>{

    const [commune, setCommune] = useState('Libreville');
    const [quartier, setQuartier] = useState('Azangue');
    const [carrefour, setCarrefour] = useState('show-show');
    const [lieu, setLieu] = useState('CKADO');
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
    <View style={styles.container}>
        <View style={styles.content_logo}>
            <Image
                style={styles.logo}
                source={require('../assets/max_logo.png')}
            />
        </View>
        <ScrollView style={styles.contentForm}>
            <View style={styles.contentNumAvatar}>
                <Text style={styles.lbNum}>Votre position précise</Text>
            </View>

            <View style={styles.contentField}>
                <Text style={styles.lbTitle}>Commune</Text>
                <View style={styles.field}>
                    <Picker
                        selectedValue={commune}
                        style={styles.search}
                        onValueChange={(itemValue, itemIndex) => setCommune(itemValue)}
                    >
                        <Picker.Item label="Libreville" value="libreville" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
            </View>
            <View style={styles.contentField}>
                <Text style={styles.lbTitle}>Quertier</Text>
                <View style={styles.field}>
                    <Picker
                        selectedValue={quartier}
                        style={styles.search}
                        onValueChange={(itemValue, itemIndex) => setQuartier(itemValue)}
                    >
                        <Picker.Item label="Ozangue" value="ozangue" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
            </View>
            <View style={styles.contentField}>
                <Text style={styles.lbTitle}>Carrefour</Text>
                <View style={styles.field}>
                    <Picker
                        selectedValue={carrefour}
                        style={styles.search}
                        onValueChange={(itemValue, itemIndex) => setCarrefour(itemValue)}
                    >
                        <Picker.Item label="Show-show" value="show-show" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
            </View>
            <View style={styles.contentField}>
                <Text style={styles.lbTitle}>Lieu populaire</Text>
                <View style={styles.field}>
                    <Picker
                        selectedValue={lieu}
                        style={styles.search}
                        onValueChange={(itemValue, itemIndex) => setLieu(itemValue)}
                    >
                        <Picker.Item label="CKDO" value="ckdo" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
            </View>
            <View style={styles.contentField}>
                <Text style={styles.lbTitle}>Précision</Text>
                <View style={styles.field}>
                    <TextInput
                        style={styles.search}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.contentBtn}>
                <Text style={styles.lbBtn}>Commander maintenant</Text>
            </TouchableOpacity>

            <View style={styles.contentMap}>
                <Image
                    style={styles.avatar}
                    source={require('../assets/location.png')}
                />
            </View>
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E4E4',
        padding: 2,
        paddingTop: 8,
    },
    contentForm: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    contentField: {
        marginBottom: 20,
    },
    lbTitle: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#C1BCBC'
    },
    field: {
        height: 40,
        backgroundColor: '#E4E4E4',
        borderRadius: 8,
        padding: 8,
    },
    search: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#040404',
        padding: 2,
    },
    contentBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#70F386',
        borderRadius: 8,
        padding: 8,
    },
    lbBtn: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FCFCFC'
    },
    contentNumAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    lbNum: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#040404'
    },
    avatar: {
        width: 35,
        height: 35
    },
    content_logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    logo: {
        width: 100,
        height: 35
    },
    contentMap: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
});

export default Localisation;