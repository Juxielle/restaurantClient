
import React, {useEffect, useState} from 'react'
import { StyleSheet, Alert, View, Text } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'


export default function NotificationPush (){

  const [notification, setNotification] = useState({});

  useEffect(() => {
    registerPushNotificationsAsync();
  }, [])

  const registerPushNotificationsAsync = async ()=>{
    //Démander la permission
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if(status !== 'granted'){
      Alert.alert('Permissions non accordées');
      return;
    }
    //Si le token de la notification
    try{
      let token = await Notifications.getExpoPushTokenAsync();
      console.log( 'My token: '+token );
      //await Notifications.addListener(handleNotification);
    }catch(error){ 
      Alert.alert('ID non récuperé');
    }
  }

  const handleNotification = notificat => {
    //On reçoit l'objet notification
    setNotification(notificat);
  }

  return (
    <View style={styles.container}>
      <Text>Objet: { JSON.stringify(notification) }</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})