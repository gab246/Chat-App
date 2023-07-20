//react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from "./components/Start"
import Chat from "./components/chat"

//create navigator 
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { StyleSheet, Text, View, ImageBackground } from 'react-native';



const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyArTIqT_HkdoHVHpBfm4865qHlamNg2RHs",
    authDomain: "chat-app2-a9104.firebaseapp.com",
    projectId: "chat-app2-a9104",
    storageBucket: "chat-app2-a9104.appspot.com",
    messagingSenderId: "904969986062",
    appId: "1:904969986062:web:f47a066cd38851cac5dc5f"
  };


  //initialises Firebase 
  const app = initializeApp(firebaseConfig);
  //initialises Cloud Firestire, gets reference to service 
  const db = getFirestore(app);
  

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
        component={Chat}
        />
        {props => <Chat db={db} {...props} />} 
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