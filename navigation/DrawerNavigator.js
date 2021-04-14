import React from "react";

import { createDrawerNavigator, DrawerActions  } from "@react-navigation/drawer";

import { SettingStackNavigator,MainStackNavigator, HousePlanStackNavigator  } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import Settings from "../screens/Settings";
import Speech from "../screens/Speech";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Setting" component={SettingStackNavigator} />
      <Drawer.Screen name="HousePlan" component={HousePlanStackNavigator} />
      <Drawer.Screen name="Speech" component={Speech} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;