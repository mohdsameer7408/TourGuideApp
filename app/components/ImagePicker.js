import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImgPicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
// import axios from "axios";

const ImagePicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    try {
      const result = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      if (result.status !== "granted") {
        Alert.alert(
          "Insufficient Permissions!",
          "You need to grant camera permission to use this app.",
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

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImgPicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    onImageTaken(image.uri);

    // const response = await fetch(image.uri);
    // const blob = await response.blob();
    // const imageForm = new FormData();
    // const imageName = image.uri.split("/").pop();
    // const imageType = imageName.split(".").pop();
    // imageForm.append(
    //   "file",
    //   { uri: image.uri, name: imageName, type: `image/${imageType}` },
    //   imageName
    // );
    // try {
    //   const imageData = await axios.post(
    //     "http://192.168.43.220:80/api/upload/image",
    //     imageForm,
    //     {
    //       headers: {
    //         accept: "application/json",
    //         "Accept-Language": "en-us,en;q=0.8",
    //         "Content-Type": `multipart/form-data; boundary=${imageForm._boundary}`,
    //       },
    //     }
    //   );
    //   console.log("Image Data: ", imageData.data);
    // } catch (error) {
    //   console.log("Error: ", error);
    // }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>Pick an image to preview here.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primaryColor}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
