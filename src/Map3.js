import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions, View, Text } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyB_pt5iF9KOV3012rqrmY1FeAcEDHZpHyY';

export default function Map (props) {
    // AirBnB's Office, and Apple Park
    const [coordinates, setCoordonate] = useState([
      {
        latitude: 37.771707,
        longitude: -122.4164870,
      },
      {
        latitude: 37.771707,
        longitude: -122.4053769,
      },
    ]);

    const [mapView, setMapView] = useState(null);

  const onMapPress = (e) => {
    /*setState({
      coordinates: [
        ...coordinates,
        e.nativeEvent.coordinate,
      ],
    });*/
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={coordinates[0]}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
      >
        <Marker
				  style={styles.imgMap}
					draggable={true}
					title='Vous'
					description='Votre position actuelle'
					coordinate={coordinates[0]}
				>
					<Image
            source={require('../assets/location.png')}
            style={styles.imgMap}
          />
				</Marker>
        <Marker
				  style={styles.imgMap}
					draggable={true}
					title='Livreur'
					description='Position actuelle du livreur'
					coordinate={coordinates[1]}
				>
					<Image
            source={require('../assets/delivery-man.png')}
            style={styles.imgMap}
          />
				</Marker>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>

      <View style={styles.contentIllustration}>
        <View style={styles.contentLogo}>
          <Image
              style={styles.logo}
              source={require('../assets/max_logo.png')}
          />
          <TouchableOpacity>
            <Image
                style={styles.btnReturn}
                source={require('../assets/back-arrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.surContentMap}>
          <View style={styles.contentMap}>
            <Image
                style={styles.imgMap}
                source={require('../assets/location.png')}
            />
            <Text style={styles.lbNum}>Vous</Text>
          </View>
          <View style={styles.contentMap}>
            <Image
                style={styles.imgMap}
                source={require('../assets/delivery-man.png')}
            />
            <Text style={styles.lbNum}>Livreur</Text>
          </View>
        </View>
      </View>
      <View style={styles.surContAppel}>
        <View style={styles.contentAppel}>
            <View style={styles.contentNumAvatar}>
                <View style={styles.contentNum}>
                    <Text style={styles.lbNum}>Appelez le livreur</Text>
                    <Text style={styles.lbSubText}>Suivre votre commande</Text>
                </View>
                <View style={styles.contentAvatar}>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/delivery-man.png')}
                    />
                </View>
            </View>
            <View style={styles.contentNumAvatar}>
                <View style={styles.contentNum}>
                    <Text style={styles.lbSubText}>X2 Items</Text>
                    <Text style={styles.lbNum}>$10.50</Text>
                </View>
                <TouchableOpacity style={styles.contentAvatar}>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/location.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentAvatar}>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/accept.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentAvatar}>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/cancel.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  map: {
    height: height,
    width: width,
  },
  surContAppel: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentAppel: {
    height: 130,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  contentNumAvatar: {
      flexDirection: 'row',
      marginVertical: 5,
      marginBottom: 15
  },
  contentNum: {
      flexDirection: 'column',
  },
  lbNum: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#040404'
  },
  lbSubText: {
      fontSize: 12,
      fontStyle: 'italic',
      color: '#C1BCBC'
  },
  contentAvatar: {
      flex: 1,
      alignItems: 'flex-end'
  },
  contentProduit: {
      alignItems: 'flex-start',
  },
  contentDetail: {
      flex: 1,
      alignItems: 'flex-start',
      marginLeft: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#8D8585',
      marginBottom: 5,
  },
  avatar: {
      width: 40,
      height: 40
  },
  contentIllustration: {
    flexDirection: 'row',
    margin: 20,
  },
  contentLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: 80,
    height: 30,
    marginBottom: 8,
  },
  btnReturn: {
    width: 30,
    height: 30,
  },
  surContentMap: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentMap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  
  },
  imgMap: {
    width: 30,
    height: 30,
    marginRight: 4,
  },
})