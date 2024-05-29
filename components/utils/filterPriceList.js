/**
 * 자산명과 조건에 따라 가격 목록을 필터링하고, 빈 날짜를 채운 후
 * 동일 날짜의 가격을 평균 내어 변환된 데이터를 반환합니다.
 * 
 * @param {Array} list - 가격 데이터 객체 배열.
 * @param {string} asset - 필터링할 자산명.
 * @param {string} condition - 필터링할 조건.
 * @returns {Array} 변환된 가격 데이터 객체 배열.
 */
export const filterPriceList = (list, asset, condition) => {
    // 자산명에 따른 모델 필터링
    const modelList = list.filter((item) => item.AssetsName === asset);

    // 조건에 따른 필터링
    const conditionList = modelList.filter((item) => item.CONDITIONS === condition);

    let statList;
    if (conditionList.length === 0 || conditionList.length === 1) {
        statList = modelList;
    } else {
        statList = conditionList;
    }

    // 날짜를 기준으로 오름차순 정렬
    statList.sort((a, b) => new Date(a.DATE) - new Date(b.DATE));

    // 빈 날짜 채우기
    const filledData = [];
    const earliestDate = new Date(statList[0].DATE);
    const latestDate = new Date(statList[statList.length - 1].DATE);

    let currentDate = new Date(earliestDate);

    while (currentDate <= latestDate) {
        const currentDateISO = currentDate.toISOString();
        const existingData = statList.find(item => item.DATE === currentDateISO);

        if (existingData) {
            filledData.push(existingData);
        } else {
            const previousDay = new Date(currentDate);
            previousDay.setDate(previousDay.getDate() - 1);
            const previousDayISO = previousDay.toISOString();
            const previousData = filledData.find(item => item.DATE === previousDayISO);

            if (previousData) {
                const newData = { ...previousData, DATE: currentDateISO };
                filledData.push(newData);
            }
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    // 같은 날짜의 데이터를 합산하고 개수로 나누어 평균을 계산한 후, 평균 값을 가지고 있는 배열 생성
    const transformedData = filledData.reduce((acc, item) => {
        const dateKey = new Date(item.DATE).toLocaleDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = { totalPrice: item.PRICE, count: 1 };
        } else {
            acc[dateKey].totalPrice += item.PRICE;
            acc[dateKey].count++;
        }
        return acc;
    }, {});

    // 평균 계산 및 데이터 형식 변환
    const averagedData = Object.keys(transformedData).map(dateKey => ({
        value: transformedData[dateKey].totalPrice / transformedData[dateKey].count,
        date: dateKey
    }));

    return averagedData;
};

/**
 * 가격 데이터 객체 배열에서 평균 가격을 계산하고, 100원 단위로 반올림합니다.
 * 
 * @param {Array} list - 변환된 가격 데이터 객체 배열.
 * @returns {number} 반올림된 평균 가격.
 */
export const priceAverage = (list) => {
    // 평균 가격 구하기
    const totalValue = list.reduce((acc, cur) => acc + cur.value, 0);
    const averageValue = totalValue / list.length;

    // 100원 단위에서 반올림
    const roundedAverageValue = Math.round(averageValue / 100) * 100;

    return roundedAverageValue;
};

/**
 * 가격 데이터 객체 배열에서 총 가격을 계산합니다.
 * 
 * @param {Array} list - 가격 데이터 객체 배열.
 * @returns {number} 총 가격.
 */
export const totalPrices = (list) => {
    // 모든 가격을 합산
    const totalPrice = list.reduce((acc, item) => {
        // 가격이 존재하는 경우에만 합산
        if (item.PRICE !== null && typeof item.PRICE === 'number') {
            acc += item.PRICE;
        }
        return acc;
    }, 0);

    return totalPrice;
};

/**
 * 가격 데이터 객체 배열에서 최대 값을 찾습니다.
 * 
 * @param {Array} data - 변환된 가격 데이터 객체 배열.
 * @returns {number} 최대 가격 값.
 */
export function subtractMaxValue(data) {
    // 데이터에서 value 속성만 추출하여 배열로 만듭니다.
    const values = data.map(item => item.value);

    // 배열에서 최대값을 찾습니다.
    const maxValue = Math.max(...values);

    return maxValue;
}

/**
 * 가격 데이터 객체 배열에서 최소 값을 찾습니다.
 * 
 * @param {Array} data - 변환된 가격 데이터 객체 배열.
 * @returns {number} 최소 가격 값.
 */
export function subtractMinValue(data) {
    // 데이터에서 value 속성만 추출하여 배열로 만듭니다.
    const values = data.map(item => item.value);

    // 배열에서 최소값을 찾습니다.
    const minValue = Math.min(...values);

    return minValue;
}

/**
 * BJ, JN, DJ 가격 배열에서 전일 대비 변동 퍼센테이지를 계산합니다.
 * 
 * @param {Object} data - BJPrice, JNPrice, DJPrice 배열을 포함하는 객체.
 * @returns {Object} BJ, JN, DJ 변동 퍼센테이지.
 */
export const todayPersent = (data) => {
    let BJ;
    let JN;
    let DJ;

    if (data.BJPrice.length <= 1) {
        BJ = 0;
    } else {
        BJ = Math.round(((data.BJPrice[data.BJPrice.length - 1].value - data.BJPrice[data.BJPrice.length - 2].value) / data.BJPrice[data.BJPrice.length - 2].value) * 100);
    }
    
    if (data.JNPrice.length <= 1) {
        JN = 0;
    } else {
        JN = Math.round(((data.JNPrice[data.JNPrice.length - 1].value - data.JNPrice[data.JNPrice.length - 2].value) / data.JNPrice[data.JNPrice.length - 2].value) * 100);
    }
    
    if (data.DJPrice.length <= 1) {
        DJ = 0;
    } else {
        DJ =  Math.round(((data.DJPrice[data.DJPrice.length - 1].value - data.DJPrice[data.DJPrice.length - 2].value) / data.DJPrice[data.DJPrice.length - 2].value) * 100);
    }

    return {
        BJ: BJ,
        JN: JN,
        DJ: DJ,
    };
};

/**
 * 두 플랫폼의 데이터를 합산하여 평균을 구한 데이터를 반환합니다.
 * 
 * @param {Array} data1 - 첫 번째 가격 데이터 객체 배열.
 * @param {Array} data2 - 두 번째 가격 데이터 객체 배열.
 * @returns {Promise<Array>} 합산되고 평균화된 가격 데이터 객체 배열.
 */
export const mixPlatformData = async (data1, data2) => {
    let list1 = null;
    let list2 = null;
    if (data1.length >= data2.length) {
        list1 = data1;
        list2 = data2;
    } else {
        list1 = data2;
        list2 = data1;
    }

    let mixedData = [];
    const averageData = list1.map((item, index) => {
        let mixedValue;

        // 두 배열의 같은 날짜의 데이터를 합산
        if (list2[index] !== undefined) {
            mixedValue = (item.value + list2[index].value) / 2;
        } else {
            mixedValue = item.value;
        }

        // 합산한 데이터를 새로운 배열에 추가
        mixedData.push({
            value: mixedValue,
            date: item.date
        });
    });
    averageData;
    return mixedData;
}

/**
 * 가격 데이터 객체 배열에서 가장 이른 날짜와 가장 늦은 날짜를 반환합니다.
 * 
 * @param {Array} data - 변환된 가격 데이터 객체 배열.
 * @returns {Object} 가장 이른 날짜와 가장 늦은 날짜.
 */
export function getFirstAndLastDate(data) {
    // 데이터 배열이 비어있는 경우 빈 객체 반환
    if (data.length === 0) {
        return { firstDate: null, lastDate: null };
    }

    function parseDateString(dateString) {
        const parts = dateString.split('/');
        const year = parseInt(parts[2]);
        const month = parseInt(parts[0]) - 1; // JavaScript에서 월은 0부터 시작하므로 1을 뺍니다.
        const day = parseInt(parts[1]);
        return new Date(year, month, day);
    }

    const parsedData = data.map(item => ({
        date: parseDateString(item.date),
        value: item.value
    }));

    // 날짜순으로 정렬
    parsedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const reList = parsedData.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        value: item.value
    }));

    // 가장 이른 날짜와 가장 늦은 날짜 반환
    const firstDate = reList[0].date;
    const lastDate = reList[reList.length - 1].date;

    return { firstDate, lastDate };
}
