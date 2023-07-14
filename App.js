//react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

//create navigator 
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//import screens
import Start from './components/Start';
import Chat from './components/Chat';

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBC4KuSMqboZsx_spI_192LoVlMVzif0JU",
    authDomain: "chat-app-28a30.firebaseapp.com",
    projectId: "chat-app-28a30",
    storageBucket: "chat-app-28a30.appspot.com",
    messagingSenderId: "665783359835",
    appId: "1:665783359835:web:7843c793e3240002b5a27e"
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