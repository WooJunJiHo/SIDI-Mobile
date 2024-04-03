import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { useState, useEffect } from 'react';
import {
    View, Image
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

//DB 로드
import { fetchUserAssets, fetchAssetsImages } from './components/Fetch/FetchData'


// 화면 컴포넌트들 (예시로 2개 추가)
import Main from './screens/Main';
import AssetsInfo from './screens/Assets-info'
import Alarm from './screens/Alarm';
import MyPage from './screens/MyPage';
import Login from './screens/Login';
import Setting from './screens/Setting';
import Scanner from './screens/BarCodeScanner';



//탭바 스타일
import TabBar from './components/styles/TabBar';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const MainStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
);


const ScanStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ScanMain" component={Scanner} />
    </Stack.Navigator>
);


const AlarmStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AlarmMain" component={Alarm} />
    </Stack.Navigator>
);


const MyPageStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='MyPageMain' component={MyPage} />
        <Stack.Screen name="MyAssetsInfo" component={AssetsInfo} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Setting' component={Setting} />
    </Stack.Navigator>
)







export default function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true)
            const user = await AsyncStorage.getItem("@user");

            if (user !== null) {
                const imageData = await fetchAssetsImages(JSON.parse(user).userID)
                await AsyncStorage.setItem("@imageData", JSON.stringify(imageData));
                const assetData = await fetchUserAssets(JSON.parse(user))
                await AsyncStorage.setItem("@assetData", JSON.stringify(assetData));
            }
            setLoading(false)
        }
        fetchUserData();
    }, [])

    if (loading == true) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: '30%', height: '30%' }} source={require('./assets/icons/loading.gif')} />
            </View>
        )
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarLabel: () => null,
                }}
                tabBar={(props) => <TabBar {...props} />}
            >
                <Tab.Screen name='Home' component={MainStack} />
                <Tab.Screen name='Scan' component={ScanStack} />
                <Tab.Screen name='Alarm' component={AlarmStack} />
                <Tab.Screen name='MyPage' component={MyPageStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}