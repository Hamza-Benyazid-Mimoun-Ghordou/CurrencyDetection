import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import PredBut from './predictButton';
import Loading from './Loading';

class Cam extends React.Component {
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
        },
    })
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
        data : {},
        loading : false
    }

    ref = React.createRef();

    async componentDidMount(){
          const { status } = await Camera.requestPermissionsAsync();
          this.setState({...this.state,hasPermission : (status === 'granted')})
    }
    predict = (event) => {
      if (this.ref) {
          this.ref.current.takePictureAsync({onPictureSaved: this.uploadimage})
      }
    }
    uploadimage = async (dt) => {
      const manipResult = await ImageManipulator.manipulateAsync(
        dt.uri,
        [{ resize: { width: 256, height: 256 } }],
        {compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      var dtform = new FormData();
      dtform.append('file', { uri: manipResult.uri, name: 'picture.jpg', type: 'image/jpg' });
      axios.post('http://2eb6d5ffc867.ngrok.io/predict/predict/predict/', dtform).then(responseData => {
          this.setState({...this.state,loading:false})
          alert(responseData.data.result)
          console.log(responseData.data)
          
      })
      .catch(err => { console.log(err); });
    }

    render(){
      if (this.state.hasPermission === null) {
        return <View />;
      }
      if (this.state.hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (
        <View style={this.styles.container}>
          <Camera pictureSize = "small"
            ref = {this.ref}
            style={this.styles.camera} type={this.type}>
            {this.state.loading?<Loading/>:null}
            <View style={this.styles.buttonContainer}>
              <TouchableOpacity
                style={this.styles.button}
                >
                <PredBut 
                  press = {()=>{
                    this.setState({...this.state,loading:true});
                    this.predict
                  }} 
                />
    
              </TouchableOpacity>
    
            </View>
          </Camera>
        </View>
      );
    }

}


export default Cam;