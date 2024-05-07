import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Chart = (props) => {
    const ptData = props.ptData

    const [selectedPeriod, setSelectedPeriod] = useState('1일');
    const [chartData, setChartData] = useState([]);
    const [chartSpacing, setChartSpacing] = useState((width / ptData.length) - 4.4);

    useEffect(() => {
        handlePeriodSelect('1일');
    }, []);

    const handlePeriodSelect = (period) => {
        setSelectedPeriod(period);
        let newData = [];
        let newSpacing = 0;

        switch (period) {
            case '1일':
                newData = ptData.slice(0, 8);
                newSpacing = (width / newData.length) - 13.0;
                break;
            case '1주':
                newData = ptData.slice(0, 16);
                newSpacing = (width / newData.length) - 8.0;
                break;
            case '1달':
                newData = ptData;
                newSpacing = (width / newData.length) - 4.4;
                break;
            default:
                newData = ptData;
                newSpacing = (width / newData.length) - 4.4;
        }

        setChartData(newData);
        setChartSpacing(newSpacing);
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
                maxValue={800000}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, bottom: 34, right: 10 }}>
                <TouchableOpacity onPress={() => handlePeriodSelect('1일')} style={[styles.dayBt, selectedPeriod === '1일' ? styles.selectedButton : styles.unselectedButton]} activeOpacity={1}>
                    <Text style={[styles.btText, selectedPeriod === '1일' ? styles.selectedButtonText : styles.unselectedButtonText]}>1일</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePeriodSelect('1주')} style={[styles.dayBt, selectedPeriod === '1주' ? styles.selectedButton : styles.unselectedButton]} activeOpacity={1}>
                    <Text style={[styles.btText, selectedPeriod === '1주' ? styles.selectedButtonText : styles.unselectedButtonText]}>1주</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePeriodSelect('1달')} style={[styles.dayBt, selectedPeriod === '1달' ? styles.selectedButton : styles.unselectedButton]} activeOpacity={1}>
                    <Text style={[styles.btText, selectedPeriod === '1달' ? styles.selectedButtonText : styles.unselectedButtonText]}>1달</Text>
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
        width: 76,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btText: {
        fontSize: 16,
        fontWeight: 'medium',
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
});
