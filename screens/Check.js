import {
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import Icon from '../components/styles/Icons'; // Icon 컴포넌트 import 추가
//db로드
import { addAsset, fetchQR, updateAssetImage, fetchAssetsImages } from '../components/Fetch/FetchData'

//keys
import { keys } from '../env';

//price 필터링
import { filterPriceList } from '../components/utils/filterPriceList';



const Check = (props) => {
    const isFocused = useIsFocused();

    const { params } = props.route;
    const asset = params ? params.asset : null;
    const rgb = params ? params.rgb : null;

    const [load, setLoad] = useState(false)
    const [user, setUser] = useState(null)
    const [priceList, setPriceList] = useState(null)
    const [imageList, setImageList] = useState(null)
    const [assetList, setAssetList] = useState(null)

    const [button1Scale, setButton1Scale] = useState(1);
    const [button1Color, setButton1Color] = useState('#967DFB');

    const handleButton1Press = () => {
        // 버튼1이 눌렸을 때 스케일 줄이기
        setButton1Scale(0.95);
        // 버튼1이 눌렸을 때 색상 변경
        setButton1Color('#866FE4');

    };

    const handleButton1Release = () => {
        // 버튼1을 뗄 때 원래 스케일로 돌리기
        setButton1Scale(1);
        // 버튼1의 색상 원래대로 돌리기
        setButton1Color('#967DFB');
    };

    // 체크 버튼을 눌렀을 때 배경색을 변경하는 함수
    const [isChecked, setIsChecked] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
    });

    // 체크 버튼을 눌렀을 때 배경색을 변경하는 함수
    const handleCheckPress = (buttonNumber) => {
        const updatedIsChecked = {};
        Object.keys(isChecked).forEach((key) => {
            updatedIsChecked[key] = false;
        });
        updatedIsChecked[buttonNumber] = true;
        setIsChecked(updatedIsChecked);
    };

    //사용자 정보 로드
    useEffect(() => {
        const fetchLogin = async () => {
            setLoad(true)
            const users = await AsyncStorage.getItem("@user");
            const imageData1 = await fetchAssetsImages(JSON.parse(users).userID)
            await AsyncStorage.setItem("@imageData", JSON.stringify(imageData1));
            const imageData = await AsyncStorage.getItem("@imageData");
            const priceData = await AsyncStorage.getItem("@priceData");
            const assetData = await AsyncStorage.getItem("@assetData");
            setUser(JSON.parse(users))
            setPriceList(JSON.parse(priceData))
            setImageList(JSON.parse(imageData))
            setAssetList(JSON.parse(assetData))
            setLoad(false)
        }
        fetchLogin()
    }, [isFocused])


    if (load == true) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../assets/icons/SIDI Logo.gif')}
                    style={{ height: '100%', width: '100%' }}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.safecontainer]}>
            <View style={{ width: '91%' }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.titleSection}>
                        <Text style={styles.mainTitle}></Text>
                    </View>
                    <View style={styles.lastView}>
                        <Text style={styles.lastText}>상태를 체크해주세요</Text>
                        <Text style={styles.sublastText}>가장 근접한 것에 체크해주세요</Text>
                    </View>
                    <View>
                        <View style={styles.checkView}>
                            <View>
                                <Text style={styles.checkText}>새상품</Text>
                                <Text style={styles.subcheckText}>미개봉 제품</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.checkcircle1, { backgroundColor: isChecked[1] ? '#967DFB' : '#767676' }]}
                                onPress={() => handleCheckPress(1)}
                                activeOpacity={1}
                            >
                                <Icon name='checkmark' size={16} color={'#ffffff'} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <View style={styles.checkView}>
                            <View>
                                <Text style={styles.checkText}>이상 없음</Text>
                                <Text style={styles.subcheckText}>기스, 스크래치 등이 없고 가능상에 이상이 없는 제품</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.checkcircle2, { backgroundColor: isChecked[2] ? '#967DFB' : '#767676' }]}
                                onPress={() => handleCheckPress(2)}
                                activeOpacity={1}
                            >
                                <Icon name='checkmark' size={16} color={'#ffffff'} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <View style={styles.checkView}>
                            <View>
                                <Text style={styles.checkText}>기스</Text>
                                <Text style={styles.subcheckText}>기스, 스크래치, 찍힘, 흠집 등이 있는 제품</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.checkcircle3, { backgroundColor: isChecked[3] ? '#967DFB' : '#767676' }]}
                                onPress={() => handleCheckPress(3)}
                                activeOpacity={1}
                            >
                                <Icon name='checkmark' size={16} color={'#ffffff'} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <View style={styles.checkView}>
                            <View>
                                <Text style={styles.checkText}>액정 파손</Text>
                                <Text style={styles.subcheckText}>액정이 깨져있거나 금이 가있는 제품</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.checkcircle4, { backgroundColor: isChecked[4] ? '#967DFB' : '#767676' }]}
                                onPress={() => handleCheckPress(4)}
                                activeOpacity={1}
                            >
                                <Icon name='checkmark' size={16} color={'#ffffff'} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <View style={styles.checkView}>
                            <View>
                                <Text style={styles.checkText}>외판 손상</Text>
                                <Text style={styles.subcheckText}>액정을 제외한 나머지 부분에 파손이 있는 제품</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.checkcircle5, { backgroundColor: isChecked[5] ? '#967DFB' : '#767676' }]}
                                onPress={() => handleCheckPress(5)}
                                activeOpacity={1}
                            >
                                <Icon name='checkmark' size={16} color={'#ffffff'} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <View style={styles.checkView1}>
                            <View>
                                <Text style={styles.checkText}>기능 고장</Text>
                                <Text style={styles.subcheckText}>버튼 고장, 카메라 고장 등 문제가 있는 제품</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.checkcircle6, { backgroundColor: isChecked[6] ? '#967DFB' : '#767676' }]}
                                onPress={() => handleCheckPress(6)}
                                activeOpacity={1}
                            >
                                <Icon name='checkmark' size={16} color={'#ffffff'} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.btView, { transform: [{ scale: button1Scale }], backgroundColor: button1Color }]}
                        onPress={() => {
                            setLoad(true)
                            const fetchPrice = async () => {
                                let condition
                                if (isChecked[1] == true) {
                                    condition = '새상품'
                                } else if (isChecked[2] == true) {
                                    condition = '이상 없음'
                                } else if (isChecked[3] == true) {
                                    condition = '기스'
                                } else if (isChecked[4] == true) {
                                    condition = '액정 파손'
                                } else if (isChecked[5] == true) {
                                    condition = '외판 손상'
                                } else if (isChecked[6] == true) {
                                    condition = '기능 고장'
                                }
                                const addResult = await addAsset({
                                    index: asset.index,
                                    COMPANY: asset.COMPANY,
                                    MODEL: asset.MODEL,
                                    MORE: asset.MORE,
                                    CATEGORY: asset.CATEGORY,
                                    RGB: rgb.RGB,
                                    COLOR: rgb.color,
                                    CONDITIONS: condition
                                });
                                //console.log(`${asset.COMPANY} ${asset.MODEL} ${asset.MORE}`)
                                const filteredList = filterPriceList(priceList, `${asset.COMPANY} ${asset.MODEL} ${asset.MORE}`, condition)
                                await fetchQR({
                                    userID: user.userID,
                                    assetID: addResult.id,
                                    price: filteredList[filteredList.length - 1].value,
                                })
                                await updateAssetImage(`${keys.flaskURL}/image_m`, user.userID, 1, addResult.id)
                                await imageList.push({ url: `${keys.flaskURL}/image_m`, name: `${addResult.id}_1.jpeg`, assetID: `${addResult.id}`, imageNumber: `1` })
                                await AsyncStorage.setItem("@imageData", JSON.stringify(imageList));
                                await assetList.push({ AssetsID: addResult.id, COMPANY: asset.COMPANY, MODEL: asset.MODEL, MORE: asset.MORE, COLOR: rgb.color, GPTCONTENT: null, UserID: user.userID, CategoryID: asset.CATEGORY, PRICE: filteredList[filteredList.length - 1].value, CONDITIONS: condition, DATE: new Date() })
                                await AsyncStorage.setItem("@assetData", JSON.stringify(assetList));
                                setLoad(false)
                                props.navigation.navigate('MyPageMain')
                            }
                            fetchPrice()
                        }}
                        onPressIn={handleButton1Press}
                        onPressOut={handleButton1Release}
                        activeOpacity={1}
                    >
                        <Text style={styles.btText}>등록하기</Text>
                    </TouchableOpacity>
                </ScrollView>


            </View>
        </SafeAreaView>
    )
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
    lastView: {
        alignItems: 'flex-start',
        width: '100%',
    },
    lastText: {
        fontSize: 26,
        fontFamily: 'Pretendard-SemiBold',
        marginTop: 10,
        textAlign: 'left'
    },
    sublastText: {
        fontSize: 16,
        fontFamily: 'Pretendard-Regular',
        marginTop: 10,
        textAlign: 'left',
        color: '#767676'
    },
    checkText: {
        fontSize: 20,
        fontFamily: 'Pretendard-Bold',
        marginBottom: 8,
        color: '#111111',
        marginLeft: 20,
    },
    subcheckText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
        color: '#767676',
        marginLeft: 20,
        marginTop: 6
    },
    checkView: {
        width: '100%',
        height: 100,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f5f5f5',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkView1: {
        width: '100%',
        height: 100,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f5f5f5',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkcircle1: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#767676',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkcircle2: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#767676',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkcircle3: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#767676',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkcircle4: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#767676',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkcircle5: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#767676',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkcircle6: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#767676',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btView: {
        width: '100%',
        height: 60,
        borderRadius: 14,
        marginTop: 4,
        backgroundColor: '#967DFB',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btText: {
        fontSize: 20,
        fontFamily: 'Pretendard-Bold',
        color: '#ffffff',
    },
});

export default Check
