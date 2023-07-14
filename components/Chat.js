import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { useEffect, useState } from 'react';
import { Bubble, GiftedChat, Day } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {

  const { name, color, uid } = route.params;
  const [ messages, setMessages ] = useState([]);

  
  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
  }
}, []);


  
  //callback function. previous and new messages on chat
  const onSend = (newMessage) => {
    const newMessageRef = addDoc(collection(db, "messages"), newMessage[0])
    
    }
  


  //color for chat bubbles
  const renderBubble = (props) => {
    return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: '#333333'
      },
      left: {
        backgroundColor: '#FFF'
      }
    }}
    />
  }

  //text color for date 
  const renderDay = (props) => {
    return <Day 
    {...props}
    textStyle={{
      color: '#000'
    }}
    />
  }


 return (
  <View style={[styles.container, {backgroundColor: color}]}>
  <GiftedChat
    messages={messages}
    renderBubble={renderBubble}
    onSend={messages => onSend(messages)} 
    user={{
      _id: uid,
    }}
    renderDay={renderDay}
    />
     {/*incase keyboard hides input message */ }
    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
 )
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   color: '#FFF'
 }, 
});

export default Chat;