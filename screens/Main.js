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
import { useState } from 'react'

//다크 모드
import DarkMode from '../components/styles/DarkMode'



const Home = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);

    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightView : DarkMode.darkView,
                {
                    flex: 1,
                }
            ]}
        >
            <ScrollView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>

                    {/* 사용자 세션 */}
                    <View style={styles.userSection}>
                        <Text style={[
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                            styles.userText,
                        ]}>
                            백지환
                        </Text>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 0
                            }}
                            onPress={() => {
                                ui == true ? setUI(false) : setUI(true)
                            }}
                        >
                            <View style={styles.shortCut}>
                                <Text style={styles.userSubText}>
                                    내 자산 바로가기
                                </Text>
                                <Image
                                    style={styles.shortcutIcon}
                                    source={require('../assets/icons/ShortCut-white.png')}
                                />
                            </View>


                        </TouchableOpacity>
                    </View>

                    {/* 사용법 세션 */}
                    <View
                        style={[
                            ui != false ? DarkMode.lightSubView : DarkMode.darkSubView,
                            styles.section, { height: 90 }
                        ]}
                    >
                        <View style={styles.explanation}>
                            <Text style={styles.explanationSubText}>
                                실물 자산을 편하게 관리하는 방법!
                            </Text>
                            <Text style={styles.explanationMainText}>SODA 사용 방법을 알려드립니다</Text>
                        </View>
                        <Image
                            source={require('../assets/icons/illustration.png')}
                            style={styles.illustration}
                        />

                    </View>

                    {/* 총 자산 세션 */}
                    <TouchableOpacity
                        style={[
                            ui != false ? DarkMode.lightSubView : DarkMode.darkSubView,
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
                                    ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
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
                            ui != false ? DarkMode.lightSubView : DarkMode.darkSubView,
                            styles.section, { height: 280 }
                        ]}
                    >



                    </View>

                    {/* 자산 비율 세션 */}
                    <View
                        style={[
                            ui != false ? DarkMode.lightSubView : DarkMode.darkSubView,
                            styles.section, { height: 310 }
                        ]}
                    >
                        
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}


export default Home


const styles = StyleSheet.create({
    section: {
        width: '91%',
        borderRadius: 20,
        marginBottom: 20,
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

    shortCut: { //바로가기 버튼
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'pink'
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
        color: '#DBDBDB',
        top: 49
    },
    illustration: {
        position: 'absolute',
        bottom: 0,
        right: 40
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
        marginLeft: 30.
    },
    totalSubText1: {
        color: '#DBDBDB',
        fontSize: 18,
        fontWeight: 'normal',
    },
    totalMainText: {
        fontWeight: 'bold',
        lineHeight: 25,
    },

    assetsContainer: {
        flexDirection: 'row'
    },

    totalShortcutIcon: {   // 총 자산 바로가기 아이콘 스타일
        marginTop: 1,
        position: 'absolute',
        right: 20,
    },

})