import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native'
import { useState } from 'react';

//다크모드
import DarkMode from '../components/styles/DarkMode'


const AssetsInfo = (props) => {
    //다크모드
    const [ui, setUI] = useState(false);

    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightPriceView : DarkMode.darkPriceView,
                {
                    flex: 1,
                }
            ]}
        >
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    {/* 자산 이미지 세션 */}
                    <View style={[styles.imageSection, { height: Dimensions.get('window').width }]}>

                    </View>

                    {/* 자산 정보 세션 */}
                    <View style={styles.infoSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.infoUserImage}></View>
                            <Text style={styles.infoUserName}>
                                김우희
                            </Text>
                        </View>
                        <Text style={[styles.infoAssetsName, ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,]}>아이폰 15 Pro Max 화이트</Text>
                        <Text style={styles.infoUserName}>2024.01.09</Text>
                        <View style={styles.infoHeart}></View>
                    </View>

                    {/* 중고 거래 플랫폼 시세 차트 세션 */}
                    <View style={[styles.priceChartSection, ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,]}>

                    </View>

                    {/* 중고 거래 플랫폼 시세 세션 */}
                    <View style={[styles.priceSection, ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,]}>

                    </View>


                    {/* 360도 이미지 세션 */}
                    <View style={[styles.image360Section, ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,]}>

                    </View>


                    {/* 채팅 버튼 */}
                    <TouchableOpacity style={styles.chatBtn}>
                        <Text style={styles.chatBtnText}>채팅 하기</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default AssetsInfo



const styles = StyleSheet.create({
    //자산 이미지 세션
    imageSection: {
        width: '100%',
        backgroundColor: '#242424',
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
    infoHeart: {
        width: 20,
        height: 18,
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },


    //중고 거래 플랫폼 시세 차트 세션
    priceChartSection: {
        width: '91%',
        height: 313,
        marginTop: 30,
        borderRadius: 20,
    },



    //중고 거래 플랫폼 시세 세션
    priceSection: {
        width: '91%',
        height: 83,
        borderRadius: 20,
        marginTop: 20,
    },




    //360도 이미지 세션
    image360Section: {
        width: '91%',
        height: 305,
        borderRadius: 20,
        marginTop: 20,
    },




    //채팅 버튼
    chatBtn: {
        width: '91%',
        height: 51,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#2A8FF7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal'
    },
})