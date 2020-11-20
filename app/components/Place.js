import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Colors from "../constants/Colors";

const Place = ({ place, onSelect }) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View>
      <TouchableComponent onPress={onSelect} useForeground>
        <View style={styles.placeItem}>
          <Image
            style={styles.image}
            source={{ uri: place.imageUri }}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.address}>{place.address}</Text>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

export default Place;

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: Colors.primaryColor,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
});
