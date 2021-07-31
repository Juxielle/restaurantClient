import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from "react-native-geolocation-service";

import dataMap from "./DataMap"

export default function Map() {
	const [ pin, setPin ] = React.useState({
		latitude: 0.3803674643341295,
		longitude: 9.478547671874992,
	})

	const [ region, setRegion ] = React.useState({
		latitude: 0.3803674643341295,
		longitude: 9.478547671874992,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	const [ latitude, setLatitude ] = React.useState(0);
	const [ longitude, setLongitude ] = React.useState(0);
	const [ coodinates, setCoordinates ] = React.useState([]);

	React.useEffect(() => {
        Geolocation.getCurrentPosition(
			position => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			},
			error => {
			  Alert.alert(error.message.toString());
			},
			{
			  showLocationDialog: true,
			  enableHighAccuracy: true,
			  timeout: 20000,
			  maximumAge: 0
			}
		);
    }, [])

	function getMarkers() {
		const datas = dataMap.dataMap.map((data) =>
			<Marker
			    key = {dataMap.dataMap.indexOf(data).toString()}
				coordinate={{latitude: data.latitude, longitude: data.longitude}}
				pinColor="#248e44"
				draggable={true}
				title={data.name}
				description={data.name}
				icon = {()=>(<FontAwesome style={styles.camera3} name='map-marker'/>)}
				onDragStart={(e) => {
					console.log("Drag start", e.nativeEvent.coordinates)
				}}
				onDragEnd={(e) => {
					setPin({
						latitude: e.nativeEvent.coordinate.latitude,
						longitude: e.nativeEvent.coordinate.longitude
					})
				}}
			>
				<Callout>
					<Text>{data.name}</Text>
				</Callout>
			</Marker>
	    );

		return (
			<MapView
				style={styles.map}
				initialRegion={region}
				provider="google"
		    >
				{datas}
				<Circle center={pin} radius={1000} />
		    </MapView>
		)
	}

	return (
		<View style={{ marginTop: 50, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "KEY",
					language: "en",
					components: "country:us",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
			{getMarkers()}
			<Marker
				coordinate={{
				    latitude: latitude,
				    longitude: longitude,
				}}>
			</Marker>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},
	camera3: {
        fontSize: 30,
        color: '#248e44',
        borderRadius: 4,
    },
})