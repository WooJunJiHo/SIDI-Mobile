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
import { useState } from 'react';
// 아이콘
import Icon from '../components/styles/Icons';
// 클립보드 모듈 추가
import * as Clipboard from 'expo-clipboard';
import Linechart from '../components/Linechart/LineChart'

const AssetsInfo = (props) => {

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
        { text: '조서진 박유빈 김수민 주서진 레츠고', style: styles.AiText },
    ];

    const getCurrentDateTime = () => {
        // 현재 시간을 가져오기 위해 Date 객체 생성
        const currentDate = new Date();

        // 현재 날짜와 시간을 문자열로 변환하여 반환
        return currentDate.toLocaleString();
    };

    const currentDateTimeString = getCurrentDateTime();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#ffffff',
            }}
        >
            <ScrollView>
                <TouchableOpacity
                    style={styles.titleIcon}
                    onPress={() => {
                        props.navigation.navigate('MyPageMain');
                    }}
                >
                    <Image
                        source={require('../assets/icons/ShortCut-black.png')}
                        left={8}
                    />
                </TouchableOpacity>
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    {/* 자산 이미지 세션 */}
                    <View style={[styles.imageSection, { height: Dimensions.get('window').width }]} />

                    {/* 자산 정보 세션 */}
                    <View style={styles.infoSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.infoUserImage}></View>
                            <Text style={styles.infoUserName}>김우희</Text>
                            <Text style={styles.infoDate}>2024.01.09</Text>
                        </View>
                        <Text style={styles.infoAssetsName}>아이폰 15 Pro Max 화이트</Text>
                        <View style={styles.stateContainer}>
                            <Text style={styles.stateText}>상태</Text>
                            <Text style={styles.stateDescription}>외판 손상</Text>
                            <Text style={styles.stateDescription}>버튼 고장</Text>
                        </View>
                    </View>

                    {/* AI가 작성해주는 글 세션 */}
                    <View style={styles.AiSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0, marginTop: 20 }}>
                            <Image
                                source={require('../assets/icons/Robot.png')}
                                style={styles.illustration}
                            />
                            <Text style={styles.AiTitle}>AI가 작성해주는 판매글</Text>
                            <TouchableOpacity onPress={handleCopyText}>
                                <Text style={styles.copyText}>복사하기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.AiTextView}>
                            {data.map((item, index) => (
                                <Text key={index} style={[item.style, { paddingRight: 20 }]}>{item.text}</Text>
                            ))}
                        </View>

                    </View>

                    {/* 중고 거래 플랫폼 시세 차트 세션 */}
                    <View style={styles.priceChartSection}>
                        <Image
                            source={require('../assets/icons/GraphImage.png')}
                            style={styles.totalGraphImage}
                        />
                        <Text style={styles.totalText}>가격 그래프</Text>
                        <Linechart />
                    </View>

                    {/* 중고 거래 플랫폼 시세 세션 */}
                    <View style={styles.priceSection}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.flatformText}>번개장터</Text>
                            <Text style={styles.flatformPrice}>1,100,000원</Text>

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.liveDateText}>{currentDateTimeString} 기준</Text>
                            <Text style={styles.updownText}>-3.6%</Text>
                        </View>

                    </View>

                    {/* 삭제 버튼 */}
                    <TouchableOpacity style={styles.DeleteBtn}>
                        <Text style={styles.DeleteText}>삭제 하기</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#767676',
    },

    titleIcon: {
        left: 10,
        top: 30,
    },
    illustration: {
        marginLeft: 20
    },

    //자산 정보 세션
    infoSection: {
        width: '91%',
        marginTop: 20,
    },
    infoUserName: {
        color: '#767676',
        fontSize: 18,
        fontWeight: 'normal',
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
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 20,
    },
    infoDate: {
        fontSize: 14,
        fontWeight: 'light',
        color: '#767676',
    },
    stateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stateText: {
        fontSize: 14,
        fontWeight: 'light',
        color: '#767676',
    },
    stateDescription: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'light',
        color: '#111111',
    },


    //중고 거래 플랫폼 시세 차트 세션
    priceChartSection: {
        width: '91%',
        height: 313,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'medium',
        left: 50,
        top: 0,
    },

    totalGraphImage: {
        top: 20,
        left: 20,
    },



    //중고 거래 플랫폼 시세 세션
    priceSection: {
        width: '91%',
        height: 83,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#F5F5F5',
    },
    flatformText: {
        fontSize: 18,
        fontWeight: 'medium',
        marginLeft: 20,
        marginTop: 20,
        color: '#111111',
    },
    flatformPrice: {
        fontSize: 18,
        fontWeight: 'medium',
        marginLeft: 'auto',
        marginRight: 20,
        marginTop: 20,
        color: '#111111',
    },
    liveDateText: {
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 20,
        marginTop: 12,
        color: '#767676',
    },
    updownText: {
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 'auto',
        marginRight: 20,
        marginTop: 12,
        color: 'blue',
    },



    //Ai 세션
    AiSection: {
        width: '91%',
        height: 305,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#F5F5F5',
    },
    AiTitle: {
        fontSize: 18,
        fontWeight: 'medium',
        marginLeft: 8
    },
    AiTextView: {

    },
    AiText: {
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 20,
        marginTop: 12,
        color: '#767676',
    },
    copyText: {
        color: '#6C60F1',
        fontSize: 14,
        fontWeight: 'normal',
        left: 100
    },

    //삭제 버튼
    DeleteBtn: {
        width: '91%',
        height: 51,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#6C60F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DeleteText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal'
    },
})
