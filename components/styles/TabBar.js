import React, { useEffect, useState } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabBar = ({ state, descriptors, navigation }) => {
    const [selectedIcon, setSelectedIcon] = useState(null); // 선택된 아이콘 상태 추가
    const [animations] = useState({}); // 선택된 아이콘 애니메이션 상태 추가

    const startAnimation = (anim) => {
        Animated.sequence([
            Animated.timing(anim, {
                toValue: 1,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(anim, {
                toValue: -1,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(anim, {
                toValue: 0,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleTabPressIn = (routeName) => {
        setSelectedIcon(routeName); // 아이콘을 눌렀을 때 선택된 아이콘 변경
        const anim = animations[routeName];
        startAnimation(anim); // 애니메이션 시작
    };

    const handleTabPressOut = (routeName) => {
        setSelectedIcon(null); // 아이콘에서 손을 뗐을 때 선택된 아이콘 해제
    };

    const handleTabPress = (routeName) => {
        if (selectedIcon === routeName) {
            setSelectedIcon(null); // 이미 선택된 아이콘을 다시 누를 경우 선택 해제
        }

        if (routeName === 'MyPage') {
            const fetchLogin = async() => {
                const user = await AsyncStorage.getItem("@user");
                if (user == null) {
                    navigation.navigate('MyPage', {screen: 'Login'});
                } else {
                    navigation.navigate('MyPage');
                }
            }
            fetchLogin()
        } else {
            const fetchLogin = async() => {
                const user = await AsyncStorage.getItem("@user");
                if (user == null) {
                    navigation.navigate('MyPage', {screen: 'Login'});
                } else {
                    navigation.navigate(routeName);
                }
            }
            fetchLogin() 
        }
    };

    return (
        <View style={{ height: 80 }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 1,
                    borderColor: '#DBDBDB',
                    borderBottomWidth: 0,
                }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    let iconName;

                    // 아이콘 이름 직접 설정
                    if (route.name === 'Home') {
                        iconName = isFocused ? require('../../assets/icons/blue-home_icon.png') : require('../../assets/icons/home-grayline.png');
                    } else if (route.name === 'Scan') {
                        iconName = isFocused ? require('../../assets/icons/blue-QRScan.png') : require('../../assets/icons/QRScan-grayline.png');
                    } else if (route.name === 'Alarm') {
                        iconName = isFocused ? require('../../assets/icons/blue-bell_icon.png') : require('../../assets/icons/bell-grayline.png');
                    } else if (route.name === 'MyPage') {
                        iconName = isFocused ? require('../../assets/icons/blue-man_icon.png') : require('../../assets/icons/man-grayline.png');
                    }

                    // 선택된 아이콘의 애니메이션 객체 생성 또는 가져오기
                    let anim = animations[route.name];
                    if (!anim) {
                        anim = new Animated.Value(0);
                        animations[route.name] = anim;
                    }

                    return (
                        <View
                            key={index}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                onTouchStart={() => handleTabPressIn(route.name)}
                                onTouchEnd={() => handleTabPressOut(route.name)}
                                onTouchCancel={() => handleTabPressOut(route.name)}
                            >
                                <View
                                    onTouchStart={() => handleTabPress(route.name)}
                                    style={{ bottom: 10 }}
                                >
                                    <Animated.View
                                        style={{
                                            backgroundColor: selectedIcon === route.name ? '#F5F5F5' : 'transparent', // 선택된 아이콘의 배경색 조정
                                            padding: selectedIcon === route.name ? 10 : 0, // 배경색이 변하는 부분의 크기 조절
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Animated.Image
                                            source={iconName}
                                            style={{
                                                transform: [
                                                    {
                                                        rotate: anim.interpolate({
                                                            inputRange: [-1, 1],
                                                            outputRange: ['-0.1rad', '0.1rad'],
                                                        }),
                                                    },
                                                ],
                                            }}
                                        />
                                    </Animated.View>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default TabBar;
