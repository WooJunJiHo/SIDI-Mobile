import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Button,
    StyleSheet,
    Image,
} from 'react-native'
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


//소셜 로그인
import { GoogleLogin } from '../components/utils/googleLogin';
import Icon from 'react-native-vector-icons/Entypo'; // Entypo 아이콘 import




const Login = (props) => {

    return (
        <SafeAreaView
            style={[
                {
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                }
            ]}
        >
            {/* 타이틀 세션 */}
            <View
                style={styles.titleSection}
            >
                <Text
                    style={[
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
                        name='chevron-small-left'
                        size={30}
                        color={'#111111'}
                        top={-4}
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