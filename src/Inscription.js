import React, {useEffect, useState} from 'react';
import { StyleSheet, Alert, Text, TextInput, Image, View, ScrollView, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HOST from './host';

const Inscription = (props)=>{

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [numero, setNumero] = useState();
    const [url, setUrl] = useState('');

    useEffect(() => {

    }, [])

    const genereCode = ()=>{
        const codep1 = Math.random() * (999 - 100) + 100;
        const codep2 = Math.random() * (999 - 100) + 100;
        return codep1.toString() +' '+ codep2.toString();
    }

    const enregistrer = ()=>{
        if(nom!=''&&prenom!=''&&numero!=null){
            fetch(HOST+'insert.php', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nom: nom,
                    tel: numero,
                    adresse: 'adresse',
                    image: 'image',
                })
            }).then((response) => response.json())
              .then((responseJson) => {
                Alert.alert('Enregistrement effectué avec succès !!')
              }).catch((error) => {
                Alert.alert('Enregistrement non effectué !!')
            })
        }else{
            Alert.alert('Veuillez remplir tous les champs !!');
        }
    }

    const handleSend = async (num, code)=> {
        const numbersArr = [num];
        const isAvailable = await SMS.isAvailableAsync()
        if (isAvailable) {
          while (numbersArr.length > 0) {
            const n = numbersArr.pop()
            const result = await SMS.sendSMSAsync(n, 'Bienvenu sur MAXI\'IN APP\n\t Votre code est: '+code);
            console.log('results', result)
          }
        } else {
          // misfortune... there's no SMS available on this device
        }
    }

    const showAlertInfo = (title, sms)=>{
        Alert.alert(
            title+'',
            sms,
            [
                {
                    text: 'COMPRIS',
                    onPress: () => console.log(title)
                }
            ]
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Nom</Text>
                <TextInput
                    style={styles.search}
                    onChangeText={setNom}
                />
            </View>

            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Prenom</Text>
                <TextInput
                    style={styles.search}
                    onChangeText={setPrenom}
                />
            </View>

            <View style={styles.container_mail}>
                <Text style={styles.libelle}>Numero</Text>
                <View style={styles.cont_num}>
                    <Text style={styles.pre_num}>+241</Text>
                    <TextInput
                        style={styles.search2}
                        onChangeText={setNumero}
                        value={numero}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.container_img}>
                <Image
                    style={styles.img}
                    source={{uri:url}}
                />
            </TouchableOpacity>

            <View style={styles.container_btn}>
                <TouchableOpacity style={styles.btn_success} onPress={()=>enregistrer()}>
                    <Text style={styles.compte_social}>S'enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_cancel} onPress={()=>props.navigation.navigate('Connexion')}>
                    <Text style={styles.compte_social}>Se connecter</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_mail: {
        marginBottom: 20,
        marginLeft: 2,
        padding: 4,
    },
    container_mail2: {
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        padding: 2,
    },
    container_comment: {
        marginBottom: 4,
        padding: 4,
    },
    container_btn: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 60,
        flexDirection: 'row',
        padding: 2,
    },
    libelle: {
        fontSize: 14,
        color: '#248e44',
        fontWeight: 'bold',
    },
    search: {
        fontSize: 16,
        fontWeight: 'bold',
        height: 35,
        color: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 2,
    },
    search2: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        height: 35,
        color: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 2,
    },
    btn_cancel: {
        flex: 1,
        height: 40,
        borderRadius: 4,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e57373',
        marginLeft: 10,
        padding: 4,
    },
    btn_success: {
        flex: 1,
        height: 40,
        borderRadius: 4,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#248e44',
        marginRight: 10,
        padding: 4,
    },
    compte_social: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    container_img: {
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 10,
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    camera: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    camera_text: {
        fontSize: 10,
        fontStyle: 'italic',
    },
    cont_num: {
        flex: 1,
        flexDirection: 'row'
    },
    pre_num: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey',
        marginTop: 8,
        marginRight: 10,
    },
    camera: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    camera_text: {
        fontSize: 10,
        fontStyle: 'italic',
        color: '#248e44',
    },
    camera3: {
        fontSize: 30,
        color: '#248e44',
        borderRadius: 4,
    },
});

export default Inscription;