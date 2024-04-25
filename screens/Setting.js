import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo'; // Entypo 아이콘 import

const Setting = (props) => {
    const [pressedBtn, setPressedBtn] = useState(null);

    const handlePressIn = (btnName) => {
        setPressedBtn(btnName);
    };

    const handlePressOut = () => {
        setPressedBtn(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 타이틀 & 내 정보 세션 */}
            <View style={styles.titleInfoSection}>
                {/* 타이틀 세션 */}
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}>내 정보</Text>
                    <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                        <View style={styles.iconBtn}>
                            <Icon name="chevron-small-left" size={30} color="#111111" left={-4} top={-4} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* 내 정보 세션 */}
                <View style={styles.infoSection}>
                    <View style={styles.infoImage}></View>
                    <Text style={styles.infoName}>백지환</Text>
                </View>
            </View>

            {/* 버튼 세션 */}
            <View style={styles.infoHeartSection}>
                <TouchableWithoutFeedback
                    onPress={() => { }}
                    onPressIn={() => handlePressIn('개인정보')}
                    onPressOut={handlePressOut}
                >
                    <View style={[styles.btn1, pressedBtn === '개인정보' && styles.btnPressed]}>
                        <Text style={styles.btnText}>개인정보</Text>
                        <View style={styles.btnIcon}>
                            <Icon name="chevron-small-right" size={24} color="#767676" right={0} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => { }}
                    onPressIn={() => handlePressIn('도움말')}
                    onPressOut={handlePressOut}
                >
                    <View style={[styles.btn2, pressedBtn === '도움말' && styles.btnPressed]}>
                        <Text style={styles.btnText}>도움말</Text>
                        <View style={styles.btnIcon}>
                            <Icon name="chevron-small-right" size={24} color="#767676" right={0} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => { }}
                    onPressIn={() => handlePressIn('설정')}
                    onPressOut={handlePressOut}
                >
                    <View style={[styles.btn3, pressedBtn === '설정' && styles.btnPressed]}>
                        <Text style={styles.btnText}>설정</Text>
                        <View style={styles.btnIcon}>
                            <Icon name="chevron-small-right" size={24} color="#767676" right={0} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => { }}
                    onPressIn={() => handlePressIn('로그아웃')}
                    onPressOut={handlePressOut}
                >
                    <View style={[styles.btn4, pressedBtn === '로그아웃' && styles.btnPressed]}>
                        <Text style={styles.btnText}>로그아웃</Text>
                        <View style={styles.btnIcon}>
                            <Icon name="chevron-small-right" size={24} color="#767676" right={0} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    );
};

export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleInfoSection: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
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
    infoSection: {
        width: '91%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoImage: {
        width: 40,
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        marginRight: 16,
    },
    infoName: {
        fontSize: 20,
        fontFamily: 'Pretendard-SemiBold',
        left: -2
    },
    infoHeartSection: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    btn1: {
        width: '94%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    btn2: {
        width: '94%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    btn3: {
        width: '94%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    btn4: {
        width: '94%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    btnPressed: {
        transform: [{ scale: 0.95 }],
        backgroundColor: '#f5f5f5', // 스케일이 줄어들었을 때 배경색을 변경
    },
    btnText: {
        fontSize: 18,
        fontFamily: 'Pretendard-Regular',
        left: 10,
    },
    btnIcon: {
        position: 'absolute',
        right: 8,
    },
});

