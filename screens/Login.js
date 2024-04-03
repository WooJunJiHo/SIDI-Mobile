import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Button,
    StyleSheet,
} from 'react-native'
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


//소셜 로그인
import { GoogleLogin } from '../components/utils/googleLogin';

//다크 모드
import DarkMode from '../components/styles/DarkMode'

//아이콘
import Icon from '../components/styles/Icons';




const Login = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(true);

    


    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightPriceView : DarkMode.darkPriceView,
                {
                    flex: 1,
                    alignItems: 'center',
                }
            ]}
        >
            {/* 타이틀 세션 */}
            <View
                style={styles.titleSection}
            >
                <Text
                    style={[
                        ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        styles.titleText
                    ]}
                >
                    로그인
                </Text>
                <TouchableOpacity
                    style={styles.titleIcon}
                    onPress={() => {
                        props.navigation.navigate('MyPageMain')
                    }}
                >
                    <Icon
                        name='arrow-back-outline'
                        size={24}
                        color={ui != false ? 'black' : 'white'}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {/* 로그인 버튼 세션 */}
                <GoogleLogin 
                    AsyncStorage={AsyncStorage}
                    navi={props}
                />    
            </View>
        </SafeAreaView>
    )
}


export default Login



const styles = StyleSheet.create({
    //타이틀 세션
    titleSection: {
        width: '91%',
    },
    titleIcon: {
        position: 'absolute',
        left: 0,
        top: 30,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },



    //로그인 버튼 세션
    loginBtn: {
        width: '91%',
        height: 53,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 53,
        marginLeft: 9,
    },
})