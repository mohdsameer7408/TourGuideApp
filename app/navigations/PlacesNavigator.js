import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import NavHeaderButton from "../components/NavHeaderButton";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PlacesListScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? Colors.primaryColor : "#fff",
          },
          headerTintColor:
            Platform.OS === "android" ? "#fff" : Colors.primaryColor,
          headerTitleStyle: { fontFamily: "open-sans-bold" },
          headerBackTitleStyle: { fontFamily: "open-sans" },
          headerBackground: () => (
            <LinearGradient
              colors={["#39c6c6", "#26d9d9", "#66ffd9", "#99ffe6"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 0.7 }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="PlacesListScreen"
          component={PlacesListScreen}
          options={({ navigation, route }) => ({
            headerTitle: "All Places",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={NavHeaderButton}>
                <Item
                  title="Add"
                  iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                  onPress={() => navigation.navigate("NewPlaceScreen")}
                />
              </HeaderButtons>
            ),
          })}
        />
        <Stack.Screen
          name="PlaceDetailScreen"
          component={PlaceDetailScreen}
          options={({ route }) => ({ headerTitle: route.params.title })}
        />
        <Stack.Screen
          name="NewPlaceScreen"
          component={NewPlaceScreen}
          options={{ headerTitle: "Add a Place" }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerTitle: "Map" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
