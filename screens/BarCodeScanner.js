import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Linking, ActivityIndicator, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from 'expo-camera';
import ScannerOverlay from './ScannerOverlay';

//서버 주소
import { keys } from '../env'
//db로드
import { fetchQR, fetchAssetsImages, fetchUserAssets, updateAssetImage } from '../components/Fetch/FetchData'

//크롤링 데이터 전처리
import { filterPriceList } from '../components/utils/filterPriceList'

const Scanner = (props) => {
    const isFocused = useIsFocused();

    const [user, setUser] = useState(null)
    const [priceList, setPriceList] = useState(null)
    const [imageList, setImageList] = useState(null)
    const [load, setLoad] = useState(false)

    //카메라
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);

    //카메라 권한 확인
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    //사용자 정보 로드
    useEffect(() => {
        const fetchLogin = async () => {
            const users = await AsyncStorage.getItem("@user");
            const imageData = await AsyncStorage.getItem("@imageData");
            const priceData = await AsyncStorage.getItem("@priceData");
            setUser(JSON.parse(users))
            setPriceList(JSON.parse(priceData))
            setImageList(JSON.parse(imageData))
        }
        fetchLogin()
    }, [isFocused])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // Check if scanned data is a valid URL
        if (isURL(data)) {
            handleLink(data);
        } else {
            Alert.alert(
                '등록된 데이터입니다!',
                `자산을 등록하시겠습니까?`,
                [
                    { text: '취소', onPress: () => setScanned(false) },
                    {
                        text: '등록', onPress: () => {
                            const updateQR = async () => {
                                setLoad(true)
                                const filteredList = filterPriceList(priceList, `${JSON.parse(data).asset.COMPANY} ${JSON.parse(data).asset.MODEL} ${JSON.parse(data).asset.MORE}`, JSON.parse(data).condition)
                                await fetchQR({
                                    userID: user.userID,
                                    assetID: JSON.parse(data).id,
                                    price: filteredList[filteredList.length - 1].value
                                })
                                for (i = 1; i <= 4; i++) {
                                    await updateAssetImage(`${keys.flaskURL}/image_${i}`, user.userID, i, JSON.parse(data).id)
                                    await imageList.push({url: `${keys.flaskURL}/image_${i}`, name: `${JSON.parse(data).id}_${i}.jpeg`, assetID: `${JSON.parse(data).id}`, imageNumber: `${i}`})
                                }

                                await AsyncStorage.setItem("@imageData", JSON.stringify(imageList));
                                const assetData = await fetchUserAssets(user)
                                await AsyncStorage.setItem("@assetData", JSON.stringify(assetData));
                                setLoad(false)
                                props.navigation.navigate('MyPage')
                            }
                            updateQR()
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    };

    const isURL = (str) => {
        // Basic URL validation
        return str.startsWith('http://') || str.startsWith('https://');
    };

    const handleLink = (link) => {
        Linking.openURL(link);
        setScanned(false);
    };

    if (hasPermission === null) {
        return <Text>Requesting camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }



    if (load == true) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image 
                    source={require('../assets/icons/SIDI Logo.gif')}
                    style={{height: '100%', width: '100%'}}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                ref={(ref) => setCameraRef(ref)}
            >
                <View style={styles.overlay}>
                    <Image
                        source={require('../assets/icons/SIDI icon.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.overlayMainText}>제품 가격 • 상태 • 그래프</Text>
                    <Text style={styles.overlayText}>QR 코드 찍고 간편하게 등록하세요!</Text>
                </View>

                <ScannerOverlay />

            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        bottom: 210,
    },
    overlayMainText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Pretendard-Regular',
        marginBottom: 12,
    },
    overlayText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Pretendard-SemiBold',
    },
    icon: {
        width: 200,
        height: 200,
    },
});

export default Scanner;
