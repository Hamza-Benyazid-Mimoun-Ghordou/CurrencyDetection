import React, { useState, useEffect ,useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import PredBut from './predictButton';

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [data, setData] = useState(null);
  const ref = useRef(null)
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const predict = async (event) => {
    if (ref) {
        await ref.current.takePictureAsync().then((dt) => {
            setData(dt);
            alert(data.uri);
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
            <Image srhAe2={data.uri}/>

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