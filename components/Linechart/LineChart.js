import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Chart = (props) => {
    const ptData = props.ptData

    const [selectedPeriod, setSelectedPeriod] = useState('번개장터');
    const [chartData, setChartData] = useState([]);
    const [chartSpacing, setChartSpacing] = useState((width / ptData.length) - 4.4);
    const [isPressedBungae, setIsPressedBungae] = useState(false);
    const [isPressedJoongna, setIsPressedJoongna] = useState(false);

    useEffect(() => {
        handlePeriodSelect('번개장터');
    }, []);

    const handlePeriodSelect = (period) => {
        setSelectedPeriod(period);
        let newData = [];
        let newSpacing = 0;

        switch (period) {
            case '번개장터':
                newData = ptData.slice(0, 8);
                newSpacing = (width / newData.length) - 13.0;
                break;
            case '중고나라':
                newData = ptData.slice(0, 16);
                newSpacing = (width / newData.length) - 16.0;
                break;
            default:
                newData = ptData;
                newSpacing = (width / newData.length) - 4.4;
        }

        setChartData(newData);
        setChartSpacing(newSpacing);
    };

    const handlePressInBungae = () => {
        // 번개장터 버튼이 눌렸을 때 스케일을 줄입니다.
        setIsPressedBungae(true);
    };

    const handlePressOutBungae = () => {
        // 번개장터 버튼에서 손을 뗐을 때 스케일을 원래대로 돌려놓습니다.
        setIsPressedBungae(false);
    };

    const handlePressInJoongna = () => {
        // 중고나라 버튼이 눌렸을 때 스케일을 줄입니다.
        setIsPressedJoongna(true);
    };

    const handlePressOutJoongna = () => {
        // 중고나라 버튼에서 손을 뗐을 때 스케일을 원래대로 돌려놓습니다.
        setIsPressedJoongna(false);
    };

    return (
        <View style={{ marginTop: 10, marginLeft: 18 }}>
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
                thickness={6}
                startOpacity={0}
                endOpacity={0}
                initialSpacing={36}
                noOfSections={6}
                maxValue={1500000}
                yAxisThickness={0}
                rulesColor="#fafafa"
                xAxisThickness={0}
                xAxisLabelsHeight={20}
                yAxisLabelWidth={0}
                yAxisSide='right'
                xAxisColor="#111111"
                disableScroll={true}
                curved={true}
                lineGradient={true}
                lineGradientStartColor='#CE9FFC'
                lineGradientEndColor='#7367F0'
                pointerConfig={{
                    pointerStripHeight: 150,
                    pointerStripColor: '#6C60F1',
                    pointerStripWidth: 2,
                    pointerColor: '#6C60F1',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,

                    pointerLabelComponent: items => {
                        return (
                            <View style={{ height: 150, width: 80, justifyContent: 'center', marginTop: -50, marginLeft: -25 }}>
                                <Text style={{ color: '#111111', fontSize: 14, marginBottom: 10, textAlign: 'center', left: -5 }}>
                                    {items[0].date}
                                </Text>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, backgroundColor: '#6C60F1', width: 70 }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }}>
                                        {'$' + items[0].value + '.0'}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 28, bottom: 34, right: 10 }}>
                <TouchableOpacity
                    onPress={() => handlePeriodSelect('번개장터')}
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
                    onPress={() => handlePeriodSelect('중고나라')}
                    onPressIn={handlePressInJoongna}
                    onPressOut={handlePressOutJoongna}
                    style={[styles.dayBt, selectedPeriod === '중고나라' ? styles.selectedButton : styles.unselectedButton, { transform: [{ scale: isPressedJoongna ? 0.95 : 1 }] }]}
                    activeOpacity={1}
                >
                    <Image
                        source={require('../../assets/icons/joongna Icon.png')}
                        style={styles.flatformImage2}
                    />
                    <Text style={[styles.btText, selectedPeriod === '중고나라' ? styles.selectedButtonText : styles.unselectedButtonText]}>중고나라</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Chart;

const styles = StyleSheet.create({
    chart: {
        overflow: 'visible',
    },
    dayBt: {
        width: 120,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
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
});
