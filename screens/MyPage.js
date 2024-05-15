import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    ActivityIndicator,
} from 'react-native';
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

    const [initialAnimationCompleted, setInitialAnimationCompleted] = useState(true); // 초기 애니메이션 완료 상태로 설정

    const [button1Scale, setButton1Scale] = useState(1);
    const [button2Scale, setButton2Scale] = useState(1);
    const [button1Color, setButton1Color] = useState('#CAC5FF');
    const [button2Color, setButton2Color] = useState('#967DFB');

    const [deletionMode, setDeletionMode] = useState(false); // 삭제 모드를 추적하는 상태
    const [selectedImages, setSelectedImages] = useState([]); // 선택한 이미지를 추적하는 상태
    const [selectedImageOrder, setSelectedImageOrder] = useState({}); // 선택된 이미지의 순서를 추적하는 상태

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

        if (deletionMode) {

        } else {
            props.navigation.navigate('Scan');
        }
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

    const toggleDeletionMode = () => {
        if (!deletionMode) {
            // 삭제 모드로 전환되면 선택된 이미지 리스트 초기화
            setSelectedImages([]);
            setSelectedImageOrder({});
        }
        setDeletionMode(prevMode => !prevMode); // 삭제 모드를 토글

        // 버튼 텍스트를 동적으로 변경
        if (!deletionMode) {
            // 삭제 모드로 전환되면 "삭제 취소"로 변경
            setButtonText("삭제 취소");
            setButtonText1("삭제 하기");
        } else {
            // 삭제 모드에서 다시 일반 모드로 변경되면 "자산 삭제"로 변경
            setButtonText("자산 삭제");
            setButtonText1("자산 추가");
        }
    };

    const [buttonText, setButtonText] = useState("자산 삭제");
    const [buttonText1, setButtonText1] = useState("자산 추가");

    const handleImagePress = (assetID) => {
        if (deletionMode) {
            // 이미지를 선택 또는 선택 해제할 때마다 선택된 이미지의 순서 업데이트
            setSelectedImages(prevSelected => {
                const alreadySelected = prevSelected.includes(assetID);
                if (alreadySelected) {
                    // 이미 선택된 이미지를 선택 해제할 때 해당 이미지의 순서도 삭제
                    const { [assetID]: deleted, ...remainingOrders } = selectedImageOrder;
                    setSelectedImageOrder(remainingOrders);
                    return prevSelected.filter(id => id !== assetID);
                } else {
                    // 이미지를 선택할 때 이미지의 순서를 추가
                    setSelectedImageOrder(prevOrders => ({ ...prevOrders, [assetID]: prevSelected.length + 1 }));
                    return [...prevSelected, assetID];
                }
            });
        } else {
            // 삭제 모드가 아닌 경우, 이미지 클릭은 기존과 같이 처리됩니다.
            props.navigation.navigate('MyAssetsInfo', { assetID });
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const user = await AsyncStorage.getItem("@user");
            if (user !== null) {
                setLoading(true);
                const imageData = await AsyncStorage.getItem("@imageData");
                setImage(JSON.parse(imageData))
                setLoading(false);
                const assetData = await AsyncStorage.getItem("@assetData");
                setList(JSON.parse(assetData))
                const priceData = await fetchUserAssets(JSON.parse(user))
                if (priceData != 0) {
                    const totalValue = totalPrices(priceData)
                    if (totalValue != null) {
                        setTotalPrice(totalValue)
                    }
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
        } else {
            // 전체 카테고리인 경우 모든 리스트를 보여줍니다.
            setSelectList(list);
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
                <TouchableOpacity style={styles.settingBtn} onPress={() => { props.navigation.navigate('Setting') }}>
                    <Icon name='settings-sharp' size={24} color={'#767676'} />
                </TouchableOpacity>
            </View>

            <View style={styles.priceSection}>
                <Text style={styles.priceSubText}>총 자산</Text>
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

                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={[styles.btn, { transform: [{ scale: button1Scale }], backgroundColor: button1Color }]}
                        onPress={toggleDeletionMode}
                        onPressIn={handleButton1Press}
                        onPressOut={handleButton1Release}
                        activeOpacity={1}
                    >
                        <Text style={styles.btnText}>{buttonText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn1, { transform: [{ scale: button2Scale }], backgroundColor: button2Color }]}
                        onPressIn={handleButton2Press}
                        onPressOut={handleButton2Release}
                        activeOpacity={1}
                    >
                        <Text style={styles.btnText1}>{buttonText1}</Text>
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

                    {list.length > 0 && (
                        category === 0 ?
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
                                        style={[styles.listView, deletionMode && selectedImages.includes(item.AssetsID) && styles.selectedImage]} // 삭제 모드이고 선택된 이미지인 경우에만 스타일을 적용합니다.
                                        onPress={() => handleImagePress(item.AssetsID)}
                                    >
                                        <Image
                                            source={{ uri: imageURL }}
                                            style={{ width: '100%', height: '100%', opacity: deletionMode && selectedImages.includes(item.AssetsID) ? 0.5 : 1 }}
                                        />
                                        {deletionMode && selectedImageOrder[item.AssetsID] && (
                                            <View style={styles.selectedNumber}>
                                                <Icon name='checkmark' size={16} color={'#ffffff'} />
                                            </View>
                                        )}
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
                                        style={[styles.listView, deletionMode && selectedImages.includes(item.AssetsID) && styles.selectedImage]} // 삭제 모드이고 선택된 이미지인 경우에만 스타일을 적용합니다.
                                        onPress={() => handleImagePress(item.AssetsID)}
                                    >
                                        <Image
                                            source={{ uri: imageURL }}
                                            style={{ width: '100%', height: '100%', opacity: deletionMode && selectedImages.includes(item.AssetsID) ? 0.5 : 1  }}
                                        />
                                        {deletionMode && selectedImageOrder[item.AssetsID] && (
                                            <View style={styles.selectedNumber}>
                                                <Icon name='checkmark' size={16} color={'#ffffff'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                )
                            })
                    )}

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
        fontFamily: 'Pretendard-Light',
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
        top: 36,
    },
    btn: {
        width: '48%',
        height: 50,
        backgroundColor: '#CAC5FF',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    btn1: {
        width: '48%',
        height: 50,
        backgroundColor: '#967DFB',
        borderRadius: 14,
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
    selectedImage: {
    },
    selectedNumber: {
        position: 'absolute',
        width: 26,
        height: 26,
        bottom: 6,
        right: 6,
        backgroundColor: '#967DFB',
        borderRadius: 100,
        borderWidth: 2.5,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MyPage;
