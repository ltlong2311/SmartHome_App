import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet, 
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import DrawerNavigator from "./navigation/DrawerNavigator";
const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();


export default function SmartHome(props) {
  return (
    <>
      <NavigationContainer style={[styles.container]}>
        <DrawerNavigator />
      </NavigationContainer>
    
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  header: {
    backgroundColor: '#22a7f0',
  },
  textHeader: {
    margin: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  body: {
    paddingTop: 15,
    height: 100,
    backgroundColor: '#F5F5F5',
  },
  // playingSpace: {
  //   backgroundColor: 'white',
  //   borderColor: 'cyan',
  //   borderWidth: 3,
  // },
  slide: {
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderColor: 'cyan',
    // borderWidth: 3,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    // resizeMode: "cover",
  },
  btnViewDiagram: {
    width: '50%',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnGoBack: {},
  textSlide: {
    color: 'white',
    fontSize: 33,
    padding: 18,
    marginTop: '26%',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  // navigation: {
  //   backgroundColor: '#F5F5F5',
  //   height: 10,
  // },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
  },
  controlSpaceM: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  message: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  paragraph: {
    margin: 4,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  buttonViewM: {
    width: '50%',
    padding: 10,
  },
  text: {
    fontSize: 10,

    textAlign: 'center',
  },
});
