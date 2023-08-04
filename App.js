//react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './components/Start';

//create navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import Chat from './components/Chat';
//determines whether a user is online or not
import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBym5So4U03Nm_tcFomlf6Vx_Q2O3wkLro",
  authDomain: "chat-app-b84bb.firebaseapp.com",
  projectId: "chat-app-b84bb",
  storageBucket: "chat-app-b84bb.appspot.com",
  messagingSenderId: "888136623373",
  appId: "1:888136623373:web:e36711dcf822b1e9107c44"
};


//initialises Firebase
const app = initializeApp(firebaseConfig);
//initialises Cloud Firestire, gets reference to service
const db = getFirestore(app);
//storage location reference for blob(collection of data). Initialises firebase sotrage handler 
const storage = getStorage(app);

const App = () => {
  const connectionStatus = useNetInfo();

  //will display popup if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection is lost!');
      disableNetwork(db);
    } else  if (connectionStatus.isConnected === true) {
      enableNetwork(db);
      }
    }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
      initialRouteName='Start' /* first screen to load*/
      >
        <Stack.Screen
        name='Start'
        component={Start} /* component to display on screen */
        />
        <Stack.Screen
        name='Chat'
        >
        {props => <Chat 
          isConnected={connectionStatus.isConnected} 
          db={db} 
          storage={storage}
          {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;