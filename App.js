import "react-native-gesture-handler";
import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import PlacesNavigator from "./app/navigations/PlacesNavigator";
import { enableScreens } from "react-native-screens";
import store from "./app/features/store";
import { Provider } from "react-redux";
import { init } from "./app/helpers/db";

init()
  .then(() => console.log("Initialized database"))
  .catch((error) => console.log("Initialization of db failed\n", error));

enableScreens();

const fetchFonts = () =>
  Font.loadAsync({
    "open-sans": require("./app/assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./app/assets/fonts/OpenSans-Bold.ttf"),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
