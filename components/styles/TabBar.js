import {
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import { useState } from 'react';



const TabBar = ({ state, descriptors, navigation }) => {

    //클릭 이벤트
    const [onScreen, setOnScreen] = useState('Home')


    return (
        <View
            style={[
                {
                    height: 80,
                }
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF', // 원하는 색상으로 변경
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 1,
                    borderColor: '#DBDBDB',
                    borderBottomWidth: 0,
                }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            setOnScreen(route.name)
                            navigation.navigate(route.name);
                        }
                    };


                    // 아이콘 이름을 동적으로 가져오는 대신 직접 지정
                    let iconName;
                    if (route.name === 'Home') {
                        onScreen == route.name ?  
                        iconName = require('../../assets/icons/blue-home_icon.png') :
                        iconName = require('../../assets/icons/home-grayline.png')
                    } else if (route.name === 'Scan') {
                        onScreen == route.name ? 
                        iconName = require('../../assets/icons/blue-QRScan.png') :
                        iconName = require('../../assets/icons/QRScan-grayline.png')
                    } else if (route.name === 'Alarm') {
                        onScreen == route.name ? 
                        iconName = require('../../assets/icons/blue-bell_icon.png') :
                        iconName = require('../../assets/icons/bell-grayline.png')
                    } else if (route.name === 'MyPage') {
                        onScreen == route.name ? 
                        iconName = require('../../assets/icons/blue-man_icon.png') :
                        iconName = require('../../assets/icons/man-grayline.png')
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
                            {/* 탭에 따른 아이콘, 라벨 또는 커스텀 컴포넌트를 여기에 추가 */}
                            <TouchableOpacity
                                key={index}
                                onPress={onPress}
                                style={{bottom: 10,}}
                            >
                                <Image
                                    source={iconName}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};


export default TabBar