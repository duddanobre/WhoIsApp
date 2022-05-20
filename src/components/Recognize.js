import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';
import base64ToArrayBuffer from 'base64-arraybuffer';
import LottieView from 'lottie-react-native';

const locate = 'southcentralus.api.cognitive.microsoft.com';
const key = '4babdbede4bc4fb59ce92d5b9f2fe1ae';

const base_instance_options = {
  baseURL: `https://${locate}/face/v1.0`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': key,
  },
};

export default function Recognize({navigation}) {
  let camera;
  const [loading, setLoading] = useState(false);
  async function takePicture() {
    // camera.capture()
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      const img = base64ToArrayBuffer.decode(data.base64);
      console.log(data.uri);
      setLoading(true);
      try {
        const facedetect = {...base_instance_options};
        facedetect.headers['Content-Type'] = 'application/octet-stream';
        const facedetect_instance = axios.create(facedetect);

        const facedetect_res = await facedetect_instance.post(
          '/detect?returnFaceId=true&recognitionModel=recognition_03&detectionModel=detection_02',
          img,
        );

        console.log('face detect res: ', facedetect_res.data);

        if (facedetect_res.data.length) {
          const findSimilars = {...base_instance_options};
          findSimilars.headers['Content-Type'] = 'application/json';
          const findsimilars_instance = axios.create(findSimilars);
          const findsimilars_res = await findsimilars_instance.post(
            '/findsimilars',
            {
              faceId: facedetect_res.data[0].faceId,
              faceListId: 'whois-3e-facelist',
              //maxNumOfCandidatesReturned: 1,
              mode: 'matchPerson',
            },
          );

          if (findsimilars_res.data.length) {
            console.log('Response: ', findsimilars_res.data);
            const response = findsimilars_res.data;
            console.log('Response: ', response);

            setLoading(false);
            navigation.navigate('Identificação', {paramResponse: response});
          } else {
            Alert.alert('Nenhuma face detectada. Por favor, tente novamente!');
            setLoading(false);
          }
        } else {
          Alert.alert(
            'Nenhuma face detectada. Por favor, verifique se há luz suficiente ao tirar uma foto.',
          );
          setLoading(false);
        }
      } catch (err) {
        Alert.alert('Ocorreu um erro. Tente novamente.');
        console.log('erro: ', err);
        setLoading(false);
      }
    }
  }

  return loading ? (
    <LottieView source={require('../assets/loading2.json')} autoPlay loop />
  ) : (
    <View style={styles.container}>
      <Icon
        name="x-square"
        size={35}
        color="#ddd"
        style={styles.close}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <RNCamera
        ref={(ref) => {
          camera = ref;
        }}
        // captureTarget
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
      <View
        style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
        <Icon
          name="camera"
          size={35}
          style={styles.capture}
          onPress={() => {
            takePicture();
            Alert.alert('Imagem capturada, aguarde...');
          }}
        />
      </View>
    </View>
  );
}

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
  close: {
    borderRadius: 5,
    left: 360,
  },
});
