import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Place from "../components/Place";
import { selectPlaces, setPlacesAsync } from "../features/placesSlice";

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector(selectPlaces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlacesAsync());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Place
          place={item}
          onSelect={() => navigation.navigate("PlaceDetailScreen", item)}
        />
      )}
    />
  );
};

export default PlacesListScreen;
