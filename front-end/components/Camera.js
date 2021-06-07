import React, { useState, useEffect ,useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import PredBut from './predictButton';

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const ref = useRef(null)
  let photo_data;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const predict = async (event) => {
    if (ref) {
        await ref.current.takePictureAsync().then((data) => {
            photo_data = data;
            console.log(photo_data)
        })

    }
  }
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        ref = {ref}
        style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            >
            <Text style={styles.text}> Flip </Text>

            <PredBut press = {predict}/>

          </TouchableOpacity>

        </View>
      </Camera>
    </View>
  );
}



const styles = StyleSheet.create({
    camera: {
        width: "100%",
        height: "100%",
        justifyContent: 'flex-end',
    }
})