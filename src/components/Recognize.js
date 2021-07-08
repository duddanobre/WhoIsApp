import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import base64ToArrayBuffer from 'base64-arraybuffer';

const locate = 'brazilsouth.api.cognitive.microsoft.com';
const key = '686e7be902614784b48888e18de75f1e';

const base_instance_options = {
  baseURL: `https://${locate}/face/v1.0`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': key
  }
};

export default function Recognize({ navigation }){
let camera;  
const [userId, setUserId] = useState('');
const [nome, setNome] = useState('');
const [showCamera, setShowCamera] = useState(false);


const enterRoom = (value) => {
    
      setUserId(RandomId(15)),
      setNome(value),
      setShowCamera(true)
  }

  async function takePicture(){
       // camera.capture()
            if (camera) {
                const options = { quality: 0.5, base64: true};
                const data = await camera.takePictureAsync(options);
                const img = base64ToArrayBuffer.decode(data.base64)
                console.log(data.uri);
                
                try {
                    const facedetect = { ...base_instance_options };
                    facedetect.headers['Content-Type'] = 'application/octet-stream';
                    const facedetect_instance = axios.create(facedetect);
            
                    const facedetect_res = await facedetect_instance.post(
                      `/detect?returnFaceId=true&detectionModel=detection_02`,
                      img
                    );
            
                    console.log("face detect res: ", facedetect_res.data);
            
                    if (facedetect_res.data.length) {
            
                      const findSimilars = { ...base_instance_options };
                      findSimilars.headers['Content-Type'] = 'application/json';
                      const findsimilars_instance = axios.create(findSimilars);
                      const findsimilars_res = await findsimilars_instance.post(
                        `/findsimilars`,
                        {
                          faceId: facedetect_res.data[0].faceId,
                          faceListId: 'wern-faces-01',
                          maxNumOfCandidatesReturned: 2,
                          mode: 'matchPerson'
                        }
                      );
            
                      console.log("find similars res: ", findsimilars_res.data);
            
                      if (findsimilars_res.data.length) {
            
                        Alert.alert("Found match!", "You've successfully attended!");
                        this.attend();
            
                      } else {
                        Alert.alert("No match found", "Sorry, you are not registered");
                      }
            
                    } else {
                      Alert.alert("error", "Cannot find any face. Please make sure there is sufficient light when taking a selfie");
                    }
            
                  } catch (err) {
                    console.log("err: ", err);
                  }
                }
            }      
        
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        camera = ref;
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
                        onPress={() => {takePicture(), navigation.navigate("Idenfiticação")}}
                    />
                </View>
            </View>
        );      
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