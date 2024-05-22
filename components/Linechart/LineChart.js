import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 데이터 필터링 
import { subtractMaxValue, subtractMinValue, getFirstAndLastDate } from '../utils/filterPriceList';

const Chart = (props) => {
    let ptData = props.ptData ? props.ptData : null;
    const ptDatas = props.ptDatas ? props.ptDatas : null;

    const [maxValue, setMaxValue] = useState(0);
    const [minValue, setMinValue] = useState(0);

    useEffect(() => {
        handlePeriodSelect('번개장터');
    }, [ptDatas]);

    const [selectedPeriod, setSelectedPeriod] = useState('번개장터');
    const [chartData, setChartData] = useState([]);
    const [chartSpacing, setChartSpacing] = useState(0);
    const [isPressedBungae, setIsPressedBungae] = useState(false);
    const [isPressedJoongna, setIsPressedJoongna] = useState(false);
    const [isPressedCarrot, setIsPressedCarrot] = useState(false);

    // 첫 번째 날짜와 마지막 날짜 가져오기
    const { firstDate, lastDate } = getFirstAndLastDate(chartData);

    const handlePeriodSelect = (period) => {
        setSelectedPeriod(period);
        let newData = [];
        let newSpacing = 0;
        let newMaxValue = 0;
        let newMinValue = 0;

        switch (period) {
            case '번개장터':
                if (ptDatas != null) {
                    newData = ptDatas.BJPrice;
                    newSpacing = ((width * 0.9) / newData.length);
                    newMaxValue = subtractMaxValue(ptDatas.BJPrice);
                    newMinValue = subtractMinValue(ptDatas.BJPrice);
                } else {
                    newData = ptData;
                    newSpacing = ((width * 0.9) / newData.length);
                    newMaxValue = subtractMaxValue(ptData);
                    newMinValue = subtractMinValue(ptData);
                }
                break;
            case '중고나라':
                if (ptDatas != null) {
                    newData = ptDatas.JNPrice;
                    newSpacing = ((width * 0.9) / newData.length);
                    newMaxValue = subtractMaxValue(ptDatas.JNPrice);
                    newMinValue = subtractMinValue(ptDatas.JNPrice);
                }
                break;
            case '당근마켓':
                if (ptDatas != null) {
                    if (ptDatas.DJPrice == undefined) {
                        newData = ptDatas.BJPrice;
                        newSpacing = ((width * 0.9) / newData.length);
                        newMaxValue = subtractMaxValue(ptDatas.BJPrice);
                        newMinValue = subtractMinValue(ptDatas.BJPrice);
                    } else {
                        newData = ptDatas.DJPrice;
                        newSpacing = ((width * 0.9) / newData.length);
                        newMaxValue = subtractMaxValue(ptDatas.DJPrice);
                        newMinValue = subtractMinValue(ptDatas.DJPrice);
                    }
                }
                break;
            default:
                if (ptData != null) {
                    newData = ptData;
                } else {
                    newData = ptDatas.BJPrice;
                }
                newSpacing = ((width * 0.9) / newData.length);
                newMaxValue = subtractMaxValue(newData);
                newMinValue = subtractMinValue(newData);
        }

        setChartData(newData);
        setChartSpacing(newSpacing);
        setMaxValue(newMaxValue);
        setMinValue(newMinValue);
    };

    const handlePressInBungae = () => {
        // 번개장터 버튼이 눌렸을 때 스케일을 줄입니다.
        setIsPressedBungae(true);
    };

    const handlePressOutBungae = () => {
        // 번개장터 버튼에서 손을 뗐을 때 스케일을 원래대로 돌려놓습니다.
        setIsPressedBungae(false);
        props.onPlatformSelect('번개장터');
    };

    const handlePressInJoongna = () => {
        // 중고나라 버튼이 눌렸을 때 스케일을 줄입니다.
        setIsPressedJoongna(true);
    };

    const handlePressOutJoongna = () => {
        // 중고나라 버튼에서 손을 뗐을 때 스케일을 원래대로 돌려놓습니다.
        setIsPressedJoongna(false);
        props.onPlatformSelect('중고나라');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ borderRadius: 0, width: '100%', alignSelf: 'center', height: 50, marginTop: 8 }}>
                <View style={{ position: 'absolute', left: 10, alignItems: 'flex-start', marginTop: 0 }}>
                    <Text style={styles.dateText}>기간 · {firstDate && firstDate.slice(0, -4)} ~ {lastDate && lastDate.slice(0, -4)}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.maxValueText}>최고 · {maxValue}원</Text>
                        <Text style={styles.minValueText}>최저 · {minValue}원</Text>
                    </View>
                </View>
            </View>

            <LineChart
                style={styles.chart}
                areaChart
                data={chartData}
                rotateLabel={false}
                width={width}
                hideDataPoints={true}
                spacing={chartSpacing}
                rulesType="none"
                color="#00FF80"
                thickness={4}
                startOpacity={0}
                endOpacity={0}
                initialSpacing={36}
                noOfSections={6}
                maxValue={maxValue + (maxValue * 1.4)}
                yAxisThickness={0}
                rulesColor="#fafafa"
                xAxisThickness={0}
                xAxisLabelsHeight={20}
                yAxisLabelWidth={0}
                yAxisSide='right'
                xAxisColor="#111111"
                disableScroll={true}
                lineGradient={true}
                lineGradientStartColor='#CE9FFC'
                lineGradientEndColor='#967DFB'
                pointerConfig={{
                    pointerStripHeight: 150,
                    pointerStripColor: '#6C60F1',
                    pointerStripWidth: 2,
                    pointerColor: '#6C60F1',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    alignItems: 'center',
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        return (
                            <View style={{ height: 150, width: 90, justifyContent: 'center', marginTop: -50, marginLeft: -35 }}>
                                <Text style={{ color: '#111111', fontSize: 14, marginBottom: 10, textAlign: 'center', left: 0 }}>
                                    {items[0].date}
                                </Text>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, backgroundColor: '#6C60F1', width: 90 }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }}>
                                        {items[0].value + '원'}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            {!ptData ?
                <View style={{ flexDirection: 'row', bottom: 20, position: 'absolute', justifyContent: 'center', width: '100%', height: '16%', bottom: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                    <TouchableOpacity
                        onPress={() => {
                            handlePeriodSelect('번개장터');
                            props.onPlatformSelect('번개장터'); // 버튼 클릭 시 번개장터를 선택한 것으로 전달
                        }}
                        onPressIn={handlePressInBungae}
                        onPressOut={handlePressOutBungae}
                        style={[styles.dayBt, selectedPeriod === '번개장터' ? styles.selectedButton : styles.unselectedButton, { transform: [{ scale: isPressedBungae ? 0.95 : 1 }] }]}
                        activeOpacity={1}
                    >
                        <Image
                            source={require('../../assets/icons/bungaeIcon.png')}
                            style={styles.flatformImage}
                        />
                        <Text style={[styles.btText, selectedPeriod === '번개장터' ? styles.selectedButtonText : styles.unselectedButtonText]}>번개장터</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            handlePeriodSelect('중고나라');
                            props.onPlatformSelect('중고나라'); // 버튼 클릭 시 번개장터를 선택한 것으로 전달
                        }}
                        onPressIn={handlePressInJoongna}
                        onPressOut={handlePressOutJoongna}
                        style={[styles.dayBt1, selectedPeriod === '중고나라' ? styles.selectedButton : styles.unselectedButton, { transform: [{ scale: isPressedJoongna ? 0.95 : 1 }] }]}
                        activeOpacity={1}
                    >
                        <Image
                            source={require('../../assets/icons/joongna Icon.png')}
                            style={styles.flatformImage2}
                        />
                        <Text style={[styles.btText, selectedPeriod === '중고나라' ? styles.selectedButtonText : styles.unselectedButtonText]}>중고나라</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            handlePeriodSelect('당근마켓');
                            props.onPlatformSelect('당근마켓'); // 버튼 클릭 시 번개장터를 선택한 것으로 전달
                        }}
                        onPressIn={handlePressInJoongna}
                        onPressOut={handlePressOutJoongna}
                        style={[styles.dayBt2, selectedPeriod === '당근마켓' ? styles.selectedButton : styles.unselectedButton, { transform: [{ scale: isPressedCarrot ? 0.95 : 1 }] }]}
                        activeOpacity={1}
                    >
                        <Image
                            source={require('../../assets/icons/CarrotMarket.png')}
                            style={styles.flatformImage2}
                        />
                        <Text style={[styles.btText, selectedPeriod === '당근마켓' ? styles.selectedButtonText : styles.unselectedButtonText]}>당근마켓</Text>
                    </TouchableOpacity>
                </View> : <></>
            }
        </View>
    );
};

export default Chart;

const styles = StyleSheet.create({
    chart: {
        overflow: 'visible',
    },
    dayBt: {
        width: '33%',
        height: '100%',
        borderBottomLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dayBt1: {
        width: 120,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dayBt2: {
        width: 120,
        height: '100%',
        justifyContent: 'center',
        borderBottomRightRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
    },
    btText: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
    },
    selectedButton: {
        backgroundColor: '#967DFB',
    },
    unselectedButton: {
        backgroundColor: '#EDEDED',
    },
    selectedButtonText: {
        color: '#ffffff',
    },
    unselectedButtonText: {
        color: '#767676',
    },
    flatformImage: {
        width: 22,
        height: 22,
        marginRight: 6,
    },
    flatformImage2: {
        width: 20,
        height: 20,
        marginRight: 6,
    },
    maxValueText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
        color: 'red',
        left: 10,
        marginBottom: 4,
        marginRight: 8
    },
    minValueText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
        color: 'blue',
        left: 10,
        marginBottom: 0
    },
    dateText: {
        fontSize: 14,
        fontFamily: 'Pretendard-SemiBold',
        color: '#3E3E3E',
        left: 10,
        top: -8
    },
});
