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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <Text>지원 가능 기종: {list.length}개</Text>
            <Text>최종 업데이트: 2024.05.17</Text>
            <View style={{ width: '90%' }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 애플 시작 */}
                    <Image source={require('../assets/icons/Apple Logo.png')} style={styles.logoImage} />
                    <View style={styles.modelView}>
                        <Text style={styles.modelTitle}>Apple iPhone</Text>
                        {iPhone.map((item, idx) => {
                            return (
                                <Text key={idx}>{item.MODEL} {item.MORE}</Text>
                            )
                        })}
                    </View>

                    <View style={styles.modelView}>
                        <Text style={styles.modelTitle}>Apple iPad</Text>
                        {iPad.map((item, idx) => {
                            return (
                                <Text key={idx}>{item.MODEL} {item.MORE}</Text>
                            )
                        })}
                    </View>

                    <View style={styles.modelView}>
                        <Text style={styles.modelTitle}>Apple MacBook</Text>
                        {macBook.map((item, idx) => {
                            return (
                                <Text key={idx}>{item.MODEL} {item.MORE}</Text>
                            )
                        })}
                    </View>

                    {/* 삼성 시작 */}
                    <Image source={require('../assets/icons/Samsung Logo.png')} style={styles.logoImage} />
                    <View style={styles.modelView}>
                        <Text style={styles.modelTitle}>Samsung Galaxy</Text>
                        {s.map((item, idx) => {
                            return (
                                <Text key={idx}>{item.MODEL} {item.MORE}</Text>
                            )
                        })}
                        {z.map((item, idx) => {
                            return (
                                <Text key={idx}>{item.MODEL} {item.MORE}</Text>
                            )
                        })}
                    </View>

                    <View style={styles.modelView}>
                        <Text style={styles.modelTitle}>Samsung Galaxy Tab</Text>
                        {tab.map((item, idx) => {
                            return (
                                <Text key={idx}>{item.MODEL} {item.MORE}</Text>
                            )
                        })}
                    </View>

                    <View style={styles.modelView}>
                        <Text style={styles.modelTitle}>Samsung Galaxy Book</Text>
                        {book.map((item, idx) => {
                            return (
                                <Text key={idx}>{item.MODEL} {item.MORE}</Text>
                            )
                        })}
                    </View>

                </ScrollView>
            </View>

        </SafeAreaView>
    )
}


export default ModelList




const styles = StyleSheet.create({
    modelView: {
        backgroundColor: '#d9d9d9',
        borderRadius: 20,
        alignItems: 'center',
        padding: 20,
        marginBottom: 40,
    },
    modelTitle: {
        fontSize: 20,
        fontFamily: 'Pretendard-SemiBold',
        color: '#6C60F1',
        marginBottom: 20,
    },

    logoImage: {
        width: 90,
        height: 90,
    },
})