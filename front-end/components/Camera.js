import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity , Button} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import PredBut from './predictButton';
import Loading from './Loading';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';

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
        flash : "off",
        lastpress: new Date().getTime(),
        firstLaunch : true,
    }

    ref = React.createRef();

    async componentDidMount(){
          const { status } = await Camera.requestPermissionsAsync();
          this.setState({...this.state,hasPermission : (status === 'granted')})
          if (this.state.firstLaunch){
            Speech.speak("Hi.")
            Speech.speak("Welcome to currency recognition app.");
            Speech.speak("To scan your money, long press the screen for one second.");
            Speech.speak("To activate or deactivate the flash, double click the screen.");
            this.setState({...this.state,firstLaunch : false});
          }
    }
    predict = async (event) => {
      
      if (this.ref && !this.state.loading) {
        await this.ref.current.takePictureAsync({onPictureSaved: this.uploadimage})
        this.setState({...this.state,loading:true});

        Speech.speak("Scanning... This might take few seconds.")
        this.ref.current.pausePreview();
        
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
      axios.post('http://397348c0cd54.ngrok.io/predict/predict/predict/', dtform).then(responseData => {
          this.setState({...this.state,loading:false})
          //alert(responseData.data.result);
          Speech.speak("This is "+responseData.data.result)
          console.log(responseData.data);
          this.ref.current.resumePreview();
      })
      .catch(err => { console.log(err); });
    }
    activateFlash = async (event) => {
        Speech.stop();
        var delta = new Date().getTime() - this.state.lastPress;
        if(delta < 200) {
          var next_flash_state = (this.state.flash==="on")?"off":"on";
          Speech.speak("   flash "+next_flash_state);
          this.setState({...this.state,flash :next_flash_state});
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
                delayLongPress={1000}>
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