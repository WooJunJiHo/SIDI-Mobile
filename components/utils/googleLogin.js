import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google";
WebBrowser.maybeCompleteAuthSession();

import {
    Button
} from 'react-native'
import { useState, useEffect } from 'react';

//서버 통신
import { fetchLogin } from '../Fetch/FetchData'







export const GoogleLogin = (props) => {
    const AsyncStorage = props.AsyncStorage
    // 안드로이드, 웹 클라이언트 아이디를 사용하여 인증 요청 보냄.
    // Google 인증 요청을 위한 훅 초기화
    // promptAsync: 인증 요청 보냄.
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "733666115774-8lla1bjmpgvqs5e41r1k33r4nbuktci4.apps.googleusercontent.com",
        androidClientId: "733666115774-ugq6ojt0s0o76fcv8btk9cvt69uf0089.apps.googleusercontent.com",
        iosClientId: "733666115774-37prtfvmin9u4cioh1dg38upvjuijblv.apps.googleusercontent.com",
    });

    // Google 인증 응답이 바뀔때마다 실행
    useEffect(() => {
        handleSignInWithGoogle();
    }, [response]);


    // Google 로그인 처리하는 함수
    const handleSignInWithGoogle = async () => {
        await AsyncStorage.removeItem("@user");
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if (response?.type === "success") {
                // 인증 요청에 대한 응답이 성공이면, 토큰을 이용하여 유저 정보를 가져옴.
                await getUserInfo(response.authentication?.accessToken);
            }
        } else {
            // 유저 정보가 이미 있으면, 유저 정보를 가져옴.
            console.log(JSON.parse(user))
            return JSON.parse(user)
        }
    };

    // 토큰을 이용하여 유저 정보를 가져오는 함수
    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const userInfoResponse = await response.json();
            // 유저 정보를 AsyncStorage에 저장, 상태업뎃
            const data = {
                nickname: userInfoResponse.name,
                email: userInfoResponse.email,
                profileImg: userInfoResponse.picture,
            }
            const userData = await fetchLogin(data)
            await AsyncStorage.setItem("@user", JSON.stringify(userData));
            
            props.navi.navigation.navigate('MyPageMain')
            //return userInfoResponse
        } catch (e) {
            console.log(e);
        }
    };

    const handleLogout = async (AsyncStorage) => {
        await AsyncStorage.removeItem("@user");
        return null
    };


    return (
        <Button
            disabled={!request}
            title="Google Login"
            onPress={() => {
                promptAsync();
            }}
        />
    )
}