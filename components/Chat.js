import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

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
        text: 'Hello There!',
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
    navigation.setOptions({ title: name });
  }, 
  []);

  //renders color for the bubbles on the chat 
  const renderBubble = (props) => {
    return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: '#000'
      },
      left: {
        backgroundColor: '#FFF'
      }
    }}
    />
  }

 return (
  <View style={[styles.container, {backgroundColor: color}]}>
    <Text>Hello {name}!</Text>
  <GiftedChat
    messages={messages}
    renderBubble={renderBubble}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1
    }}
    />
     {/*incase keyboard hides input message */ }
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
    </View>
 )
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;