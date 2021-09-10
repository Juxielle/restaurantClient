import React, { useState, useEffect } from 'react';
import { Platform, Dimensions, Text, View, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps"

import { mapStyle } from './DataMap'

export default function Map(props) {

	const [location, setLocation] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const positionClient = props.route.params.positionClient
	const positionVendeur = props.route.params.positionVendeur

	const dataMap = [
		{
			name: 'Vous',
			latitude: positionClient.latitude,
			longitude: positionClient.longitude,
			color: '#2F3136',
		},
		{
			name: 'Livraire',
			latitude: positionVendeur.latitude,
			longitude: positionVendeur.longitude,
			color: '#A3EAD8',
		},
	]

	useEffect(() => {
		getLocation();
		//console.log(JSON.stringify(location))
	}, []);


	const getLocation = async ()=>{
		const {status} = await Location.requestForegroundPermissionsAsync();

		if(status !== 'granted'){
			console.log('PERMISSION NOT GRANTED !');

			setErrorMessage('PERMISSION NOT GRANTED');
		}

		const location = await Location.getCurrentPositionAsync({});
		setLocation(location);
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				customMapStyle={mapStyle}
				provider={PROVIDER_GOOGLE}
				showsMyLocationButton={false}
				followsUserLocation={true}
				showsUserLocation
				radius={Dimensions.get("window").width * 0.08}
				minZoomLevel={3}
				maxZoomLevel={20}
				rotateEnabled={false}
				pitchEnabled={false}
				initialRegion={{
					latitude: positionClient.latitude,
					longitude: positionVendeur.longitude,
					latitudeDelta: 0.0922,
			        longitudeDelta: 0.0421,
				}}
				mapType="standard"
			>
				{dataMap.map((marker) => (
				<Marker
				    style={styles.mapIcon}
					key={dataMap.indexOf(marker).toString()}
					pinColor = {marker.color}
					draggable={true}
					title={marker.name}
					description={marker.name}
					coordinate={{
						latitude: marker.latitude,
						longitude: marker.longitude,
					}}
				>
					<Image
                        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-5e5c6.appspot.com/o/icons%2Fcar.png?alt=media&token=e3c38f8d-b689-4e82-9db6-f3d005be2b21'}}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
				</Marker>
				))}
				<Polyline
					coordinates={[
						{ latitude: positionClient.latitude, longitude: positionClient.longitude },
						{ latitude: positionVendeur.latitude, longitude: positionVendeur.longitude },
					]}
					strokeColor="#7F0000" // fallback for when `strokeColors` is not supported by the map-provider
					strokeColors={[
						'#7F0000',
						'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
						'#B24112',
						'#E5845C',
						'#238C23',
						'#7F0000',
					]}
					strokeWidth={2}
				/>
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
    },
	map: {
		width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
	},
	camera3: {
        fontSize: 30,
        color: '#248e44',
        borderRadius: 4,
    },
	mapText: {
		fontSize: 12,
		color: 'black',
		fontStyle: 'italic',
		fontWeight: 'bold',
	},
	mapIcon: {
		width: 30,
		height: 30,
	},
})

/*
<Text
						style={styles.mapText}
						numberOfLines={1}
						adjustsFontSizeToFit
					>{marker.name}</Text>
*/