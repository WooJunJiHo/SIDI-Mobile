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
import { filterPriceList, priceAverage } from '../components/utils/filterPriceList'

const AssetsInfo = (props) => {
    const isFocused = useIsFocused();

    //로그인 확인
    const { params } = props.route;
    const assetID = params ? params.assetID : null;

    // 변수 리스트
    const [user, setUser] = useState()
    const [asset, setAsset] = useState();
    const [image, setImage] = useState();
    const [prices, setPrices] = useState(null);
    const [average, setAverage] = useState('');


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

                const imageList = JSON.parse(imageData).filter(item => item.assetID == assetID);
                const assetList = JSON.parse(assetData).filter(item => item.AssetsID == assetID);

                const filteredList = filterPriceList(JSON.parse(priceData), `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`)
                setPrices(filteredList)
                const avgResult = priceAverage(filteredList)
                setAverage(avgResult)

                setUser(JSON.parse(userData))
                setImage(imageList)
                setAsset(assetList)


                setLoading(false);
            } else {
                props.navigation.navigate('Login')
            }
        };

        fetchUser();
    }, [isFocused]);



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
        { text: '복사가 되나요? 테스트용입니당', style: styles.AiText },
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
                            <Text style={styles.firststateDescription}>외판 손상,</Text>
                            <Text style={styles.stateDescription}>버튼 고장</Text>
                        </View>
                    </View>


                    {/* 중고 거래 플랫폼 시세 세션 */}
                    <View style={styles.priceSection}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={require('../assets/icons/bungaeIcon.png')}
                                style={styles.flatformImage}
                            />
                            <Text style={styles.flatformText}>번개장터</Text>
                            <Text style={styles.flatformPrice}>{average.toLocaleString()} 원</Text>

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.liveDateText}>{currentDateTimeString} 기준</Text>
                            <Text style={styles.updownText}>%</Text>
                        </View>

                    </View>


                    {/* 중고 거래 플랫폼 시세 차트 세션 */}
                    <View style={styles.priceChartSection}>
                        <Image
                            source={require('../assets/icons/Graph.png')}
                            style={styles.totalGraphImage}
                        />
                        <Text style={styles.totalText}>가격 그래프</Text>
                        <Linechart ptData={prices} />
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
        </SafeAreaView>
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
        fontFamily: 'Pretendard-Regular',
        color: '#767676',
    },
    firststateDescription: {
        marginLeft: 14,
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
        height: 330,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        marginTop: 12,
    },
    totalText: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        left: 56,
        top: -18,
    },

    totalGraphImage: {
        top: 10,
        left: 10,
        width: 40,
        height: 40,
    },



    //중고 거래 플랫폼 시세 세션
    priceSection: {
        width: '91%',
        height: 86,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        marginTop: 30,
    },

    flatformImage: {
        top: 16,
        left: 20,
        width: 24,
        height: 24,
    },
    flatformText: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        marginLeft: 28,
        marginTop: 18,
        color: '#111111',
    },
    flatformPrice: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        marginLeft: 'auto',
        marginRight: 20,
        marginTop: 18,
        color: '#111111',
    },
    liveDateText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        marginLeft: 20,
        marginTop: 14,
        color: '#767676',
    },
    updownText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        marginLeft: 'auto',
        marginRight: 20,
        marginTop: 14,
        color: 'blue',
    },



    //Ai 세션
    AiSection: {
        width: '100%',
        height: 330,
    },
    AiTitle: {
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        marginLeft: 8
    },
    AiTextView: {
        height: 210,
    },
    AiText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        marginLeft: 20,
        marginTop: 12,
        color: '#111111',
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
        fontFamily: 'Pretendard-Regular',
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
