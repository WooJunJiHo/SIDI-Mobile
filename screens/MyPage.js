import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions, Animated, ActivityIndicator, useFonts, Button } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from '../components/styles/Icons'; // Icon 컴포넌트 import 추가
import AnimatedNumbers from 'react-native-animated-numbers';

//db로드
import { fetchUserAssets } from '../components/Fetch/FetchData'

//페치 데이터
import { totalPrices } from '../components/utils/filterPriceList';

const MyPage = (props) => {

    const isFocused = useIsFocused();

    const [category, setCategory] = useState(0);
    const [list, setList] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const [image, setImage] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(true);
    const [slideAnimation] = useState(new Animated.Value(0)); // 막대기 위치를 조절할 애니메이션 값

    const [animateToNumber, setAnimateToNumber] = useState(1000000 - 64732);
    const [initialAnimationCompleted, setInitialAnimationCompleted] = useState(true); // 초기 애니메이션 완료 상태로 설정

    const [button1Scale, setButton1Scale] = useState(1);
    const [button2Scale, setButton2Scale] = useState(1);
    const [button1Color, setButton1Color] = useState('#CAC5FF');
    const [button2Color, setButton2Color] = useState('#967DFB');

    const increase = () => {
        setAnimateToNumber(animateToNumber + 64732);
    };

    const handleButton1Press = () => {
        // 버튼1이 눌렸을 때 스케일 줄이기
        setButton1Scale(0.95);
        // 버튼1이 눌렸을 때 색상 변경
        setButton1Color('#B5AEFF');
        // 버튼2 스케일과 색상 초기화
        setButton2Scale(1);
        setButton2Color('#967DFB');
    };

    const handleButton2Press = () => {
        // 버튼2가 눌렸을 때 스케일 줄이기
        setButton2Scale(0.95);
        // 버튼2가 눌렸을 때 색상 변경
        setButton2Color('#866FE4');
        // 버튼1 스케일과 색상 초기화
        setButton1Scale(1);
        setButton1Color('#CAC5FF');
    };

    const handleButton1Release = () => {
        // 버튼1을 뗄 때 원래 스케일로 돌리기
        setButton1Scale(1);
        // 버튼1의 색상 원래대로 돌리기
        setButton1Color('#CAC5FF');
    };

    const handleButton2Release = () => {
        // 버튼2를 뗄 때 원래 스케일로 돌리기
        setButton2Scale(1);
        // 버튼2의 색상 원래대로 돌리기
        setButton2Color('#967DFB');
    };


    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const user = await AsyncStorage.getItem("@user");
            if (user !== null) {
                const imageData = await AsyncStorage.getItem("@imageData");
                setImage(JSON.parse(imageData))
                const assetData = await AsyncStorage.getItem("@assetData");
                setList(JSON.parse(assetData))
                const priceData = await fetchUserAssets(JSON.parse(user))
                const totalValue = totalPrices(priceData)
                if (totalValue != null) {
                    setTotalPrice(totalValue)
                }
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





    const AssetList = () => {
        return (
            <>
                {category == 0 ?
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
                                    props.navigation.navigate('MyAssetsInfo', { assetID: item.AssetsID })
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
                                    props.navigation.navigate('MyAssetsInfo', { assetID: item.AssetsID })
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
            </>
        )
    }








    if (loading == true) {
        return (
            <ActivityIndicator size={'large'} />
        )
    }
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>내 자산</Text>

                {/* person-outline 부분은 setting으로 병합해서 사용자 이름 부분 섹션 클릭하면 로그인 될 수 있도록 구현하게 변경할 것
                <TouchableOpacity style={styles.userBtn} onPress={() => { props.navigation.navigate('Login') }}>
                    <Icon name='person-outline' size={24} />
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.settingBtn} onPress={() => { props.navigation.navigate('Setting') }}>
                    <Icon name='settings-sharp' size={24} color={'#767676'} />
                </TouchableOpacity>
            </View>

            <View style={styles.priceSection}>
                <Text style={styles.priceSubText}>총 자산</Text>
                {/* <Text style={styles.priceMainText}>{totalPrice} 원</Text> */}
                <View style={{ flexDirection: 'row', top: 8 }}>
                    {initialAnimationCompleted && (
                        <AnimatedNumbers
                            includeComma
                            animateToNumber={totalPrice}
                            fontStyle={styles.priceMainText}
                        />
                    )}
                    <Text style={{ left: 4, fontSize: 18, fontFamily: 'Pretendard-SemiBold', alignSelf: 'center' }}>원</Text>
                </View>

                {/* increase 버튼이 없으면 돌아가지 않아서 화면에 나오지 않게만 처리 */}
                <View style={{ width: 1, height: 20 }}>
                    <Button title="increase" onPress={increase} />
                </View>

                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={[styles.btn, { transform: [{ scale: button1Scale }], backgroundColor: button1Color }]}
                        onPressIn={handleButton1Press}
                        onPressOut={handleButton1Release}
                        activeOpacity={1}
                    >
                        <Text style={styles.btnText}>뭐 넣지</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn1, { transform: [{ scale: button2Scale }], backgroundColor: button2Color }]}
                        onPress={() => { props.navigation.navigate('Scan') }}
                        onPressIn={handleButton2Press}
                        onPressOut={handleButton2Release}
                        activeOpacity={1}
                    >
                        <Text style={styles.btnText1}>자산 추가</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ width: '100%', height: 12, backgroundColor: '#f5f5f5', marginBottom: 10, marginTop: 10, }}></View>

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
                    {list != [] ? <AssetList /> : <></>}
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
        fontSize: 20,
        fontFamily: 'Pretendard-SemiBold',
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
        width: '88%',
        height: 140,
        marginTop: 20,
        marginBottom: 10,
    },
    priceSubText: {
        color: '#111111',
        fontFamily: 'Pretendard-light',
        fontSize: 18,
    },
    priceMainText: {
        fontSize: 30,
        fontFamily: 'Pretendard-SemiBold',
        alignItems: 'center',
        color: '#111111',
    },
    btnView: {
        flexDirection: 'row',
        alignSelf: 'center',
        top: 12,
    },
    btn: {
        width: '48%',
        height: 50,
        backgroundColor: '#CAC5FF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    btn1: {
        width: '48%',
        height: 50,
        backgroundColor: '#967DFB',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#5B40C4',
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
    },
    btnText1: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
    },
    menuSection: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
    },
    menuTextWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 14,
    },
    menuText: {
        fontSize: 18,
        fontFamily: 'Pretendard-Regular',
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
