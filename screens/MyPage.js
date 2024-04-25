import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions, Animated, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from '../components/styles/Icons'; // Icon 컴포넌트 import 추가

const MyPage = (props) => {

    const isFocused = useIsFocused();

    const [category, setCategory] = useState(0);
    const [list, setList] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [slideAnimation] = useState(new Animated.Value(0)); // 막대기 위치를 조절할 애니메이션 값

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const user = await AsyncStorage.getItem("@user");
            if (user !== null) {
                const imageData = await AsyncStorage.getItem("@imageData");
                setImage(JSON.parse(imageData))
                const assetData = await AsyncStorage.getItem("@assetData");
                setList(JSON.parse(assetData))
                setLoading(false);
            } else {
                // props.navigation.navigate('Login')
            }
        };

        fetchUser();
    }, [isFocused]);

    useEffect(() => {
        if (category === 1) {
            const filteredList = list.filter(item => item.CategoryID === 1);
            setSelectList(filteredList);
        } else if (category === 2) {
            const filteredList = list.filter(item => item.CategoryID === 2);
            setSelectList(filteredList);
        } else if (category === 3) {
            const filteredList = list.filter(item => item.CategoryID === 3);
            setSelectList(filteredList);
        }
    }, [list, category]);

    useEffect(() => {
        // 막대 애니메이션
        Animated.spring(slideAnimation, {
            toValue: category,
            useNativeDriver: true
        }).start();
    }, [category]);

    const slidePosition = slideAnimation.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: [0, Dimensions.get('window').width / 4, 2 * Dimensions.get('window').width / 4, 3 * Dimensions.get('window').width / 4]
    });





    if (loading == true) {
        return (
            <ActivityIndicator size={'large'} />
        )
    }
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>내 자산</Text>

                {/* person-outline 부분은 setting으로 병합해서 사용자 이름 부분 섹션 클릭하면 로그인 될 수 있도록 구현하게 변경할 것 */}
                <TouchableOpacity style={styles.userBtn} onPress={() => { props.navigation.navigate('Login') }}>
                    <Icon name='person-outline' size={24} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingBtn} onPress={() => { props.navigation.navigate('Setting') }}>
                    <Icon name='settings-sharp' size={24} color={'#767676'} />
                </TouchableOpacity>
            </View>

            <View style={styles.priceSection}>
                <Text style={styles.priceSubText}>총 자산</Text>
                <Text style={styles.priceMainText}>1,301,590,000원</Text>
            </View>

            <View style={styles.menuSection}>
                <Animated.View style={[styles.menuIndicator, { transform: [{ translateX: slidePosition }] }]} />
                <TouchableOpacity style={[styles.menuTextWrapper, category === 0 && styles.menuTextSelected]} onPress={() => setCategory(0)} activeOpacity={1}>
                    <Text style={[styles.menuText, category !== 0 && styles.menuTextUnselected]}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuTextWrapper, category === 1 && styles.menuTextSelected]} onPress={() => setCategory(1)} activeOpacity={1}>
                    <Text style={[styles.menuText, category !== 1 && styles.menuTextUnselected]}>핸드폰</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuTextWrapper, category === 2 && styles.menuTextSelected]} onPress={() => setCategory(2)} activeOpacity={1}>
                    <Text style={[styles.menuText, category !== 2 && styles.menuTextUnselected]}>태블릿</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuTextWrapper, category === 3 && styles.menuTextSelected]} onPress={() => setCategory(3)} activeOpacity={1}>
                    <Text style={[styles.menuText, category !== 3 && styles.menuTextUnselected]}>노트북</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.listSection}>
                    {   category==0 ?
                        list.map((item, idx) => {
                            // 현재 list 항목과 일치하는 첫 번째 이미지 찾기
                            const matchedImage = image.find(imageItem => imageItem.assetID == item.AssetsID && imageItem.imageNumber == 1);

                            // 이미지가 없는 경우
                            if (!matchedImage) {
                                return null;
                            }
                            // 이미지가 있는 경우, 이미지의 URL을 가져오기
                            const imageURL = matchedImage.url;

                            return (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.listView}
                                    onPress={() => {
                                        props.navigation.navigate('MyAssetsInfo', {assetID: item.AssetsID})
                                    }}
                                >
                                    <Image
                                        source={{ uri: imageURL }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </TouchableOpacity>
                            )
                        }) : 
                        selectList.map((item, idx) => {
                            // 현재 list 항목과 일치하는 첫 번째 이미지 찾기
                            const matchedImage = image.find(imageItem => imageItem.assetID == item.AssetsID && imageItem.imageNumber == 1);

                            // 이미지가 없는 경우
                            if (!matchedImage) {
                                return null;
                            }
                            // 이미지가 있는 경우, 이미지의 URL을 가져오기
                            const imageURL = matchedImage.url;

                            return (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.listView}
                                    onPress={() => {
                                        props.navigation.navigate('MyAssetsInfo', {assetID: item.AssetsID})
                                    }}
                                >
                                    <Image
                                        source={{ uri: imageURL }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    titleSection: {
        width: '91%',
    },
    mainTitle: {
        marginTop: 30,
        fontFamily: 'PretendardVariable',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userBtn: {
        position: 'absolute',
        right: 40,
        top: 30,
    },
    settingBtn: {
        position: 'absolute',
        right: 0,
        top: 30,
    },
    priceSection: {
        width: '91%',
        height: 120,
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#6C60F1',
    },
    priceSubText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'medium',
        left: 20,
        bottom: 10,
    },
    priceMainText: {
        fontSize: 26,
        fontWeight: 'medium',
        alignItems: 'center',
        color: '#ffffff',
        left: 20,
    },
    menuSection: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 30,
    },
    menuTextWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 14,
    },
    menuText: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#111111',
        textAlign: 'center',
    },
    menuTextSelected: {
        color: '#767676',
    },
    menuTextUnselected: {
        color: '#767676',
    },
    menuIndicator: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width / 4,
        height: 2,
        backgroundColor: '#111111',
    },
    listSection: {
        flex: 1,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 0,
    },
    listView: {
        width: '33.3%',
        height: Dimensions.get('window').width / 3,
        borderWidth: 1,
        borderColor: '#ececec',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default MyPage;
