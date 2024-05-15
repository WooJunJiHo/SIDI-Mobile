import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//서버 요청
import { uploadImage, getInfos, fetchColor } from '../components/Fetch/FetchData';
import { ScrollView } from 'react-native-gesture-handler';




const AssetsAdd = (props) => {
    const [load, setLoad] = useState(false)
    const [preAsset, setPreAsset] = useState(null)
    const [info, setInfo] = useState(null)
    const [asset, setAsset] = useState(null)
    const [rgb, setRGB] = useState('')

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
                setLoad(true)
                const preRes = await uploadImage(result.assets[0].uri)
                const infoRes = await getInfos(preRes)
                setPreAsset(preRes)
                setInfo(infoRes)
                setLoad('model')
            }
        } catch (error) {
            console.log('사진을 찍는 중 오류 발생:', error);
        }
    };



    if (load == true) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../assets/icons/SIDI Logo.gif')}
                    style={{ height: '100%', width: '100%' }}
                />
            </View>
        )
    } else if (load == 'model') {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 60, }}>
                    <Text>모델을 선택해주세요</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {info.map((item, idx) => {
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={{ flexDirection: 'row' }}
                                onPress={() => {
                                    const fetchFlask = async () => {
                                        setLoad(true)
                                        const result = await fetchColor({ index: item.AssetsMoreInfoID, name: `${item.COMPANY} ${item.MODEL} ${item.MORE}` })
                                        setRGB(result)
                                        setAsset({
                                            index: item.AssetsMoreInfoID,
                                            COMPANY: item.COMPANY,
                                            MODEL: item.MODEL,
                                            MORE: item.MORE,
                                            CATEGORY: preAsset.category,
                                        })
                                        setLoad('colorResult')
                                    }
                                    fetchFlask()
                                }}
                            >
                                <View style={styles.modelCheck}>
                                    <Image source={require('../assets/icons/Vector.png')} style={{ width: 20, height: 15 }} />
                                </View>
                                <Text style={styles.modelText}>{item.COMPANY} {item.MODEL} {item.MORE}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    } else if (load == 'colorResult') {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.colorResultTitle}>색상을 확인해주세요</Text>
                <View style={styles.colorView}>
                    <View style={[styles.rgbBox, { backgroundColor: rgb.RGB }]}></View>
                    <Text style={{ fontSize: 30 }}>{rgb.color}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.nextBtn, { borderWidth: 2 }]}
                        onPress={() => {
                            setLoad('model')
                        }}
                    >
                        <Text style={styles.nextBtnText}>다시 선택</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity
                        style={[styles.nextBtn, { backgroundColor: '#6C60F1' }]}
                        onPress={() => {
                            props.navigation.navigate('AssetsAddCondition', { rgb: rgb, asset: asset })
                        }}
                    >
                        <Text style={[styles.nextBtnText, { color: 'white' }]}>완료하기</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (
        <View style={styles.mainView}>
            {/* 여기 지우고 만들면 돼 */}
            <View style={{ width: '90%', height: 300, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'lightgray', marginBottom: 40 }}>
                <Text>여기에 주의사항 고고</Text>
            </View>
            {/* 여기까지 */}

            <View style={styles.btnView}>
                <TouchableOpacity
                    style={[styles.takePictureBtn, { backgroundColor: 'white' }]}
                    onPress={() => {
                        props.navigation.navigate('MyPageMain')
                    }}
                >
                    <Text style={[styles.takePictureBtnText, { color: '#866FE4' }]}>돌아가기</Text>
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




    modelText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 60,
        marginTop: 10,
        marginLeft: 20,
    },
    modelCheck: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },




    colorResultTitle: {
        margin: 60,
        fontSize: 20
    },
    colorView: {
        width: '90%',
        height: 300,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rgbBox: {
        width: 150,
        height: 150,
        borderRadius: 200,
        borderColor: 'black',
        borderWidth: 1
    },
    nextBtn: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
    },
    nextBtnText: {
        fontSize: 16,
    },
})


export default AssetsAdd




