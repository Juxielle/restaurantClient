import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraPhoto(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const cam = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = ()=>{
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const  dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  const snap = async () => {
    //takePhoto()
    let source = '';
    if(cam){
      const options = {quality: 0.5, base64: true, sipProcessing: true};
      let photo = await cam.current.takePictureAsync(options);

      source = photo.uri;
      var file = dataURLtoFile(source, 'a.png');
      console.log('Picture source: ', source);
      setImage(source)
    }

    props.navigation.goBack({image: source});
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cam}
        style={styles.camera} type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => snap()}>
            <View style={styles.container_img}  onPress={()=>takeImage(true)}>
                <Image
                    style={styles.camera2}
                    source={{uri:'https://firebasestorage.googleapis.com/v0/b/restaurant-5e5c6.appspot.com/o/icons%2Fcamera.png?alt=media&token=238ca6e2-3496-46ce-b66e-85ed8816a8d2'}}
                />
                <Text style={styles.camera_text}>Prende une photo</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      borderRadius: 4,
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    container_img: {
      borderRadius: 4,
      alignItems: 'center',
      marginBottom: 10,
  },
  camera2: {
      width: 30,
      height: 30,
      borderRadius: 4,
  },
  camera_text: {
      fontSize: 10,
      fontStyle: 'italic',
      color: '#fff',
  }
});