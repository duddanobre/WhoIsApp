import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

import { RNCamera } from 'react-native-camera';

export default class Recognize extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: true,
        }
    }

   async takePicture(){
            if (this.camera) {
                const options = { quality: 0.5, base64: true, pauseAfterCapture: true};
                const data = await this.camera.takePictureAsync(options);
                console.log(data.uri);
                
            }
    }; 

    
        render(){
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Permissão para uso da camera',
                        message: 'Permitir que o aplicativo use a camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancelar',
                    }}
                    playSoundOnCapture={true}
                    />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon
                        name="camera"
                        size={35}
                        style={styles.capture}
                        onPress={() => {this.takePicture()}}
                    />
                </View>
            </View>
        );     
    }
};  


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
});