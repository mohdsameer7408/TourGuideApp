import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

const PlaceDetailScreen = ({ navigation, route }) => {
  const place = route.params;
  const location = { lat: place.lat, lng: place.lng };

  const showMapHandler = () => {
    navigation.navigate("MapScreen", {
      initialLocation: location,
      readOnly: true,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview
          location={location}
          style={styles.mapPreview}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: "open-sans",
  },
  mapPreview: {
    width: "100%",
    maxHeight: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
