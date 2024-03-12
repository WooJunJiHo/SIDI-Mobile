import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native'
import { useState } from 'react'


//다크모드
import DarkMode from '../components/styles/DarkMode'


//아이콘
import Icon from '../components/styles/Icons'





const MyPage = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);

    //메뉴 선택
    const [category, setCategory] = useState(0)

    //리스트
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);



    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightPriceView : DarkMode.darkPriceView,
                {
                    flex: 1,
                    alignItems: 'center',
                }
            ]}
        >
            {/* 타이틀 세션 */}
            <View style={styles.titleSection}>
                <Text
                    style={[
                        ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        styles.mainTitle
                    ]}
                >
                    내 자산
                </Text>
                <TouchableOpacity
                    style={[styles.iconBtn, {right: 40,}]}
                    onPress={()=>{props.navigation.navigate('AssetsAdd')}}
                >
                    <Icon
                        name='add-outline'
                        size={24}
                        color={ui != false ? 'black' : 'white'}
                    />     
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={()=>{props.navigation.navigate('Login')}}
                >
                    <Icon
                        name='person-outline'
                        size={24}
                        color={ui != false ? 'black' : 'white'} 
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.userBtn, {right: 60,}]}
                    onPress={()=>{props.navigation.navigate('AssetsAdd')}}
                >
                    <Icon
                        name='add-outline'
                        size={24}
                        color={ui != false ? 'black' : 'white'} 
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.settingBtn}
                    onPress={()=>{props.navigation.navigate('Setting')}}
                >
                    <Icon
                        name='settings-outline'
                        size={24}
                        color={ui != false ? 'black' : 'white'}
                    />     
                </TouchableOpacity>
            </View>
            

            {/* 총 자산 세션 */}
            <View
                style={[
                    ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,
                    styles.priceSection
                ]}
            >
                <Text style={[styles.priceSubText]}>총 자산</Text>
                <Text
                    style={[
                        ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        styles.priceMainText
                    ]}
                >
                    1,301,590,000원
                </Text>
            </View>

            {/* 카테고리 세션 */}
            <View style={styles.menuSection}>
                <TouchableOpacity
                    style={[
                        ui != false ? { borderColor: 'black' } : { borderColor: 'white' },
                        category !== 0 ? { borderWidth: 0 } : { borderBottomWidth: 2 },
                        { width: Dimensions.get('window').width * 3 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(0)
                    }}
                >
                    <Text style={styles.menuText}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        ui != false ? { borderColor: 'black' } : { borderColor: 'white' },
                        category !== 1 ? { borderWidth: 0 } : { borderBottomWidth: 2 },
                        { width: Dimensions.get('window').width * 3 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(1)
                    }}
                >
                    <Text style={styles.menuText}>핸드폰</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        ui != false ? { borderColor: 'black' } : { borderColor: 'white' },
                        category !== 2 ? { borderWidth: 0 } : { borderBottomWidth: 2 },
                        { width: Dimensions.get('window').width * 3 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(2)
                    }}
                >
                    <Text style={styles.menuText}>컴퓨터</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        ui != false ? { borderColor: 'black' } : { borderColor: 'white' },
                        category !== 3 ? { borderWidth: 0 } : { borderBottomWidth: 2 },
                        { width: Dimensions.get('window').width * 3 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(3)
                    }}
                >
                    <Text style={styles.menuText}>이어폰</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        ui != false ? { borderColor: 'black' } : { borderColor: 'white' },
                        category !== 4 ? { borderWidth: 0 } : { borderBottomWidth: 2 },
                        { width: Dimensions.get('window').width * 4 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(4)
                    }}
                >
                    <Text style={styles.menuText}>악세사리</Text>
                </TouchableOpacity>
            </View>

            {/* 자산 리스트 세션 */}
            <ScrollView>
                <View style={styles.listSection}>
                    {list.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={[
                                styles.listView, 
                                { height: Dimensions.get('window').width / 3 }, 
                                ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput
                            ]}
                            onPress={() => {
                                props.navigation.navigate("MyAssetsInfo")
                            }}
                        >

                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default MyPage




const styles = StyleSheet.create({
    //타이틀 세션
    titleSection: {
        width: '91%',
    },
    mainTitle: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userBtn: {
        position: 'absolute',
        right: 30,
        top: 30,
    },
    settingBtn: {
        position: 'absolute',
        right: 0,
        top: 30,
    },



    //총 자산 세션
    priceSection: {
        width: '91%',
        height: 61,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceSubText: {
        color: '#767676',
        fontSize: 18,
        fontWeight: 'normal',
        position: 'absolute',
        left: 20,
    },
    priceMainText: {
        fontSize: 18,
        fontWeight: 'normal',
        position: 'absolute',
        right: 20,
    },



    //카테고리 세션
    menuSection: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 30,
    },
    menuText: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#767676',
        textAlign: 'center',
        paddingBottom: 14,
    },


    //자산 리스트 세션
    listSection: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    listView: {
        width: '33.3%',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})