import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

export default function Home({ navigation }) {
  const devices = ["R1", "R2", "R3", "R4", "R5"];

  const [status1, setStatus1] = useState(false); // R1
  const [status2, setStatus2] = useState(false); // R2
  const [status3, setStatus3] = useState(false); // R3
  const [status4, setStatus4] = useState(false); // R4
  const [status5, setStatus5] = useState(false); // R5

  const [test, setTest] = useState('');

  const checkConnect = () => {
    setColor1(0);
    setColor2(1);
    alert('hello');
  };

  const changeSetting = (value, options, setterFunction) => {
    if (value == options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };

  const sendRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(method, url);
      request.responseType = 'json';
      if (data) {
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', '*/*');
        request.setRequestHeader(
          'X-Authorization',
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oY3QwMjAzMjhAZ21haWwuY29tIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJ1c2VySWQiOiIwZjcwZTAxMC05YTY5LTExZTktYmU4NC03NTZmNmIxMzAzYjUiLCJmaXJzdE5hbWUiOiJUaHV5IiwibGFzdE5hbWUiOiJMaW5oIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiMGYzMDA2ODAtOWE2OS0xMWU5LWJlODQtNzU2ZjZiMTMwM2I1IiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjA4ODkxNTk3LCJleHAiOjE2MTA2OTE1OTd9.c0zJ3SUbMj5MSYDvGTUIfJHIgf2qTwSUXZya9AyMqC7aw2zj8uSlLmxDGGnDDK2LOpBP8dJ2Vde69holGQj8aQ'
        );
      }
      request.onload = () => {
        if (request.status >= 400) {
          reject(request.response);
        } else {
          resolve(request.response);
        }
      };
      request.onerror = () => {
        reject('Something went wrong!');
      };

      request.send(JSON.stringify(data));
    });
    return promise;
  };

  function get() {
    sendRequest('GET', 'https://reqres.in/api/users').then((responseData) => {
      setText(JSON.stringify(responseData));
    });
  }

  function post(value, color, setColor, status, setStatus) {
    setStatus(!status);
    if (status === false) {
      sendRequest(
        'POST',
        'http://demo.thingsboard.io/api/plugins/rpc/oneway/3e85b630-28a4-11eb-85ee-f936949cce2a',
        {
          method: devices[value],
          params: true,
          timeout: 500,
        }
      )
        .then((responseData) => {
          // setBtnColor('#00e640');
          setMess('Success!');
          setTest(devices[value] + ' ON');
          setColor(1);
          // setStatus(!status);
        })
        .catch((err) => {
          setMess(err);
          setTest(devices[value] + ' fail');
        });
      setColor(1);
    } else {
      sendRequest(
        'POST',
        'http://demo.thingsboard.io/api/plugins/rpc/oneway/3e85b630-28a4-11eb-85ee-f936949cce2a',
        {
          method: devices[value],
          params: false,
          timeout: 500,
        }
      )
        .then((responseData) => {
          // setBtnColor('#00e640');
          setMess('Success!');
          setTest(devices[value] + ' OFF');
          setColor(0);
          // setStatus(!status);
        })
        .catch((err) => {
          setMess(err);
          setTest(devices[value] + ' fail');
        });
      setColor(0);
    }
  }

  const testSendRequest = (value, color, setColor, status, setStatus) => {
    sendRequest(
      'POST',
      'http://demo.thingsboard.io/api/plugins/rpc/oneway/3e85b630-28a4-11eb-85ee-f936949cce2a',
      {
        method: `${devices[value]}`,
        params: status,
        timeout: 500,
      }
    )
      .then((responseData) => {
        // setBtnColor('#00e640');
        setMess('Success');
        setTest(devices[value] + '.');
        setStatus(!status);
      })
      .catch((err) => {
        setMess(err);
        setTest(devices[value] + ' fail');
      });
    if (color === 0) {
      setColor(1);
    } else if (color === 1) {
      setColor(0);
    }
  };

  const [text, setText] = useState('');
  const [mess, setMess] = useState('');
  const [color1, setColor1] = useState(0);
  const [color2, setColor2] = useState(0);
  const [color3, setColor3] = useState(0);
  const [color4, setColor4] = useState(0);
  const [color5, setColor5] = useState(0);
  const [on, setOn] = useState(0);
  const btnColor = ['#2196f3', '#2196d3'];
  return (
    <>
      <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#42628F" translucent = {true}/>
      <View style={[styles.slide]}>
        <ImageBackground
          source={require('../assets/home.jpg')}
          style={styles.image}>
          <Text
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={styles.textSlide}>
            SmartHome-Thingsboard
          </Text>
          <View style={styles.btnViewDiagram}>
            <Button
              onPress={() => navigation.navigate('HousePlan')}
              title="View HousePlan"
              color="#765d69"
            />
          </View>
        </ImageBackground>
      </View>
      <View style={[styles.body]}>
        <ScrollView>
          <View style={{ marginBottom: 5, alignSelf: 'center' }}>
            <Text
              style={{
                marginBottom: 10,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              Device Controls
            </Text>
          </View>

          <View style={[styles.controlSpace]}>
            <View style={styles.buttonView}>
              <Button
                title="Light 1"
                onPress={() => post(0, color1, setColor1, status1, setStatus1)}
                color={btnColor[color1]}
              />
              <Text style={styles.text}></Text>
            </View>

            <View style={styles.buttonView}>
              <Button
                title="Light 2"
                onPress={() => post(1, color2, setColor2, status2, setStatus2)}
                color={btnColor[color2]}
              />
              <Text style={styles.text}></Text>
            </View>

            <View style={styles.buttonView}>
              <Button
                title="Light 3"
                onPress={() => post(2, color3, setColor3, status3, setStatus3)}
                color={btnColor[color3]}
              />
              <Text style={styles.text}></Text>
            </View>

            <View style={styles.buttonView}>
              <Button
                title="Electric Fan"
                onPress={() => post(4, color5, setColor5, status5, setStatus5)}
                color={btnColor[color5]}
              />
              <Text style={styles.text}></Text>
            </View>
          </View>
          <View style={[styles.controlSpaceM]}>
            <View style={styles.buttonViewM}>
              <Button
                title="Main door"
                onPress={() =>
                  post(3, color4, setColor4, status4, setStatus4)
                }
                color={btnColor[color4]}
              />
            </View>
          </View>
          <View style={[styles.message]}>
            {/*<Text style={styles.text}>{test}</Text>*/}
          </View>
          <View style={[styles.message]}>
            {/*<Text style={styles.paragraph}>{mess}</Text>*/}
          </View>
          <View style={[styles.message]}></View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: "center",
  },
  header: {
    backgroundColor: '#42628F',
    // backgroundColor:'#7c94b0',
  },
  textHeader: {
    paddingTop: '8%',
    paddingBottom: '2%',
    fontSize: 29,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: '#ffffff',
  },
  
  // playingSpace: {
  //   backgroundColor: 'white',
  //   borderColor: 'cyan',
  //   borderWidth: 3,
  // },
  slide: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderColor: 'cyan',
    // borderWidth: 3,
  },
  body: {
    paddingTop: 15,
    height: '50%',
    backgroundColor: '#F5F5F5',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    // resizeMode: "cover",
  },
  btnViewDiagram: {
    width: '50%',
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textSlide: {
    color: 'white',
    fontSize: 33,
    padding: 18,
    marginTop: '35%',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  btnGoBack: {},
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
