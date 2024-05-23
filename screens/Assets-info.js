import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Entypo'; // Entypo 아이콘 import


// 클립보드 모듈 추가
import * as Clipboard from 'expo-clipboard';
import Linechart from '../components/Linechart/LineChart'

//크롤링 데이터 전처리
import { filterPriceList, todayPersent } from '../components/utils/filterPriceList'

const AssetsInfo = (props) => {
    const isFocused = useIsFocused();

    //로그인 확인
    const { params } = props.route;
    const assetID = params ? params.assetID : null;

    const conditions = ['새상품', '이상 없음', '기스', '액정 파손', '외판 손상', '기능 고장']
    const [conditionStat, setConditionStat] = useState(0)

    // 변수 리스트
    const [user, setUser] = useState()
    const [asset, setAsset] = useState();
    const [image, setImage] = useState();
    const [prices, setPrices] = useState(null);
    const [priceOfCondition, setPriceOfCondition] = useState([])
    const [chart, setChart] = useState(null);
    const [persent, setPersent] = useState(0);

    const [selectedPlatform, setSelectedPlatform] = useState("번개장터"); // 선택된 플랫폼 상태

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
    };

    // 로딩 상태
    const [loading, setLoading] = useState(true);

    const [isCopyButtonPressed, setIsCopyButtonPressed] = useState(false);
    const [isDeleteButtonPressed, setIsDeleteButtonPressed] = useState(false);

    const handleDeleteButtonPressIn = () => {
        setIsDeleteButtonPressed(true);
    };

    const handleDeleteButtonPressOut = () => {
        setIsDeleteButtonPressed(false);
    };

    const buttonBackgroundColor = isCopyButtonPressed ? '#745FC6' : '#967DFB';


    useEffect(() => {
        const fetchUser = async () => {
            //await AsyncStorage.removeItem("@user");
            setLoading(true);
            const userData = await AsyncStorage.getItem("@user");
            if (userData !== null) {
                //핸드폰에 저장되어있는 데이터 불러오기
                const imageData = await AsyncStorage.getItem("@imageData");
                const assetData = await AsyncStorage.getItem("@assetData");
                const priceData = await AsyncStorage.getItem("@priceData");
                const locationData = await AsyncStorage.getItem("@locationData");

                const imageList = JSON.parse(imageData).filter(item => item.assetID == assetID);
                const assetList = JSON.parse(assetData).filter(item => item.AssetsID == assetID);

                const BJFilteredList = JSON.parse(priceData).filter((item) => item.PLATFORM == "번개장터")
                const JNFilteredList = JSON.parse(priceData).filter((item) => item.PLATFORM == "중고나라")
                const DJFilteredList = JSON.parse(priceData).filter((item) => item.LOCATION == `${JSON.parse(locationData).region_1depth_name} ${JSON.parse(locationData).region_2depth_name}`)

                const BJPrice = filterPriceList(BJFilteredList, `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`, assetList[0].CONDITIONS)
                const JNPrice = filterPriceList(JNFilteredList, `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`, assetList[0].CONDITIONS)
                const DJPrice = filterPriceList(JNFilteredList, `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`, assetList[0].CONDITIONS)
                setPrices({ BJPrice, JNPrice, DJPrice })

        


                //그래프 상태 변수
                setConditionStat(conditions.indexOf(assetList[0].CONDITIONS));


                //상태별 값 로드
                let temp = [];
                for (i = 0; i < conditions.length; i++) {
                    const BJPrice = filterPriceList(BJFilteredList, `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`, conditions[i])
                    const JNPrice = filterPriceList(JNFilteredList, `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`, conditions[i])
                    const DJPrice = filterPriceList(JNFilteredList, `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`, conditions[i])
                    temp.push({ [i]: { BJPrice, JNPrice, DJPrice } })
                }
                setPriceOfCondition(temp)

                setUser(JSON.parse(userData))
                setImage(imageList)
                setAsset(assetList)

                const persentRes = todayPersent({ BJPrice, JNPrice })
                setPersent(persentRes)


                setLoading(false);
            } else {
                props.navigation.navigate('Login')
            }
        };

        fetchUser();
    }, [isFocused]);


    useEffect(() => {
        if (prices && selectedPlatform) {
            if (selectedPlatform == "번개장터") {
                setChart(prices.BJPrice)
            } else {
                setChart(prices.JNPrice)
            }
        }
    }, [prices, selectedPlatform])










    // 복사하기 버튼 핸들러
    const handleCopyText = () => {
        // AiText 스타일을 사용하는 모든 텍스트를 찾아서 복사
        let copiedText = '';
        // AiText 스타일을 사용하는 텍스트를 찾아서 복사
        data.forEach(item => {
            if (item.style === styles.AiText) {
                copiedText += item.text + '\n';
            }
        });
        Clipboard.setString(copiedText.trim());
        // 복사 완료 메시지 또는 처리를 여기에 추가할 수 있습니다.
    };

    // 데이터 예시 (텍스트와 스타일을 포함하는 배열)
    const data = [
        { text: !asset ? '데이터가 존재하지 않습니다.' : asset[0].GPTCONTENT , style: styles.AiText },
    ];

    const getCurrentDateTime = () => {
        // 현재 시간을 가져오기 위해 Date 객체 생성
        const currentDate = new Date();

        // 현재 날짜와 시간을 문자열로 변환하여 반환
        return currentDate.toLocaleString();
    };

    const currentDateTimeString = getCurrentDateTime();


    if (loading == true) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icons/SIDI Logo.gif')} />
            </View>

        )
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#ffffff',
            }}
        >
            <ScrollView
                showsHorizontalScrollIndicator={false} // 수평 스크롤 바 숨김
                showsVerticalScrollIndicator={false} // 수직 스크롤 바 숨김
            >
                <TouchableOpacity
                    style={styles.titleIcon}
                    onPress={() => {
                        props.navigation.navigate('MyPageMain');
                    }}
                    activeOpacity={1}
                >
                    <Icon name="chevron-small-left" size={30} color="#111111" left={-4} top={-4} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    {/* 자산 이미지 세션 */}
                    <ScrollView
                        style={[styles.imageSection, { height: Dimensions.get('window').width }]}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} // 수평 스크롤 바 숨김
                        showsVerticalScrollIndicator={false} // 수직 스크롤 바 숨김
                    >
                        {image.map((item, idx) => {
                            return (
                                <Image key={idx} source={{ uri: item.url }} style={styles.assetImage} />
                            )
                        })}

                    </ScrollView>
                    {/* 자산 정보 세션 */}
                    <View style={styles.infoSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.infoUserImage} source={{ uri: user.profileImg }} />
                            <Text style={styles.infoUserName}>{user.nickname}</Text>
                            <Text style={styles.infoDate}>{asset[0].DATE.substring(0, 10)}</Text>
                        </View>
                        <Text style={styles.infoAssetsName}>{asset[0].COMPANY} {asset[0].MODEL} {asset[0].MORE} {asset[0].COLOR}</Text>
                        <View style={styles.stateContainer}>
                            <Text style={styles.stateText}>상태</Text>
                            <Text style={styles.firststateDescription}>{asset[0].CONDITIONS}</Text>
                        </View>
                    </View>


                    {/* 중고 거래 플랫폼 시세 세션 */}
                    {selectedPlatform === '번개장터' && (
                        <View style={styles.priceSection}>
                            <View style={{ flexDirection: 'row', width: '88%', alignSelf: 'center', marginTop: 4 }}>
                                <Image
                                    source={require('../assets/icons/bungaeIcon.png')}
                                    style={styles.flatformImage}
                                />
                                <Text style={styles.flatformText}>번개장터</Text>

                            </View>
                            <View style={{ width: '88%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.flatformPrice}>{prices.BJPrice[prices.BJPrice.length - 1].value.toLocaleString()}</Text>
                                <Text style={styles.subflatformPrice}>원</Text>
                                {persent.BJ >= 0 ?
                                    <Text style={[styles.updownText, { color: 'red' }]}>{persent.BJ}%</Text> :
                                    <Text style={styles.updownText}>{persent.BJ}%</Text>
                                }
                            </View>

                        </View>
                    )}

                    {selectedPlatform === '중고나라' && (
                        <View style={styles.priceSection}>
                            <View style={{ flexDirection: 'row', width: '88%', alignSelf: 'center', marginTop: 4 }}>
                                <Image
                                    source={require('../assets/icons/joongna Icon.png')}
                                    style={styles.flatformImage}
                                />
                                <Text style={styles.flatformText}>중고나라</Text>

                            </View>
                            <View style={{ flexDirection: 'row', width: '88%', alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={styles.flatformPrice}>{prices.JNPrice[prices.JNPrice.length - 1].value.toLocaleString()}</Text>
                                <Text style={styles.subflatformPrice}>원</Text>
                                {persent.JN >= 0 ?
                                    <Text style={[styles.updownText, { color: 'red' }]}>{persent.JN}%</Text> :
                                    <Text style={styles.updownText}>{persent.JN}%</Text>
                                }
                            </View>

                        </View>

                    )}

                    {selectedPlatform === '당근마켓' && (
                        <View style={styles.priceSection}>
                            <View style={{ flexDirection: 'row', width: '88%', alignSelf: 'center', marginTop: 4 }}>
                                <Image
                                    source={require('../assets/icons/CarrotMarket.png')}
                                    style={styles.flatformImage}
                                />
                                <Text style={styles.flatformText}>당근마켓</Text>


                            </View>
                            <View style={{ flexDirection: 'row', width: '88%', alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={styles.flatformPrice}>{prices.JNPrice[prices.JNPrice.length - 1].value.toLocaleString()}</Text>
                                <Text style={styles.subflatformPrice}>원</Text>
                                {persent.JN >= 0 ?
                                    <Text style={[styles.updownText, { color: 'red' }]}>{persent.JN}%</Text> :
                                    <Text style={styles.updownText}>{persent.JN}%</Text>
                                }
                            </View>

                        </View>

                    )}

                    <View style={{ height: 300, backgroundColor: '#f5f5f5', width: '91%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <TouchableOpacity
                            style={styles.conditionView}
                            onPress={() => {
                                if (conditionStat == 5) {
                                    setConditionStat(0)
                                } else {
                                    setConditionStat(conditionStat + 1)
                                }
                                setPrices({
                                    BJPrice: priceOfCondition[conditionStat][conditionStat].BJPrice,
                                    JNPrice: priceOfCondition[conditionStat][conditionStat].JNPrice,
                                    DJPrice: priceOfCondition[conditionStat][conditionStat].DJPrice,
                                })
                                const persentRes = todayPersent({
                                    BJPrice: priceOfCondition[conditionStat][conditionStat].BJPrice,
                                    JNPrice: priceOfCondition[conditionStat][conditionStat].JNPrice,
                                    DJPrice: priceOfCondition[conditionStat][conditionStat].DJPrice,
                                })
                                setPersent(persentRes)
                            }}
                        >
                            <Text style={styles.conditionText}> 상태 - {conditions[conditionStat]}</Text>
                        </TouchableOpacity>

                        <Linechart ptDatas={prices} selectedPlatform={selectedPlatform} onPlatformSelect={handlePlatformSelect} />
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#f5f5f5', marginTop: 16 }}></View>

                    {/* AI가 작성해주는 글 세션 */}
                    <View style={styles.AiSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0, marginTop: 16 }}>
                            <Image
                                source={require('../assets/icons/AI Write.png')}
                                style={styles.illustration}
                            />
                            <Text style={styles.AiTitle}>AI가 작성해주는 판매글</Text>

                        </View>

                        <View style={styles.AiTextView}>
                            {data.map((item, index) => (
                                <Text key={index} style={[item.style, { paddingRight: 20 }]}>{item.text}</Text>
                            ))}
                        </View>

                        <TouchableOpacity
                            onPressIn={() => setIsCopyButtonPressed(true)}
                            onPressOut={() => setIsCopyButtonPressed(false)}
                            onPress={handleCopyText} // 수정된 부분
                            style={[styles.copyBtn, { backgroundColor: buttonBackgroundColor, transform: [{ scale: isCopyButtonPressed ? 0.95 : 1 }] }]}
                            activeOpacity={1}
                        >
                            <Text style={styles.copyText}>복사하기</Text>
                        </TouchableOpacity>


                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >
    );
};


export default AssetsInfo



const styles = StyleSheet.create({
    //자산 이미지 세션
    imageSection: {
        width: '100%',
        backgroundColor: '#f5f5f5',
    },
    assetImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },

    titleIcon: {
        left: 10,
        top: 30,
    },
    illustration: {
        marginLeft: 20,
        width: 40,
        height: 40,
    },

    //자산 정보 세션
    infoSection: {
        width: '91%',
        marginTop: 30,
    },
    infoUserName: {
        color: '#767676',
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        flex: 1,
    },
    infoUserImage: {
        width: 30,
        height: 30,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        marginRight: 9,
    },
    infoAssetsName: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        marginTop: 20,
        marginBottom: 10,
    },
    infoDate: {
        fontSize: 14,
        fontFamily: 'Pretendard-Light',
        color: '#767676',
    },
    stateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stateText: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        color: '#767676',
    },
    firststateDescription: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'Pretendard-Regular',
        color: '#111111',
    },
    stateDescription: {
        marginLeft: 4,
        fontSize: 16,
        fontFamily: 'Pretendard-Regular',
        color: '#111111',
    },


    //중고 거래 플랫폼 시세 차트 세션
    priceChartSection: {
        width: '91%',
        height: 400,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        marginTop: 12,
    },
    totalText: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        left: 54,
        top: -18,
    },

    totalGraphImage: {
        top: 10,
        left: 10,
        width: 40,
        height: 40,
    },
    conditionView: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 20,
        top: - 70
    },
    conditionText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        color: '#111111',
    },



    //중고 거래 플랫폼 시세 세션
    priceSection: {
        width: '91%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#f5f5f5',
        marginTop: 20,
    },

    flatformImage: { 
        top: 16,
        width: 24,
        height: 24,
        marginRight: 8,
    },
    flatformText: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        marginTop: 18,
        color: '#111111',
    },
    flatformPrice: {
        fontSize: 26,
        fontFamily: 'Pretendard-Bold',
        marginTop: 12,
        color: '#111111',
    },
    subflatformPrice: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        marginTop: 12,
        color: '#111111',
        marginLeft: 4
    },
    liveDateText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        marginTop: 14,
        color: '#767676',
    },
    updownText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        marginTop: 14,
        marginLeft: 8,
        color: 'blue',
    },



    //Ai 세션
    AiSection: {
        width: '100%',
        minHeight: 330,
    },
    AiTitle: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        marginLeft: 8
    },
    AiTextView: {
        minHeight: 210,
        marginBottom: 20,
    },
    AiText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        marginLeft: 20,
        marginTop: 12,
        color: '#111111',
        flexWrap: 'wrap',
    },
    copyBtn: {
        width: '91%',
        height: 51,
        backgroundColor: '#967DFB',
        borderRadius: 16,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    copyText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBol',
        alignSelf: 'center',
    },

    //삭제 버튼
    DeleteBtn: {
        width: '91%',
        height: 51,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#967DFB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DeleteText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Pretendard-Regular',
    },
})
