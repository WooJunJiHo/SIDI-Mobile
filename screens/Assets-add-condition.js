import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

//db로드
import { addAsset, fetchQR, updateAssetImage, fetchAssetsImages } from '../components/Fetch/FetchData'

//keys
import { keys } from '../env';

//price 필터링
import { filterPriceList } from '../components/utils/filterPriceList';



const AssetsAddCondition = (props) => {
    const isFocused = useIsFocused();

    const { params } = props.route;
    const asset = params ? params.asset : null;
    const rgb = params ? params.rgb : null;

    const [load, setLoad] = useState(false)
    const [addID, setAddID] = useState(null)
    const [user, setUser] = useState(null)
    const [priceList, setPriceList] = useState(null)
    const [imageList, setImageList] = useState(null)
    const [assetList, setAssetList] = useState(null)


    //사용자 정보 로드
    useEffect(() => {
        const fetchLogin = async () => {
            setLoad(true)
            const users = await AsyncStorage.getItem("@user");
            const imageData1 = await fetchAssetsImages(JSON.parse(users).userID)
            await AsyncStorage.setItem("@imageData", JSON.stringify(imageData1));
            const imageData = await AsyncStorage.getItem("@imageData");
            const priceData = await AsyncStorage.getItem("@priceData");
            const assetData = await AsyncStorage.getItem("@assetData");
            setUser(JSON.parse(users))
            setPriceList(JSON.parse(priceData))
            setImageList(JSON.parse(imageData))
            setAssetList(JSON.parse(assetData))
            setLoad(false)
        }
        fetchLogin()
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>상태 체크 페이지</Text>
            <TouchableOpacity
                onPress={() => {
                    setLoad(true)
                    const fetchPrice = async () => {
                        const addResult = await addAsset({
                            index: asset.index,
                            COMPANY: asset.COMPANY,
                            MODEL: asset.MODEL,
                            MORE: asset.MORE,
                            CATEGORY: asset.CATEGORY,
                            RGB: rgb.RGB,
                            COLOR: rgb.color
                        });
                        //console.log(`${asset.COMPANY} ${asset.MODEL} ${asset.MORE}`)
                        const filteredList = filterPriceList(priceList, `${asset.COMPANY} ${asset.MODEL} ${asset.MORE}`)
                        await fetchQR({
                            userID: user.userID,
                            assetID: addResult.id,
                            price: filteredList[filteredList.length - 1].value,
                        })
                        await updateAssetImage(`${keys.flaskURL}/image_m`, user.userID, 1, addResult.id)
                        await imageList.push({ url: `${keys.flaskURL}/image_m`, name: `${addResult.id}_1.jpeg`, assetID: `${addResult.id}`, imageNumber: `1` })
                        await AsyncStorage.setItem("@imageData", JSON.stringify(imageList));
                        await assetList.push({AssetsID: addResult.id, COMPANY: asset.COMPANY, MODEL: asset.MODEL, MORE: asset.MORE, COLOR: rgb.color, GPTCONTENT: null, UserID: user.userID, CategoryID: asset.CATEGORY, PRICE: filteredList[filteredList.length - 1].value, DATE: new Date()})
                        await AsyncStorage.setItem("@assetData", JSON.stringify(assetList));
                        setLoad(false)
                        props.navigation.navigate('MyPageMain')
                    }
                    fetchPrice()
                }}
            >
                <Text>등록하기</Text>
            </TouchableOpacity>
        </View>
    )
}



export default AssetsAddCondition