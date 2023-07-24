import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useState } from "react";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  //returns authentication handle of firebase
  const auth = getAuth();

  //returns promise - hence .then and .catch are used
  const signInUser = async () => {

    signInAnonymously(auth);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigation.navigate("Chat", {
          userID: uid,
          name: name,
          color: color,
        });
        Alert.alert("Time to chit chat !");

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  return (
    <ImageBackground
      source={require("../assets/BackgroundImage.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.smallContainer}>
          <Text style={styles.title}>Chit Chat</Text>
        </View>
        <View style={styles.smallContainer}></View>
        <TextInput
          style={styles.textInput}
          onChangeText={setName}
          placeholder="Your Name"
        />

        <Text style={styles.colorChoiceTitle}>Choose Background Color:</Text>
        <View style={styles.colorButtonContainer}>
          <TouchableOpacity
            style={[styles.colorButtons, { backgroundColor: "#D4A37A" }]}
            onPress={() => setColor("#D4A37A")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={[styles.colorButtons, { backgroundColor: "#FEFAE0" }]}
            onPress={() => setColor("#FEFAE0")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={[styles.colorButtons, { backgroundColor: "#8A95A5" }]}
            onPress={() => setColor("#8A95A5")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={[styles.colorButtons, { backgroundColor: "#D8F3DC" }]}
            onPress={() => setColor("#D8F3DC")}
          ></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={signInUser} style={styles.chatButton}>
          <Text style={styles.chatButton}>Start Chit Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  smallContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "88%",
  },

  textInput: {
    width: "88%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    opacity: 50,
    borderRadius: 10,
  },

  backgroundImage: {
    flex: 1,
  },

  title: {
    fontSize: 45,
    fontWeight: 600,
    color: "#fff",
    letterSpacing: 10,
  },

  colorButtons: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  colorButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },

  chatButton: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "#757083",
    width: "88%",
    margin: 15,
    borderRadius: 10,
    color: "#fff",
    letterSpacing: 3,
  },
  colorChoiceTitle: {
    fontSize: 20,
  },
});

export default Start;