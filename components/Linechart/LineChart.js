import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Chart = () => {
    const ptData = [
        { value: 140, date: '1 Apr 2022' },
        { value: 180, date: '2 Apr 2022' },
        { value: 190, date: '3 Apr 2022' },
        { value: 180, date: '4 Apr 2022' },
        { value: 140, date: '5 Apr 2022' },
        { value: 145, date: '6 Apr 2022' },
        { value: 160, date: '7 Apr 2022' },
        { value: 200, date: '8 Apr 2022' },

        { value: 220, date: '9 Apr 2022' },
        { value: 240, date: '10 Apr 2022' },
        { value: 280, date: '11 Apr 2022' },
        { value: 260, date: '12 Apr 2022' },
        { value: 340, date: '13 Apr 2022' },
        { value: 385, date: '14 Apr 2022' },
        { value: 280, date: '15 Apr 2022' },
        { value: 390, date: '16 Apr 2022' },

        { value: 370, date: '17 Apr 2022' },
        { value: 285, date: '18 Apr 2022' },
        { value: 295, date: '19 Apr 2022' },
        { value: 300, date: '20 Apr 2022' },
        { value: 280, date: '21 Apr 2022' },
        { value: 295, date: '22 Apr 2022' },
        { value: 260, date: '23 Apr 2022' },
        { value: 255, date: '24 Apr 2022' },

        { value: 190, date: '25 Apr 2022' },
        { value: 220, date: '26 Apr 2022' },
        { value: 205, date: '27 Apr 2022' },
        { value: 230, date: '28 Apr 2022' },
        { value: 210, date: '29 Apr 2022' },
        { value: 300, date: '30 Apr 2022' },

    ];

    const spacing = (width / ptData.length) - 4.4;

    return (
        <View
            style={{
                marginTop: 50,
                marginLeft: 18,
            }}>
            <LineChart
                style={styles.chart}
                areaChart
                data={ptData}
                rotateLabel={false}
                width={width}
                hideDataPoints={true}
                spacing={spacing}
                rulesType="none"
                color="#00FF80"
                thickness={6}
                startOpacity={0}
                endOpacity={0}
                initialSpacing={36}
                noOfSections={6}
                maxValue={600}
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
                    pointerStripHeight: 160,
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
                            <View
                                style={{
                                    height: 150,
                                    width: 80,
                                    justifyContent: 'center',
                                    marginTop: -50,
                                    marginLeft: -25,
                                }}>
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
        </View>
    );
};

export default Chart;

const styles = StyleSheet.create({
    chart: {
        overflow: 'visible',
    },
});