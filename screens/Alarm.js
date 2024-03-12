import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useState } from 'react'


//다크모드
import DarkMode from '../components/styles/DarkMode'



const Alarm = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);

    //리스트
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);





    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightPriceView : DarkMode.darkPriceView,
                {
                    flex: 1,
                }
            ]}
        >
            {/* 메인 타이틀 */}
            <Text
                style={[
                    ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                    styles.mainTitle
                ]}
            >
                알림
            </Text>


            {/* 알림 리스트 세션 */}
            <ScrollView>
                <View style={styles.listSection}>
                    {list.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={styles.alarmView}
                        >
                            <View style={styles.alarmImage}></View>
                            <Text
                                style={[
                                    ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                                    styles.alarmText
                                ]}
                            >
                                백지환 님이 회원 님의 iPhone 12 자산에 관심을 가지고 있습니다.
                            </Text>
                            <Text style={styles.alarmDate}>17시간</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Alarm


const styles = StyleSheet.create({
    //메인 타이틀
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },




    //알림 리스트 세션
    listSection: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
    },
    alarmView: {
        width: '94%',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    alarmImage: {
        width: 40,
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        marginRight: 12,
    },
    alarmText: {
        width: '60%',
        fontSize: 14,
        fontWeight: 'bold',
    },
    alarmDate: {
        color: '#767676',
        fontSize: 14,
        position: 'absolute',
        right: 0,
        top: 0,
    },
})