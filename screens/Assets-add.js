import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//서버 요청
import { uploadImage, getInfos, fetchColor } from '../components/Fetch/FetchData';

import Icon from 'react-native-vector-icons/Entypo'; 



const AssetsAdd = (props) => {
    const [load, setLoad] = useState(false)
    const [preAsset, setPreAsset] = useState(null)
    const [info, setInfo] = useState(null)
    const [asset, setAsset] = useState(null)
    const [rgb, setRGB] = useState('')
    const [button1Scale, setButton1Scale] = useState(1);
    const [button2Scale, setButton2Scale] = useState(1);
    const [button1Color, setButton1Color] = useState('#E4DDFF');
    const [button2Color, setButton2Color] = useState('#967DFB');


    const handleButton1Press = () => {
        // 버튼1이 눌렸을 때 스케일 줄이기
        setButton1Scale(0.95);
        // 버튼1이 눌렸을 때 색상 변경
        setButton1Color('#CBC2F0');
        // 버튼2 스케일과 색상 초기화
        setButton2Scale(1);
        setButton2Color('#967DFB');
    };
    const handleButton2Press = () => {
        // 버튼2가 눌렸을 때 스케일 줄이기
        setButton2Scale(0.95);
        // 버튼2가 눌렸을 때 색상 변경
        setButton2Color('#866FE4');
        // 버튼1 스케일과 색상 초기화
        setButton1Scale(1);
        setButton1Color('#E4DDFF');
    };

    const handleButton1Release = () => {
        // 버튼1을 뗄 때 원래 스케일로 돌리기
        setButton1Scale(1);
        // 버튼1의 색상 원래대로 돌리기
        setButton1Color('#E4DDFF');
    };

    const handleButton2Release = () => {
        // 버튼2를 뗄 때 원래 스케일로 돌리기
        setButton2Scale(1);
        // 버튼2의 색상 원래대로 돌리기
        setButton2Color('#967DFB');
    };
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
        <SafeAreaView style={[styles.safecontainer]}>
            <ScrollView style={{ width: '91%' }}>
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}></Text>
                </View>

                <View style={styles.pleaseView}>
                    <Text style={styles.pleaseText}>아래 사항을 꼭 지켜주세요!</Text>
                    <Text style={styles.subpleaseText}>지켜지지 않으면 결과가 제대로 나오지 않을 수도 있어요</Text>
                </View>

                <View style={styles.inforView}>
                    <Text style={styles.inforText}>
                        디바이스를 이용하면 {'\n'}더 정확하게 가격을 측정할 수 있어요
                    </Text>
                    <TouchableOpacity style={{position:'absolute', bottom: 10, left: 20}} onPress={() => { props.navigation.navigate('Scan') }}>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={styles.subinforText}>
                                QR 코드 등록하러 가기
                            </Text>
                            <Icon
                                name='chevron-small-right'
                                size={28}
                                color={'#ffffff'}
                                right={2}
                            />
                        </View>
                    </TouchableOpacity>


                    <View style={styles.graphContainer}>
                        <Image
                            source={require('../assets/icons/Inside.png')}
                            style={styles.Inside}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: 1, backgroundColor: '#f5f5f5', marginTop: 20 }}>

                </View>
                <View style={styles.mainView}>

                    <View style={styles.container}>
                        <Image
                            source={require('../assets/icons/Phone3D.png')}
                            style={styles.iphone}
                        />
                        <Text style={styles.phoneText}>핸드폰은 뒷면이 보이게 찍어주세요</Text>
                    </View>
                    <View style={styles.container}>
                        <Image
                            source={require('../assets/icons/Wallet.png')}
                            style={styles.iphone}
                        />
                        <Text style={styles.phoneText}>악세서리는 모두 때주세요</Text>
                    </View>
                    <View style={styles.container}>
                        <Image
                            source={require('../assets/icons/Ruler.png')}
                            style={styles.ruler}
                        />
                        <Text style={styles.phoneText}>기기가 가운데로 오게 촬영해주세요</Text>
                    </View>



                    <View style={styles.btnView}>
                        <TouchableOpacity
                            style={[styles.takePictureBtn1, { transform: [{ scale: button1Scale }], backgroundColor: button1Color }]}
                            onPress={() => {
                                props.navigation.navigate('MyPageMain')
                            }}
                            onPressIn={handleButton1Press}
                            onPressOut={handleButton1Release}
                            activeOpacity={1}
                        >
                            <Text style={[styles.takePictureBtnText1]}>돌아가기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.takePictureBtn2, { transform: [{ scale: button2Scale }], backgroundColor: button2Color }]}
                            onPress={takePicture}
                            onPressIn={handleButton2Press}
                            onPressOut={handleButton2Release}
                            activeOpacity={1}
                        >
                            <Text style={styles.takePictureBtnText2}>촬영하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    safecontainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    titleSection: {
        width: '100%',
    },
    mainTitle: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'Pretendard-SemiBold',
    },
    mainView: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 16,
    },
    container: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        left: '1%',
    },
    pleaseView: {
        alignItems: 'flex-start',
        width: '100%',
    },
    pleaseText: {
        fontSize: 26,
        fontFamily: 'Pretendard-SemiBold',
        marginTop: 10,
        textAlign: 'left'
    },
    subpleaseText: {
        fontSize: 16,
        fontFamily: 'Pretendard-Regular',
        marginTop: 10,
        textAlign: 'left',
        color: '#767676'
    },
    inforView: {
        width: '100%',
        height: '54%',
        backgroundColor: '#866FE4',
        borderRadius: 20,
        marginTop: 30,
    },
    inforText: {
        fontSize: 22,
        fontFamily: 'Pretendard-SemiBold',
        marginTop: 20,
        lineHeight: 34,
        left: 20,
        color: '#ffffff'
    },
    subinforText: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        marginTop: 20,
        bottom: 14,
        color: '#ffffff',
    },

    //촬영 버튼
    btnView: {
        flexDirection: 'row',
        marginTop: 10
    },
    takePictureBtn1: {
        width: '47%',
        height: 51,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#866FE4',
        borderRadius: 20,
        margin: 5,
    },
    takePictureBtnText1: {
        color: '#5B40C4',
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
    },
    takePictureBtn2: {
        width: '47%',
        height: 51,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#866FE4',
        borderRadius: 20,
        margin: 5,
    },
    takePictureBtnText2: {
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


    iphone: {
        width: 30,
        height: 40,
    },
    phoneText: {
        color: '#111111',
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        marginLeft: 20,
    },
    ruler: {
        width: 30,
        height: 30,
    },
    graphContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    Inside: {
        width: 140,
        height: 140,
        right: 0,
        bottom: 10,
    }
})



export default AssetsAdd
