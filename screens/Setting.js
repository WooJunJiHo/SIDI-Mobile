import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useState } from 'react';


//다크 모드
import DarkMode from '../components/styles/DarkMode'

//아이콘
import Icon from '../components/styles/Icons';





const Setting = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);



    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightView : DarkMode.darkView,
                {
                    flex: 1,
                    alignItems: 'center',
                }
            ]}
        >
            {/* 타이틀 & 내 정보 세션 */}
            <View
                style={[
                    ui != false ? DarkMode.lightSubView : DarkMode.darkSubView,
                    styles.titleInfoSection,
                ]}
            >
                {/* 타이틀 세션 */}
                <View style={styles.titleSection}>
                    <Text
                        style={[
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                            styles.mainTitle
                        ]}
                    >
                        내 자산
                    </Text>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => { props.navigation.goBack() }}
                    >
                        <Icon
                            name='arrow-back-outline'
                            size={24}
                            color={ui != false ? 'black' : 'white'}
                        />
                    </TouchableOpacity>
                </View>

                {/* 내 정보 세션 */}
                <View style={styles.infoSection}>
                    <View style={styles.infoImage}></View>
                    <Text
                        style={[
                            styles.infoName,
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        ]}
                    >
                        백지환
                    </Text>
                </View>
            </View>

            {/* 버튼 세션 */}
            <View
                style={[
                    ui != false ? DarkMode.lightSubView : DarkMode.darkSubView,
                    styles.infoHeartSection,
                ]}
            >
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        ]}
                    >
                        개인정보
                    </Text>
                    <View style={styles.btnIcon}>
                        <Icon
                            name='arrow-forward-outline'
                            size={24}
                            color='#767676'
                        />    
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        ]}
                    >
                        관심
                    </Text>
                    <View style={styles.btnIcon}>
                        <Icon
                            name='arrow-forward-outline'
                            size={24}
                            color='#767676'
                        />    
                    </View>
                </TouchableOpacity>
            </View>

            {/* 버튼 세션 */}
            <View
                style={[
                    ui != false ? DarkMode.lightSubView : DarkMode.darkSubView,
                    styles.infoHeartSection,
                ]}
            >
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        ]}
                    >
                        도움말
                    </Text>
                    <View style={styles.btnIcon}>
                        <Icon
                            name='arrow-forward-outline'
                            size={24}
                            color='#767676'
                        />    
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        ]}
                    >
                        설정
                    </Text>
                    <View style={styles.btnIcon}>
                        <Icon
                            name='arrow-forward-outline'
                            size={24}
                            color='#767676'
                        />    
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text
                        style={[
                            styles.btnText,
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        ]}
                    >
                        로그아웃
                    </Text>
                    <View style={styles.btnIcon}>
                        <Icon
                            name='arrow-forward-outline'
                            size={24}
                            color='#767676'
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
        alignItems: 'center'
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