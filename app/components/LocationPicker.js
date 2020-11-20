import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = ({ navigation, route, onLocationPicked }) => {
  const [pickedLocation, setPickedLocation] = useState(
    route.params ? route.params : null
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (route.params) {
      setPickedLocation(route.params);
      onLocationPicked(route.params);
    }
  }, [setPickedLocation, route, onLocationPicked]);

  const verifyPermissions = async () => {
    try {
      const result = await Permissions.askAsync(Permissions.LOCATION);
      if (result.status !== "granted") {
        Alert.alert(
          "Insufficient Permissions!",
          "You need to grant location permission to use this app.",
          [{ text: "ok" }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Ok" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("MapScreen", {
      initialLocation: pickedLocation,
      readOnly: false,
    });
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={pickedLocation}
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        ) : (
          <Text>Pick a location to preview here!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primaryColor}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primaryColor}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
