import { createSlice } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";

export const placesSlice = createSlice({
  name: "places",
  initialState: {
    places: [],
  },
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
    addPlace: (state, action) => {
      state.places = [action.payload, ...state.places];
    },
  },
});

export const { addPlace, setPlaces } = placesSlice.actions;

export const setPlacesAsync = () => async (dispatch) => {
  try {
    const places = await fetchPlaces();
    dispatch(setPlaces(places.rows._array));
  } catch (error) {
    throw error;
  }
};

export const addPlaceAsync = (place) => async (dispatch) => {
  const { title, imageUri, location } = place;
  // const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${env.googleMapApiKey}`
  // );

  // if (!response.ok) {
  //   throw new Error("Something went wrong");
  // }

  // const resData = await response.json();
  // const address = resData.results[0].formatted_address;

  const fileName = imageUri.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    await FileSystem.moveAsync({
      from: imageUri,
      to: newPath,
    });

    const dbResult = await insertPlace(
      title,
      newPath,
      "325, Alex Street, London, England",
      location.lat,
      location.lng
    );
    dispatch(
      addPlace({
        id: dbResult.insertId.toString(),
        ...place,
        imageUri: newPath,
        address: "325, Alex Street, London, England",
        lat: location.lat,
        lng: location.lng,
      })
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const selectPlaces = (state) => state.places.places;

export default placesSlice.reducer;
