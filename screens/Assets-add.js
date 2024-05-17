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
            <SafeAreaView style={[styles.safecontainer]}>
                <View style={{ width: '91%' }}>
                    <View style={{ alignItems: 'center', marginBottom: 30, marginTop: 30, }}>
                        <Text style={styles.selectmodelText}>모델을 선택해주세요</Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={{ height: '90%' }}
                    >
                        {info.map((item, idx) => {
                            return (
                                <TouchableOpacity
                                    key={idx}
                                    style={{ marginBottom: 20 }}
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                                        <View style={styles.modelCheck}>
                                            {item.COMPANY === 'Apple' ? (
                                                <Image source={require('../assets/icons/Apple Logo.png')} style={styles.LogoImage} />
                                            ) : item.COMPANY === 'Samsung' ? (
                                                <Image source={require('../assets/icons/Samsung Logo.png')} style={styles.LogoImage} />
                                            ) : (
                                                <Image source={require('../assets/icons/Apple Logo.png')} style={styles.LogoImage} />
                                            )}
                                        </View>
                                        <View>
                                            <Text style={styles.modelsubText}>기종</Text>
                                            <Text style={styles.modelText}>{item.COMPANY} {item.MODEL} {item.MORE}</Text>
                                        </View>

                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    } else if (load == 'colorResult') {
        return (
            <SafeAreaView style={[styles.safecontainer]}>

                <View style={{ width: '91%', height: '84%', alignItems: 'center', marginTop: 30, }}>
                    <Text style={styles.colorResultTitle}>색상</Text>
                    <View style={styles.pleaseView}>
                        <Text style={styles.pleasecolorText}>색상이 정확하지 않을 수도 있어요</Text>
                        <Text style={styles.subpleasecolorText}>다른 색상이 나오면 다시 선택을 눌러주세요</Text>
                    </View>
                    <View style={styles.colorView}>
                        <View style={[styles.rgbBox, { backgroundColor: rgb.RGB }]}></View>
                        <Text style={styles.colorText}>{rgb.color}</Text>
                    </View>

                </View>
                <View style={styles.btnView1}>
                    <TouchableOpacity
                        style={[styles.nextBtn1, , { transform: [{ scale: button1Scale }], backgroundColor: button1Color }]}
                        onPress={() => {
                            setLoad('model')
                        }}
                        onPressIn={handleButton1Press}
                        onPressOut={handleButton1Release}
                        activeOpacity={1}
                    >
                        <Text style={styles.nextBtnText1}>다시 선택</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.nextBtn2, , { transform: [{ scale: button2Scale }], backgroundColor: button2Color }]}
                        onPress={() => {
                            props.navigation.navigate('AssetsAddCondition', { rgb: rgb, asset: asset })
                        }}
                        onPressIn={handleButton2Press}
                        onPressOut={handleButton2Release}
                        activeOpacity={1}
                    >
                        <Text style={[styles.nextBtnText2]}>완료하기</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={[styles.safecontainer]}>

                <View style={{ width: '91%', height: '92%' }}>
                    <View style={styles.pleaseView}>
                        <Text style={styles.colorResultTitle}></Text>
                        <Text style={styles.pleasecolorText}>아래 사항을 꼭 지켜주세요!</Text>
                        <Text style={styles.subpleasecolorText}>지켜지지 않으면 결과가 제대로 나오지 않을 수도 있어요</Text>
                    </View>

                    <View style={styles.inforView}>
                        <Text style={styles.inforText}>
                            디바이스를 이용하면 {'\n'}더 정확하게 가격을 측정할 수 있어요
                        </Text>
                        <TouchableOpacity style={{ position: 'absolute', bottom: 10, left: 20 }} onPress={() => { props.navigation.navigate('Scan') }}>
                            <View style={{ flexDirection: 'row' }}>
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

                    <View style={styles.container1}>
                        <Image
                            source={require('../assets/icons/Phone3D.png')}
                            style={styles.iphone}
                        />
                        <Text style={styles.phoneText}>핸드폰은 뒷면이 보이게 찍어주세요</Text>
                    </View>
                    <View style={styles.container1}>
                        <Image
                            source={require('../assets/icons/Wallet.png')}
                            style={styles.iphone}
                        />
                        <Text style={styles.phoneText}>악세서리는 모두 때주세요</Text>
                    </View>
                    <View style={styles.container1}>
                        <Image
                            source={require('../assets/icons/Ruler.png')}
                            style={styles.ruler}
                        />
                        <Text style={styles.phoneText}>기기가 가운데로 오게 촬영해주세요</Text>
                    </View>

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
    container1: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        left: '1%',
        marginTop: 12
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
        height: 280,
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
        width:'91%',
        bottom: 10
    },
    takePictureBtn1: {
        width: '48%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#866FE4',
        borderRadius: 14,
        marginRight: 12,
    },
    takePictureBtnText1: {
        color: '#5B40C4',
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
    },
    takePictureBtn2: {
        width: '48%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#967DFB',
        borderRadius: 14,
    },
    takePictureBtnText2: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
    },



    selectmodelText: {
        fontSize: 20,
        fontFamily: 'Pretendard-SemiBold',
        color: '#111111',
    },
    modelsubText: {
        fontSize: 14,
        fontFamily: 'Pretendard-SemiBold',
        color: '#767676',
        marginLeft: 16,
        marginBottom: 6,
    },
    modelText: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        color: '#111111',
        marginLeft: 16,
    },
    modelCheck: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderColor: '#f1f1f1',
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogoImage: {
        width: '95%',
        height: '95%',
        resizeMode: 'cover',
        borderRadius: 22,
    },


    btnView1: {
        flexDirection: 'row',
        marginTop: 20,
        width: '91%'
    },
    colorResultTitle: {
        fontSize: 20,
        fontFamily: 'Pretendard-SemiBold',
        color: '#111111',
        marginBottom: 30,
    },
    colorView: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#f1f1f1',
    },
    colorText: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        color: '#111111',
        marginLeft: 12,
    },
    pleasecolorText: {
        fontSize: 26,
        fontFamily: 'Pretendard-SemiBold',
        textAlign: 'left'
    },
    subpleasecolorText: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'Pretendard-Regular',
        textAlign: 'left',
        color: '#767676'
    },
    rgbBox: {
        width: 44,
        height: 44,
        borderRadius: 200,
        borderColor: '#f1f1f1',
        borderWidth: 1,
        marginLeft: 20,
    },
    nextBtn1: {
        width: '48%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#E4DDFF',
        marginRight: 12,
    },
    nextBtn2: {
        width: '48%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#967DFB',
    },
    nextBtnText1: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        color: '#5B40C4',
    },
    nextBtnText2: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        color: '#ffffff',
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
