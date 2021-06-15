import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity , Button} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import PredBut from './predictButton';
import Loading from './Loading';
import { StatusBar } from 'expo-status-bar';

class Cam extends React.Component {
    styles = StyleSheet.create({
        camera: {
            width: "100%",
            height: "100%",
            justifyContent: 'flex-end',
        }
    })
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
        data : {},
        loading : false,
        flash : Camera.Constants.FlashMode.off,
        lastpress: new Date().getTime(),
    }

    ref = React.createRef();

    async componentDidMount(){
          const { status } = await Camera.requestPermissionsAsync();
          this.setState({...this.state,hasPermission : (status === 'granted')})
    }
    predict = async (event) => {
      
      if (this.ref && !this.state.loading) {
        await this.ref.current.takePictureAsync({onPictureSaved: this.uploadimage})
        this.setState({...this.state,loading:true});
          //this.ref.current.pausePreview();
          //this.ref.current.resumePreview();
      }
    }
    uploadimage = async (dt) => {
      console.log("resizing image ...");
      const manipResult = await ImageManipulator.manipulateAsync(
        dt.uri,
        [{ resize: { width: 256, height: 256 } }],
        {compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      console.log("uploading image ...");
      var dtform = new FormData();
      dtform.append('file', { uri: manipResult.uri, name: 'picture.jpg', type: 'image/jpg' });
      axios.post('http://75bf612f4f98.ngrok.io/predict/predict/predict/', dtform).then(responseData => {
          this.setState({...this.state,loading:false})
          alert(responseData.data.result);
          console.log(responseData.data);
      })
      .catch(err => { console.log(err); });
    }
    activateFlash = async (event) => {
        var delta = new Date().getTime() - this.state.lastPress;
        if(delta < 200) {
           this.setState({...this.state,flash :(this.state.flash===Camera.Constants.FlashMode.on)
            ?Camera.Constants.FlashMode.off
            :Camera.Constants.FlashMode.on
          });
        }else{
          this.setState({
              ...this.state,
              lastPress: new Date().getTime()
          });
        }
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
            style={this.styles.camera} type={this.type}
            flashMode={this.state.flash}
            ratio="auto">
              <TouchableOpacity 
                style={[this.styles.camera]}
                onLongPress={this.predict}
                onPress={this.activateFlash}
                delayLongPress={1500}>
              </TouchableOpacity>
            <View style={this.styles.buttonContainer}>
                <PredBut press = {this.predict}/>
            </View>
          </Camera>
          {this.state.loading?<Loading/>:null}
          <StatusBar style="light" hidden={true}/>
        </View>
      );
    }

}


export default Cam;