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

// 아이콘
import Icon from '../components/styles/Icons'

const MyPage = (props) => {
    // 메뉴 선택
    const [category, setCategory] = useState(0)
    // 리스트
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

    const navigateToMyAssetsInfo = () => {
        props.navigation.navigate("MyAssetsInfo");
    }

    return (
        <SafeAreaView
            style={[
                {
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: '#ffffff'
                }
            ]}
        >
            {/* 타이틀 세션 */}
            <View style={styles.titleSection}>
                <Text
                    style={[
                        styles.mainTitle
                    ]}
                >
                    내 자산
                </Text>
              
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={()=>{props.navigation.navigate('Login')}}
                >
                    <Icon
                        name='person-outline'
                        size={24}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.settingBtn}
                    onPress={()=>{props.navigation.navigate('Setting')}}
                >
                    <Icon
                        name='settings-outline'
                        size={24}
                    />     
                </TouchableOpacity>
            </View>
            

            {/* 총 자산 세션 */}
            <View
                style={[
                    styles.priceSection
                ]}
            >
                <Text style={[styles.priceSubText]}>총 자산</Text>
                <Text
                    style={[
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
                        category !== 0 ? { borderWidth: 0 } : { borderBottomWidth: 2, borderBottomColor: '#111111'},
                        { width: Dimensions.get('window').width * 4 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(0)
                    }}
                >
                    <Text style={[styles.menuText, category !== 0 && styles.menuTextSelected]}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        category !== 1 ? { borderWidth: 0 } : { borderBottomWidth: 2, borderBottomColor: '#111111'},
                        { width: Dimensions.get('window').width * 4 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(1)
                    }}
                >
                    <Text style={[styles.menuText, category !== 1 && styles.menuTextSelected]}>핸드폰</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        category !== 2 ? { borderWidth: 0 } : { borderBottomWidth: 2, borderBottomColor: '#111111'},
                        { width: Dimensions.get('window').width * 4 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(2)
                    }}
                >
                    <Text style={[styles.menuText, category !== 2 && styles.menuTextSelected]}>태블릿</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        category !== 3 ? { borderWidth: 0 } : { borderBottomWidth: 2, borderBottomColor: '#111111'},
                        { width: Dimensions.get('window').width * 4 / 16 }
                    ]}
                    onPress={() => {
                        setCategory(3)
                    }}
                >
                    <Text style={[styles.menuText, category !== 3 && styles.menuTextSelected]}>노트북</Text>
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
                            ]}
                            onPress={navigateToMyAssetsInfo}
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
        right: 40,
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
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
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
        color: '#111111',
        textAlign: 'center',
        paddingBottom: 14,
    },
    menuTextSelected: {
        color: '#767676',
    },


    //자산 리스트 세션
    listSection: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 0,
    },
    listView: {
        width: '33.3%',
        borderWidth: 1,
        borderColor: '#ececec',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
})
