import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/Home';
import ImagePicker from './src/screens/ImagePicker';
import { SimpleForm } from './src/screens/SimpleForm';

export default function App() {
  // FCM
  useEffect(() => {
    // Get FCM token
    messaging().getToken().then((currentToken) => {
      if (currentToken) {
          console.log('Token: ' + currentToken);
      }
    });

    // Manage message when app is on foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImagePicker" component={ImagePicker} />
        <Stack.Screen name="SimpleForm" component={SimpleForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
