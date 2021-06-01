import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {View} from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class Recognize extends Component {

   async takePicture(){
            if (this.camera) {
                const options = { quality: 0.5, base64: true};
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
                    />
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
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
});