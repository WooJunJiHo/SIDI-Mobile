import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native'
import { useState } from 'react';


//아이콘
import Icon from '../components/styles/Icons';





const Setting = (props) => {

    return (
        <SafeAreaView
            style={[
                {
                    flex: 1,
                    alignItems: 'center',
                }
            ]}
        >
            {/* 타이틀 & 내 정보 세션 */}
            <View
                style={[
                    styles.titleInfoSection,
                ]}
            >
                {/* 타이틀 세션 */}
                <View style={styles.titleSection}>
                    <Text
                        style={[
                            styles.mainTitle
                        ]}
                    >
                        내 정보
                    </Text>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => { props.navigation.goBack() }}
                    >
                        <Image
                            source={require('../assets/icons/ShortCut-black.png')}
                        />
                    </TouchableOpacity>
                </View>

                {/* 내 정보 세션 */}
                <View style={styles.infoSection}>
                    <View style={styles.infoImage}></View>
                    <Text
                        style={[
                            styles.infoName,
                        ]}
                    >
                        백지환
                    </Text>
                </View>
            </View>


            {/* 버튼 세션 */}
            <View
                style={[
                    styles.infoHeartSection,
                ]}
            >
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                        ]}
                    >
                        개인정보
                    </Text>
                    <View style={styles.btnIcon}>
                        <Image
                            source={require('../assets/icons/ShortCut-dark.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                        ]}
                    >
                        도움말
                    </Text>
                    <View style={styles.btnIcon}>
                        <Image
                            source={require('../assets/icons/ShortCut-dark.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                        ]}
                    >
                        설정
                    </Text>
                    <View style={styles.btnIcon}>
                        <Image
                            source={require('../assets/icons/ShortCut-dark.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                        ]}
                    >
                        로그아웃
                    </Text>
                    <View style={styles.btnIcon}>
                        <Image
                            source={require('../assets/icons/ShortCut-dark.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}



export default Setting




const styles = StyleSheet.create({
    //타이틀 & 내 정보 세션
    titleInfoSection: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor: '#ffffff',
    },


    //타이틀 세션
    titleSection: {
        width: '91%',
    },
    mainTitle: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },
    iconBtn: {
        position: 'absolute',
        left: 0,
        top: 30,
    },


    //내 정보 세션
    infoSection: {
        width: '91%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoImage: {
        width: 40,
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        marginRight: 16,
    },
    infoName: {
        fontSize: 20,
        fontWeight: 'bold',
    },





    //버튼 세션
    infoHeartSection: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    btn: {
        width: '91%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    btnIcon: {
        position: 'absolute',
        right: 0,
    },
})