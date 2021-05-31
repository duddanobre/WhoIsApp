import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { windowHeight} from './dimentions/Dimentions';
import { FAB } from 'react-native-elements';

import { RNCamera } from 'react-native-camera';

export default class Recognize extends Component {

    constructor() {
        super();
        const takePicture = async () => {
            if (this.camera) {
                const options = { quality: 0.5, base64: true};
                const data = await this.camera.takePictureAsync(options);
                console.log(data.uri);
            }
        };
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    } }
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permissão para uso da camera',
                        message: 'Permitir que o aplicativo use a camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    />
                <View style={styles.button}>
                    <FAB color="#ae52d4"
                        icon={<Icon
                            name="face-recognition"
                            size={24}
                            color="#fff" />}
                        onPress={() => { takePicture(); } } />
                </View>
            </View>
        );     
    }
};

const styles = StyleSheet.create({
    button:{
        left: 150,
        bottom: 10,
        marginTop: 280,
        height: windowHeight / 15,
    },
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