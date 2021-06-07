import React, { useState, useEffect ,useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import PredBut from './predictButton';

class Cam {
    styles = StyleSheet.create({
        camera: {
            width: "100%",
            height: "100%",
            justifyContent: 'flex-end',
        },
        image: {
            width: "52%",
            height: "50%",
            justifyContent: 'flex-end',
        }
    })
    state = {
        hasPermission: null,
        type: useState(Camera.Constants.Type.back),
        data : {}
    }

    ref = useRef(null);
    

    componentDidMount(){
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
    }
    predict = (event) => {
      if (ref) {
          ref.current.takePictureAsync({onPictureSaved: uploadimage})
      }
    }
  
    uploadimage =(dt) => {
      console.log(dt.uri)
      var dtform = new FormData();
      dtform.append('file', { uri: dt.uri, name: 'picture.jpg', type: 'image/jpg' });
      const config = {
          method: 'POST',
          body: dtform,
          headers:{
            'accept':'application/json',
            'content-type':'application/json'
          }
      };
      await fetch('http://53363ff83628.ngrok.io/v1/models/currency_recognition_model:predict', config).then(responseData => {
          console.log(responseData);
      })
      .catch(err => { console.log(err.status, err.message); });
    }

    render(){
      if (this.state.hasPermission === null) {
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
                <PredBut press = {predict}/>
    
              </TouchableOpacity>
    
            </View>
          </Camera>
        </View>
      );
    }

}


export default Cam;