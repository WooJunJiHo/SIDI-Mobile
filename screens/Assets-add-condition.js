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

//db로드
import { addAsset, fetchQR, updateAssetImage, fetchAssetsImages } from '../components/Fetch/FetchData'

//keys
import { keys } from '../env';

//price 필터링
import { filterPriceList } from '../components/utils/filterPriceList';



const AssetsAddCondition = (props) => {
    const isFocused = useIsFocused();

    const { params } = props.route;
    const asset = params ? params.asset : null;
    const rgb = params ? params.rgb : null;

    const [load, setLoad] = useState(false)
    const [addID, setAddID] = useState(null)
    const [user, setUser] = useState(null)
    const [priceList, setPriceList] = useState(null)
    const [imageList, setImageList] = useState(null)
    const [assetList, setAssetList] = useState(null)

    const [button1Scale, setButton1Scale] = useState(1);
    const [button2Scale, setButton2Scale] = useState(1);
    const [button1Color, setButton1Color] = useState('#AABAF4');
    const [button2Color, setButton2Color] = useState('#F2B500');
    
    const handleButton1Press = () => {
        // 버튼1이 눌렸을 때 스케일 줄이기
        setButton1Scale(0.95);
        // 버튼1이 눌렸을 때 색상 변경
        setButton1Color('#7491FA');
        // 버튼2 스케일과 색상 초기화
        setButton2Scale(1);
        setButton2Color('#F2B500');
    };
    const handleButton2Press = () => {
        // 버튼2가 눌렸을 때 스케일 줄이기
        setButton2Scale(0.95);
        // 버튼2가 눌렸을 때 색상 변경
        setButton2Color('#CE9B04');
        // 버튼1 스케일과 색상 초기화
        setButton1Scale(1);
        setButton1Color('#AABAF4');
    };

    const handleButton1Release = () => {
        // 버튼1을 뗄 때 원래 스케일로 돌리기
        setButton1Scale(1);
        // 버튼1의 색상 원래대로 돌리기
        setButton1Color('#AABAF4');
    };

    const handleButton2Release = () => {
        // 버튼2를 뗄 때 원래 스케일로 돌리기
        setButton2Scale(1);
        // 버튼2의 색상 원래대로 돌리기
        setButton2Color('#F2B500');
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
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}></Text>
                </View>
                <View style={styles.lastView}>
                    <Text style={styles.lastText}>이제 마지막 단계에요!</Text>
                    <Text style={styles.sublastText}>둘 중 하나를 선택해주세요</Text>
                </View>

                <TouchableOpacity
                    style={[styles.checkView, , { transform: [{ scale: button1Scale }], backgroundColor: button1Color }]}
                    onPress={() => { props.navigation.navigate('Check', {asset: asset, rgb: rgb}) }}
                    onPressIn={handleButton1Press}
                    onPressOut={handleButton1Release}
                    activeOpacity={1}
                >
                    <Text style={styles.checkText}>상태 체크 페이지</Text>
                    <Text style={styles.subcheckText}>기기의 상태를 체크해주세요</Text>
                    <Image
                        source={require('../assets/icons/CheckBook.png')}
                        style={styles.Inside}
                    />
                </TouchableOpacity>



                <TouchableOpacity
                    style={[styles.registrationView, , { transform: [{ scale: button2Scale }], backgroundColor: button2Color }]}
                    onPressIn={handleButton2Press}
                    onPressOut={handleButton2Release}
                    activeOpacity={1}
                    onPress={() => {
                        setLoad(true)
                        const fetchPrice = async () => {
                            const addResult = await addAsset({
                                index: asset.index,
                                COMPANY: asset.COMPANY,
                                MODEL: asset.MODEL,
                                MORE: asset.MORE,
                                CATEGORY: asset.CATEGORY,
                                RGB: rgb.RGB,
                                COLOR: rgb.color,
                                CONDITIONS: '이상 없음' //상태 로직 구현해야함
                            });
                            //console.log(`${asset.COMPANY} ${asset.MODEL} ${asset.MORE}`)
                            const filteredList = filterPriceList(priceList, `${asset.COMPANY} ${asset.MODEL} ${asset.MORE}`, '이상 없음')
                            await fetchQR({
                                userID: user.userID,
                                assetID: addResult.id,
                                price: filteredList[filteredList.length - 1].value,
                            })
                            await updateAssetImage(`${keys.flaskURL}/image_m`, user.userID, 1, addResult.id)
                            await imageList.push({ url: `${keys.flaskURL}/image_m`, name: `${addResult.id}_1.jpeg`, assetID: `${addResult.id}`, imageNumber: `1` })
                            await AsyncStorage.setItem("@imageData", JSON.stringify(imageList));
                            await assetList.push({ AssetsID: addResult.id, COMPANY: asset.COMPANY, MODEL: asset.MODEL, MORE: asset.MORE, COLOR: rgb.color, GPTCONTENT: null, UserID: user.userID, CategoryID: asset.CATEGORY, PRICE: filteredList[filteredList.length - 1].value, DATE: new Date() })
                            await AsyncStorage.setItem("@assetData", JSON.stringify(assetList));
                            setLoad(false)
                            props.navigation.navigate('MyPageMain')
                        }
                        fetchPrice()
                    }}
                >
                    <Text style={styles.registrationText}>바로 등록하기</Text>
                    <Text style={styles.subregistrationText}>자산을 바로 등록할게요</Text>
                    <Image
                        source={require('../assets/icons/Money.png')}
                        style={styles.InsideMoney}
                    />
                </TouchableOpacity>
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

    checkView: {
        width: '100%',
        height: '38%',
        backgroundColor: '#AABAF4',
        borderRadius: 20,
        marginTop: 20,
    },
    registrationView: {
        width: '100%',
        height: '38%',
        backgroundColor: '#F2B500',
        borderRadius: 20,
        marginTop: 20,
    },
    checkText: {
        fontSize: 20,
        fontFamily: 'Pretendard-Bold',
        marginBottom: 20,
        left: 20,
        top: 20,
        color: '#ffffff',
    },
    subcheckText: {
        fontSize: 16,
        fontFamily: 'Pretendard-Medium',
        marginBottom: 20,
        left: 20,
        top: 8,
        color: '#ffffff',
    },
    registrationText: {
        fontSize: 20,
        fontFamily: 'Pretendard-Bold',
        marginBottom: 20,
        left: 20,
        top: 20,
        color: '#ffffff',
    },
    subregistrationText: {
        fontSize: 16,
        fontFamily: 'Pretendard-Medium',
        marginBottom: 20,
        left: 20,
        top: 8,
        color: '#ffffff',
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
    Inside: {
        width: 180,
        height: 180,
        right: 0,
        bottom: 0,
        position:'absolute',
        bottom: 10,
        right: 0,
    },
    InsideMoney: {
        width: 140,
        height: 100,
        right: 0,
        bottom: 0,
        position:'absolute',
        bottom: 30,
        right: 20,
    }
});

export default AssetsAddCondition
