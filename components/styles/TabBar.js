import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const TabBar = ({ state, descriptors, navigation }) => {
    const handleTabPress = (routeName) => {
        if (routeName === 'MyPage') {
            navigation.navigate('MyPage');
        } else {
            navigation.navigate(routeName);
        }
    };

    return (
        <View style={{ height: 80 }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
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

                    let iconName;
                    if (route.name === 'Home') {
                        iconName = isFocused ? require('../../assets/icons/blue-home_icon.png') : require('../../assets/icons/home-grayline.png');
                    } else if (route.name === 'Scan') {
                        iconName = isFocused ? require('../../assets/icons/blue-QRScan.png') : require('../../assets/icons/QRScan-grayline.png');
                    } else if (route.name === 'Alarm') {
                        iconName = isFocused ? require('../../assets/icons/blue-bell_icon.png') : require('../../assets/icons/bell-grayline.png');
                    } else if (route.name === 'MyPage') {
                        iconName = isFocused ? require('../../assets/icons/blue-man_icon.png') : require('../../assets/icons/man-grayline.png');
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
                            <TouchableOpacity onPress={() => handleTabPress(route.name)} style={{ bottom: 10 }}>
                                <Image source={iconName} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default TabBar;
