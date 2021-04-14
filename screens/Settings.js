import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  DrawerLayoutAndroid,
} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

const Settings = ({ navigation }) => {
  const drawer = useRef(null);

  // const [drawer, setDrawer] = useState(null);
  // const refDrawer = useCallback(element => {
  //     setDrawer(element);
  // }, []);

  const [drawerPosition, setDrawerPosition] = useState("right");

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>Add Time</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );


  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };
  setInterval(UpdateTime, 1000);

  return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={400}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >  
        <View style={styles.center}>
        <Text>Time: {ctime}</Text>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              alignItems: 'center',
              color: '#674172',
              fontSize: 69,
            }}
            onPress={() => navigation.goBack()}>
            {'\u21e6'}
          </Text>
        </TouchableOpacity>
      </View>
        <View style={{ bottom: 35 }}>
            <TouchableWithoutFeedback onPress={() => drawer.current.openDrawer()}>
              <View style={styles.btnAdd}>
                <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
      </DrawerLayoutAndroid>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  btnAdd: {
    width: 60,
    height: 60,
    
    fontSize: 10,
    borderRadius: 30,
    backgroundColor: '#22a7f0',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:"center",
    borderColor: 'cyan',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  },
});
export default Settings;
