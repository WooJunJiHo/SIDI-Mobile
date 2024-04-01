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


const Alarm = (props) => {

    //리스트
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);


    return (
        <SafeAreaView
            style={[
                {
                    flex: 1,
                    backgroundColor: '#FFFFFF'
                }
            ]}
        >
            {/* 메인 타이틀 */}
            <Text
                style={[
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
                            <Text style={styles.alarmText}>
                                <Text style={styles.highlightText}>백지환</Text> 님이 <Text style={styles.highlightText}>아이폰 12</Text> 자산을 추가했습니다.
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
        width: '66%',
        fontSize: 14,
        fontWeight: 'medium',
        alignSelf: 'flex-start',
    },
    highlightText: {
        fontWeight: 'bold',
        color: '#111111',
    },
    alarmDate: {
        alignSelf: 'flex-start',
        color: '#767676',
        fontSize: 14,
        position: 'absolute',
        right: 0,
    },
})