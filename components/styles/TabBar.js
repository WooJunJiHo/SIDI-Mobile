import React, { useState } from 'react';
import { View, Image, Animated, Easing, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabBar = ({ state, descriptors, navigation }) => {
    const [selectedIcon, setSelectedIcon] = useState(null); // 선택된 아이콘 상태 추가
    const [animations] = useState({}); // 선택된 아이콘 애니메이션 상태 추가

    const startAnimation = (anim) => {
        Animated.sequence([
            Animated.timing(anim, {
                toValue: 1.1,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(anim, {
                toValue: 1,
                duration: 100,
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
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    let iconName;

                    // 아이콘 이름 직접 설정
                    if (route.name === 'Home') {
                        iconName = isFocused ? require('../../assets/icons/home-02.png') : require('../../assets/icons/home-01.png');
                    } else if (route.name === 'Scan') {
                        iconName = isFocused ? require('../../assets/icons/QRcode-02.png') : require('../../assets/icons/QRcode-01.png');
                    } else if (route.name === 'Alarm') {
                        iconName = isFocused ? require('../../assets/icons/bell-02.png') : require('../../assets/icons/bell-01.png');
                    } else if (route.name === 'MyPage') {
                        iconName = isFocused ? require('../../assets/icons/man-02.png') : require('../../assets/icons/man-01.png');
                    }

                    // 선택된 아이콘의 애니메이션 객체 생성 또는 가져오기
                    let anim = animations[route.name];
                    if (!anim) {
                        anim = new Animated.Value(1);
                        animations[route.name] = anim;
                    }

                    return (
                        <View
                            key={index}
                            style={styles.tabItem}
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
                                        style={[
                                            styles.iconContainer,
                                            {
                                                backgroundColor: selectedIcon === route.name ? '#F5F5F5' : 'transparent',
                                                padding: selectedIcon === route.name ? 10 : 0,
                                                transform: [{ scale: anim }], // 크기 변화
                                            }
                                        ]}
                                    >
                                        <Animated.Image
                                            source={iconName}
                                            style={{
                                                width: 24,
                                                height: 24.5,
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

const styles = StyleSheet.create({
    container: {
        height: 'auto',
    },
    tabBar: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F1F1F1',
        borderBottomWidth: 0,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        borderRadius: 10,
    },
});

export default TabBar;
