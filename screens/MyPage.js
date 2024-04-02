import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native'
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

// 아이콘
import Icon from '../components/styles/Icons'

//DB 로드
import { fetchUserAssets, fetchAssetsImages } from '../components/Fetch/FetchData'

import AsyncStorage from "@react-native-async-storage/async-storage";



const MyPage = (props) => {
    const isFocused = useIsFocused();

    // 메뉴 선택
    const [category, setCategory] = useState(0)
    // 리스트
    const [list, setList] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const [image, setImage] = useState([]);

    // 로딩 상태
    const [loading, setLoading] = useState(true);

    const navigateToMyAssetsInfo = () => {
        props.navigation.navigate("MyAssetsInfo");
    }

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const user = await AsyncStorage.getItem("@user");
            if (user !== null) {
                const imageData = await fetchAssetsImages(JSON.parse(user).userID)
                setImage(imageData);
                const userData = await fetchUserAssets(JSON.parse(user))
                setList(userData)
                setLoading(false);
            } else {
                props.navigation.navigate('Login')
            }
        };

        fetchUser();
    }, [isFocused]);



    useEffect(() => {
        // list 배열이 업데이트될 때마다 selectList를 재설정
        if (category === 1) {
            // category가 1일 때 list 배열에서 category가 1인 항목만 선택하여 selectList에 추가
            const filteredList = list.filter(item => item.CategoryID === 1);
            setSelectList(filteredList);
        } else if (category === 2) {
            // category가 2일 때 list 배열에서 category가 2인 항목만 선택하여 selectList에 추가
            const filteredList = list.filter(item => item.CategoryID === 2);
            setSelectList(filteredList);
        } else if (category === 3) {
            // category가 3일 때 list 배열에서 category가 3인 항목만 선택하여 selectList에 추가
            const filteredList = list.filter(item => item.CategoryID === 3);
            setSelectList(filteredList);
        }
    }, [list, category]);


    const LoadList = () => {
        return (
            <>
                {category === 0 ? (
                    // category가 0일 때 list를 사용하여 렌더링
                    list.map((item, idx) => {
                        // 현재 list 항목의 assetID
                        const AssetsID = item.AssetsID;

                        // 현재 list 항목과 일치하는 첫 번째 이미지 찾기
                        const matchedImage = image.find(imageItem => imageItem.assetID == AssetsID && imageItem.imageNumber == 1);

                        // 이미지가 없는 경우
                        if (!matchedImage) {
                            return null;
                        }
                        // 이미지가 있는 경우, 이미지의 URL을 가져오기
                        const imageURL = matchedImage.url;

                        return (
                            <TouchableOpacity
                                key={idx}
                                style={[
                                    styles.listView,
                                    { height: Dimensions.get('window').width / 3 },
                                ]}
                                onPress={navigateToMyAssetsInfo}
                            >
                                <Image
                                    source={{ uri: imageURL }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </TouchableOpacity>
                        )
                    })
                ) : (
                    // category가 0이 아닐 때 selectList를 사용하여 렌더링
                    selectList.map((item, idx) => {
                        // 현재 list 항목의 assetID
                        const AssetsID = item.AssetsID;

                        // 현재 list 항목과 일치하는 첫 번째 이미지 찾기
                        const matchedImage = image.find(imageItem => imageItem.assetID == AssetsID && imageItem.imageNumber == 1);

                        // 이미지가 없는 경우
                        if (!matchedImage) {
                            return null;
                        }
                        // 이미지가 있는 경우, 이미지의 URL을 가져오기
                        const imageURL = matchedImage.url;
                        
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={[
                                    styles.listView,
                                    { height: Dimensions.get('window').width / 3 },
                                ]}
                                onPress={navigateToMyAssetsInfo}
                            >
                                <Image
                                    source={{ uri: imageURL }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </TouchableOpacity>    
                        )
                    })
                )}
            </>
        );
    };









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
                    onPress={() => { props.navigation.navigate('Login') }}
                >
                    <Icon
                        name='person-outline'
                        size={24}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.settingBtn}
                    onPress={() => { props.navigation.navigate('Setting') }}
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
                        category !== 0 ? { borderWidth: 0 } : { borderBottomWidth: 2, borderBottomColor: '#111111' },
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
                        category !== 1 ? { borderWidth: 0 } : { borderBottomWidth: 2, borderBottomColor: '#111111' },
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
                        category !== 2 ? { borderWidth: 0 } : { borderBottomWidth: 2, borderBottomColor: '#111111' },
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
                        category !== 3 ? { borderWidth: 0 } : { borderBottomWidth: 2, borderBottomColor: '#111111' },
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
                    {loading == false ? <LoadList /> : <View />}
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
