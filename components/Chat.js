import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { useEffect, useState } from 'react';
import { Bubble, GiftedChat, Day } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  const [ messages, setMessage ] = useState([]);

  //callback function. previous and new messages on chat
  const onSend = (newMessage) => {
    setMessage(previousMessages =>GiftedChat.append(previousMessages, newMessage))
  }

  useEffect(() => {
    setMessage([
      {
        _id: 1,
        text: 'Hello there!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bob',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'You have entered the chat',
        createdAt: new Date(),
        system: true,
      },
    ]);

  }, 
  []);

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
      _id: 1,
    }}
    renderDay={renderDay}
    />
     {/*incase keyboard hides input message */ }
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