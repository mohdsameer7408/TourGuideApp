import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import Colors from "../constants/Colors";
import { addPlaceAsync } from "../features/placesSlice";

const NewPlaceScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [location, setLocation] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const imageTakenHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const locationPickedHandler = useCallback((pickedLocation) => {
    setLocation(pickedLocation);
  }, []);

  const savePlaceHandler = () => {
    dispatch(addPlaceAsync({ title, imageUri: selectedImage, location }));
    navigation.navigate("PlacesListScreen");
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={navigation}
          route={route}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primaryColor}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
