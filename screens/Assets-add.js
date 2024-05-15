import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';



const AssetsAdd = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [imgUri, setImgUri] = useState(null)

    // 권한 요청
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('카메라 사용 권한을 허용해주세요!');
            }
        })();
    }, []);

    // 사진 찍기 함수
    const takePicture = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.5,
            });

            if (!result.cancelled) {
                setImgUri(result.assets[0].uri);
            }
        } catch (error) {
            console.log('사진을 찍는 중 오류 발생:', error);
        }
    };



    return (
        <View style={styles.mainView}>
            {/* 여기 지우고 만들면 돼 */}
            <View style={{width: '90%', height: 300, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'lightgray', marginBottom: 40}}>
                <Text>여기에 주의사항 고고</Text>
            </View>
            {/* 여기까지 */}


            <View style={styles.btnView}>
                <TouchableOpacity
                    style={[styles.takePictureBtn, {backgroundColor: 'white'}]}
                    onPress={() => {
                        props.navigation.navigate('MyPageMain')
                    }}
                >
                    <Text style={[styles.takePictureBtnText, {color: '#866FE4'}]}>돌아가기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.takePictureBtn}
                    onPress={takePicture}>
                    <Text style={styles.takePictureBtnText}>촬영하기</Text>
                </TouchableOpacity>    
            </View>
        </View>
    );
}




const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },




    //촬영 버튼
    btnView: {
        flexDirection: 'row',
    },
    takePictureBtn: {
        width: 170,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#866FE4',
        borderRadius: 20,
        margin: 5,
    },
    takePictureBtnText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
    },
})


export default AssetsAdd