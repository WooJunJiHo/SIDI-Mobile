import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAlarm, fetchUserAssets } from '../components/Fetch/FetchData';

const Alarm = (props) => {

    const [load, setLoad] = useState(true);
    const [alarm, setAlarm] = useState(); // 알림 목록

    const [pressedIndex, setPressedIndex] = useState(null); // 눌린 알림의 인덱스

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoad(true);
            try {
                const userData = await AsyncStorage.getItem("@user");
                if (userData !== null) {
                    const user = JSON.parse(userData);
                    setUserInfo(user);
                    const alarmData = await getAlarm({ userID: user.userID });
                    setAlarm(alarmData);
                    const assetsData = await fetchUserAssets(user);
                    alarmData.forEach((item) => {
                        const asset = assetsData.find((asset) => asset.AssetsID === item.AssetsID);
                        item.MODEL = asset.MODEL + ' ' + asset.MORE;
                    })
                } else {
                    // 사용자 정보가 없을 때 처리할 부분
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            setLoad(false);
        };

        fetchUserInfo();
    }, []);


    if (load) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <Text style={styles.mainTitle}>알림</Text>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Text style={styles.mainTitle}>알림</Text>

            <ScrollView>
                <View style={styles.listSection}>
                    {alarm.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={[
                                styles.alarmView,
                                pressedIndex === idx && styles.pressedAlarmView
                            ]}
                            onTouchStart={() => setPressedIndex(idx)}
                            onTouchEnd={() => setPressedIndex(null)}
                            onPress={() => {
                                props.navigation.navigate('MyPage', { screen: 'MyAssetsInfo', params: { assetID: item.AssetsID } });
                            }}
                        >
                            <View>

                            </View>
                            <Image style={styles.alarmImage} source={{ uri: userInfo.profileImg }} />
                            <Text style={styles.alarmText}>
                                <Text style={styles.highlightText}>{userInfo.nickname}</Text> 님의 <Text style={styles.highlightText}>{item.MODEL}</Text>가 <Text style={styles.highlightText}>{item.INFO}</Text>했습니다.
                            </Text>
                            <Text style={styles.alarmDate}>{item.DATE.substr(5, 5)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Alarm;

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 20,
        fontFamily: 'Pretendard-SemiBold',
        textAlign: 'center',
        marginTop: 30,
    },
    listSection: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    alarmView: {
        width: '100%',
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        elevation: 2, // 그림자 효과
        transitionDuration: 150,
        transitionProperty: 'transform',
    },
    pressedAlarmView: {
        transform: [{ scale: 0.95 }], // 눌렸을 때 스케일 줄이기
        backgroundColor: '#F5F5F5', // 선택된 부분의 배경색
    },
    alarmImage: {
        width: 40,
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        marginRight: 12,
        left: 20,
    },
    alarmText: {
        width: '66%',
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        left: 20,
    },
    highlightText: {
        fontFamily: 'Pretendard-SemiBold',
        color: '#111111',
    },
    alarmDate: {
        color: '#767676',
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        position: 'absolute',
        right: 20,
    },
});
