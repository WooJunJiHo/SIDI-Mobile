import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Entypo'; // Entypo 아이콘 import
import { ScrollView } from 'react-native-gesture-handler';

const Explanation = (props) => {


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleInfoSection}>
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}>사용 방법</Text>
                    <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                        <View style={styles.iconBtn}>
                            <Icon name="chevron-small-left" size={30} color="#111111" left={-4} top={-4} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            <ScrollView style={{ width: '100%' }}>
                <View style={styles.ExplanationContainer}>
                    <View style={{ width: '91%' }}>
                        <Image
                            source={require('../assets/icons/SIDI icon.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.explainText}>내 제품 {'\n'}중고 시세도 간단하게!!</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, left: -6 }}>
                            <View>
                                <Image
                                    source={require('../assets/icons/Camera.png')}
                                    style={styles.cameraIcon}
                                />
                                <Text style={styles.cameraText}>사진으로 {'\n'}한번에 체크!</Text>
                            </View>
                            <View style={{}}>
                                <Image
                                    source={require('../assets/icons/explainGraph.png')}
                                    style={styles.graphIcon}
                                />
                                <Text style={styles.cameraText}>중고 시세 {'\n'}분석하여 제공</Text>
                            </View>
                            <View style={{}}>
                                <Image
                                    source={require('../assets/icons/explainWrite.png')}
                                    style={styles.writeIcon}
                                />
                                <Text style={styles.cameraText}>AI로 작성해주는 {'\n'}제품 판매글</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.ExplanationContainer2}>
                    <View style={{ width: '91%' }}>
                        <Image
                            source={require('../assets/icons/Inside.png')}
                            style={styles.insideIcon}
                        />
                        <Text style={styles.explainText2}>
                            기기에 넣으면 알아서 확인!
                        </Text>
                        <Text style={styles.explainText3}>
                            해당 제품의 알맞은 중고 시세와 그래프가 출력됩니다
                        </Text>
                    </View>

                </View>
                <View style={styles.ExplanationContainer3}>
                    <View style={{ width: '91%', marginTop: 30 }}>
                        <Text style={styles.QRText}>QR코드로 간단 등록!</Text>
                        <Text style={styles.QRSubText}>간단하게 자산이 내 정보에 등록됩니다</Text>
                    </View>
                    <Image
                        source={require('../assets/icons/QRcode-Hand2.png')}
                        style={styles.QRcodeIcon}
                    />
                </View>
            </ScrollView>


        </SafeAreaView>
    );
};

export default Explanation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    titleInfoSection: {
        width: '100%',
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
        marginBottom: 25,
    },
    iconBtn: {
        position: 'absolute',
        left: 0,
        top: 30,
    },
    ExplanationContainer: {
        width: '100%',
        height: 360,
        backgroundColor: '#4EB076',
        alignItems: 'center',
    },
    icon: {
        width: 100,
        height: 100,
        left: '-4%'
    },
    cameraIcon: {
        width: 90,
        height: 90,
    },
    graphIcon: {
        width: 90,
        height: 90,
    },
    writeIcon: {
        width: 90,
        height: 90,
    },
    explainText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 24,
        color: '#FFFFFF',
        bottom: 14,
        lineHeight: 34,
    },
    cameraText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        color: '#FFFFFF',
        alignSelf: 'center',
        lineHeight: 22,
    },
    ExplanationContainer2: {
        width: '91%',
        height: 280,
        top: 20,
        alignItems: 'center',
    },
    explainText2: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 24,
    },
    explainText3: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        marginTop: 12,
        lineHeight: 22,
    },
    insideIcon: {
        width: 160,
        height: 160,
        left: '-6%',
    },
    ExplanationContainer3: {
        width: '100%',
        height: 300,
        backgroundColor: '#87CEEB',
        alignItems: 'center',
    },
    QRcodeIcon: {
        width: 160,
        height: 200,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    QRText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    QRSubText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 12,
    },
});

