import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

//db load
import { getModelList } from '../components/Fetch/FetchData'


const ModelList = (props) => {
    const isFocused = useIsFocused();

    const [load, setLoad] = useState(true)
    const [list, setList] = useState(null)
    const [iPhone, setIPhone] = useState(null)
    const [iPad, setIPad] = useState(null)
    const [macBook, setMacBook] = useState(null)
    const [z, setZ] = useState(null)
    const [s, setS] = useState(null)
    const [tab, setTab] = useState(null)
    const [book, setBook] = useState(null)



    useEffect(() => {
        const fetchList = async () => {
            setLoad(true)
            const list = await getModelList();
            setList(list)

            setS(list.filter(item => item.MODEL == 'Galaxy S'))
            setTab(list.filter(item => item.MODEL == 'Galaxy Tab S'))
            setBook(list.filter(item => item.MODEL == 'Galaxy Book'))
            setZ(list.filter(item => item.MODEL == 'Galaxy Z'))
            setMacBook(list.filter(item => item.MODEL == 'MacBook'))
            setIPad(list.filter(item => item.MODEL == 'iPad'))
            setIPhone(list.filter(item => item.MODEL == 'iPhone'))
            setLoad(false)
        }
        fetchList()
    }, [isFocused])


    if (load == true) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../assets/icons/SIDI Logo.gif')}
                    style={{ height: '100%', width: '100%' }}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ width: '100%', alignSelf: 'center' }}>
                <View style={styles.mainView}>
                    <Text style={styles.mainTitle}>지원 가능 기종: {list.length}개</Text>
                    <Text style={styles.submainTitle}>최종 업데이트: 2024.05.17</Text>
                </View>

                <View style={{ width: '100%' ,height: '86%' }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* 애플 시작 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '91%', alignSelf: 'center'}}>
                            <View style={styles.logoView}>
                                <Image source={require('../assets/icons/Apple Logo.png')} style={styles.logoImage} />
                            </View>
                            <View>
                                <Text style={styles.modelText}>Apple</Text>
                            </View>
                        </View>

                        <View style={styles.modelView}>
                            <Text style={styles.modelTitle}>Apple iPhone</Text>
                            {iPhone.map((item, idx) => {
                                return (
                                    <Text key={idx} style={styles.submodelTitle}>{item.MODEL} {item.MORE}</Text>
                                )
                            })}
                        </View>

                        <View style={{ width: '100%', height: 1, backgroundColor: '#f5f5f5' }}></View>

                        <View style={styles.modelView}>
                            <Text style={styles.modelTitle}>Apple iPad</Text>
                            {iPad.map((item, idx) => {
                                return (
                                    <Text key={idx} style={styles.submodelTitle}>{item.MODEL} {item.MORE}</Text>
                                )
                            })}
                        </View>

                        <View style={{ width: '100%', height: 1, backgroundColor: '#f5f5f5' }}></View>

                        <View style={styles.modelView}>
                            <Text style={styles.modelTitle}>Apple MacBook</Text>
                            {macBook.map((item, idx) => {
                                return (
                                    <Text key={idx} style={styles.submodelTitle}>{item.MODEL} {item.MORE}</Text>
                                )
                            })}
                        </View>

                        <View style={{ width: '100%', height: 12, backgroundColor: '#f5f5f5', marginBottom: 30 }}></View>

                        {/* 삼성 시작 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '91%', alignSelf: 'center' }}>
                            <View style={styles.logoView}>
                                <Image source={require('../assets/icons/Samsung Logo.png')} style={styles.logoImage} />
                            </View>
                            <View>
                                <Text style={styles.modelText}>Samsung</Text>
                            </View>
                        </View>

                        <View style={styles.modelView}>
                            <Text style={styles.modelTitle}>Samsung Galaxy</Text>
                            {s.map((item, idx) => {
                                return (
                                    <Text key={idx} style={styles.submodelTitle}>{item.MODEL} {item.MORE}</Text>
                                )
                            })}
                            {z.map((item, idx) => {
                                return (
                                    <Text key={idx} style={styles.submodelTitle}>{item.MODEL} {item.MORE}</Text>
                                )
                            })}
                        </View>

                        <View style={{ width: '100%', height: 1, backgroundColor: '#f5f5f5' }}></View>

                        <View style={styles.modelView}>
                            <Text style={styles.modelTitle}>Samsung Galaxy Tab</Text>
                            {tab.map((item, idx) => {
                                return (
                                    <Text key={idx} style={styles.submodelTitle}>{item.MODEL} {item.MORE}</Text>
                                )
                            })}
                        </View>

                        <View style={{ width: '100%', height: 1, backgroundColor: '#f5f5f5' }}></View>

                        <View style={styles.modelView}>
                            <Text style={styles.modelTitle}>Samsung Galaxy Book</Text>
                            {book.map((item, idx) => {
                                return (
                                    <Text key={idx} style={styles.submodelTitle}> {item.MODEL} {item.MORE}</Text>
                                )
                            })}
                        </View>

                    </ScrollView>
                </View>

            </View>

        </SafeAreaView>
    )
}


export default ModelList




const styles = StyleSheet.create({
    modelView: {
        marginBottom: 20,
        marginTop: 30,
        width: '91%',
        alignSelf: 'center',
    },
    modelTitle: {
        fontSize: 20,
        fontFamily: 'Pretendard-SemiBold',
        color: '#111111',
        marginBottom: 20,
    },
    submodelTitle: {
        fontSize: 16,
        fontFamily: 'Pretendard-Regular',
        color: '#111111',
        marginBottom: 10,
    },

    mainView: {
        width: '91%',
        alignSelf: 'center',
    },
    mainTitle: {
        fontSize: 26,
        fontFamily: 'Pretendard-SemiBold',
        marginTop: 30,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    submainTitle: {
        fontSize: 16,
        fontFamily: 'Pretendard-Regular',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    logoView: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderColor: '#f1f1f1',
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: '95%',
        height: '95%',
        resizeMode: 'cover',
        borderRadius: 22,
    },
    modelText: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        color: '#111111',
        marginLeft: 8,
    },
})