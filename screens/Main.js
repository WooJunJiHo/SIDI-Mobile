import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native'
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Linechart from '../components/Linechart/LineChart'
import Swiper from 'react-native-swiper';


const Home = (props) => {
    const isFocused = useIsFocused();
    const [nickname, setNickname] = useState('로그인 해주세요!')

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem("@user");

            if (user !== null) {
                setNickname(JSON.parse(user).nickname)
            }
        };

        fetchUser();
    }, [isFocused]);

    return (
        <SafeAreaView
            style={[
                {
                    flex: 1,
                }
            ]}
        >
            <View style={{ alignItems: 'center' }}>

                {/* 사용자 세션 */}
                <View style={styles.userSection}>
                    <Text style={[
                        styles.userText,
                    ]}>
                        {nickname}
                    </Text>
                </View>

                <View
                    style={[
                        styles.section, { height: 200 }
                    ]}
                >
                    <Swiper
                        style={styles.wrapper}
                        loop={true}
                        showsPagination={true}
                        horizontal={true}
                        paginationStyle={{ top: -120, right: -280 }}
                        autoplay={true} 
                        autoplayTimeout={3} 
                    >
                        {/* 첫 번째 슬라이드 */}
                        <View style={styles.slide}>
                            <View
                                style={[
                                    styles.section, { height: 200 }
                                ]}
                            >
                                <View style={styles.explanation}>
                                    <Text style={styles.explanationSubText}>
                                        실물 자산을 편하게 관리하는 방법!
                                    </Text>
                                    <Text style={styles.explanationMainText}>SIDI 사용 방법을 알려드립니다</Text>
                                </View>
                                <Image
                                    source={require('../assets/icons/illustration.png')}
                                    style={styles.illustration}
                                />

                                <TouchableOpacity
                                    style={styles.howButton}
                                    onPress={() => {

                                    }}
                                >
                                    <Text style={styles.howText}>방법 보러가기</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={styles.slide}>
                            <View
                                style={[
                                    styles.section, { height: 200 }
                                ]}
                            >
                                <View style={styles.explanation}>
                                    <Text style={styles.explanationSubText}>
                                        김린하
                                    </Text>
                                    <Text style={styles.explanationMainText}>주서진</Text>
                                </View>
                                <Image
                                    source={require('../assets/icons/illustration.png')}
                                    style={styles.illustration}
                                />

                                <TouchableOpacity
                                    style={styles.howButton}
                                    onPress={() => {

                                    }}
                                >
                                    <Text style={styles.howText}>방법 보러가기</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </Swiper>


                </View>



                {/* 총 자산 세션 */}
                <TouchableOpacity
                    style={[
                        styles.section,
                        {
                            height: 95,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }
                    ]}
                >
                    <View style={styles.assetsContainer}>
                        <Image
                            source={require('../assets/icons/Hand-Icon.png')}
                            style={styles.totalAssetsImage}
                        />
                    </View>

                    <Text style={styles.totalSubText1}>
                        총 자산{'\n'}
                        <Text
                            style={[
                                styles.totalMainText
                            ]}
                        >
                            1,301,590,000원
                        </Text>
                    </Text>

                    <Image
                        style={styles.totalShortcutIcon}
                        source={require('../assets/icons/ShortCut-white.png')}
                    />


                </TouchableOpacity>


                {/* 자산 그래프 세션 */}
                <View
                    style={[
                        styles.section, { height: 300 }
                    ]}
                >
                    <Image
                        source={require('../assets/icons/GraphImage.png')}
                        style={styles.totalGraphImage}
                    />
                    <Text style={styles.totalText}>총 자산 그래프</Text>

                    {/* 자산 그래프 
                    <Linechart />*/}

                </View>

            </View>

        </SafeAreaView>
    )
}


export default Home


const styles = StyleSheet.create({
    section: {
        width: '91%',
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
    },

    //사용자 세션
    userSection: {
        flexDirection: 'row',
        width: '91%',
        height: 70,
        alignItems: 'center',
    },

    userText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userSubText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#DBDBDB',
        marginRight: 8,
        // backgroundColor: 'red',
    },

    howButton: {
        position: 'absolute',
        justifyContent: 'center',
        width: 90,
        height: 36,
        borderRadius: 20,
        backgroundColor: '#6C60F1',
        right: -10,
        bottom: 20,
    },

    howText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 40,
    },

    shortCut: { //바로가기 버튼
        flexDirection: 'row',
        alignItems: 'center',
    },
    shortcutIcon: { // 바로가기 아이콘
        // backgroundColor: 'blue',
    },


    //사용법 세션
    explanation: {

    },
    explanationSubText: {
        position: 'absolute',
        color: '#767676',
        fontWeight: 'normal',
        fontSize: 14,
        left: 20,
        top: 20,
    },
    explanationMainText: {
        position: 'absolute',
        fontSize: 18,
        left: 20,
        color: '#111111',
        top: 40,
        fontWeight: 'medium',
    },
    illustration: {
        position: 'absolute',
        bottom: 0,
        right: 240,
        width: 60,
        height: 80,
    },


    //총 자산 세션
    totalImage: {
        borderRadius: 100,
        width: 50,
        height: 50,
        marginLeft: 20,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalAssetsImage: {
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
    },
    totalSubText1: {
        color: '#111111',
        fontSize: 18,
        fontWeight: 'medium',
        left: 34
    },
    totalMainText: {
        fontWeight: 'bold',
        lineHeight: 25,
    },

    assetsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#6C60F1',
        width: 50,
        height: 50,
        borderRadius: 100,
        left: 20,
    },

    totalShortcutIcon: {   // 총 자산 바로가기 아이콘 스타일
        marginTop: 1,
        position: 'absolute',
        right: 20,
    },

    totalText: {
        fontSize: 18,
        fontWeight: 'medium',
        left: 50,
        top: 0,
    },

    totalGraphImage: {
        top: 20,
        left: 20,
    }
})