import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
//UI element displaying options (camera, location, photos etc)
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';



const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
  const actionSheet = useActionSheet();

  //menu containing the options(taking photo, selecting photo, sharing location and cancel button)
  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length -1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage()
            return;
          case 1:
            takePhoto()
            return;
          case 2:
            getLocation()
          default:
        }
      }
    )
  }

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      //.assests contains .uri(a string representing path to picked media file)
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert('Permissions have not been granted.');
    }
  }

  //to take a picture, returns an object containing the media file data
  const takePhoto = async () => {
    //requests permission 
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert('Permissions have not been granted');
    }
  }


  //to display the users location
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if(permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert('Error occured while fetching location');
    } else Alert.alert('Permissions have not been granted');
  }

//unique reference string for uploading multiple images
  const generateReference = (uri) => {
    //this will get file from uri
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  }


  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    //reference on Storage Cloud (to upload file)
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    //image converts to blob(binary large object)
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref)
      onSend({ image: imageURL })
  });
}


  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;