import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat, Day, InputToolbar } from "react-native-gifted-chat";
import { Platform, Alert } from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
//when user is offline, fetch and display data from AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);
  
  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {

    if (unsubMessages) unsubMessages();
    // unsubMessages = null;

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      // console.log(newMessages);
      cacheChat(newMessages)
      setMessages(newMessages);
    });
  } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
    //component to call the callback of useEffective whenever isConnected prop value changes
  }, [isConnected]);



const cacheChat = async (messagesToCache) => {
  //prevent app from crashing if AsyncStrage fails
  try {
    //objects and arrays need to be stored as strings in AsyncStorage
    await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
  } catch (error) {
    console.log(error.message);
  }
};

const loadCachedMessages = async () => {
  // || and [] will assign empty array to cachedMessages
  const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
  setMessages(JSON.parse(cachedMessages));
}

//callback function. previous and new messages on chat
const onSend = (newMessage) => {
  addDoc(collection(db, "messages"), newMessage[0]);
};

//removes tool bar when connection is lost 
const renderInputToolbar = (props) => {
  if (isConnected) { 
    return <InputToolbar {...props} />;
  } else {
    return null;
  }
};

  

  //color for chat bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#333333",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );  
  };

  //text color for date
  const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          color: "#000",
        }}
      />
    );
  };


  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
        }}
        renderDay={renderDay} 
      />
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior='height' />
      ) : null}

    </View>
  );
      }
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#FFF",
  },
});



export default Chat;
