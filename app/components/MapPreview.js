import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import ENV from "../constants/env";

const MapPreview = ({ location, children, style, onPress }) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENV.googleMapApiKey}`;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...style }}
      onPress={onPress}
    >
      {location ? (
        <Image
          style={styles.mapImage}
          source={{ uri: imagePreviewUrl }}
          resizeMode="cover"
        />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
