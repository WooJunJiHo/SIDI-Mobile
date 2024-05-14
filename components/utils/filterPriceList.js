export const filterPriceList = (list, asset) => {
    // 예측된 모델 필터링   
    const modelList = list.filter((item) => item.AssetsName == asset);

    // 날짜를 기준으로 오름차순으로 정렬
    modelList.sort((a, b) => new Date(a.DATE) - new Date(b.DATE));

    // 빈 날짜 채우기
    const filledData = [];
    const earliestDate = new Date(modelList[0].DATE);
    const latestDate = new Date(modelList[modelList.length - 1].DATE);

    let currentDate = new Date(earliestDate);


    //오류
    while (currentDate <= latestDate) {
        const currentDateISO = currentDate.toISOString();
        const existingData = modelList.find(item => item.DATE === currentDateISO);

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
        const dateKey = new Date(item.DATE).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
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



//금일 가격 구하기
export const priceAverage = (list) => {
    // 평균 가격 구하기
    const totalValue = list.reduce((acc, cur) => acc + cur.value, 0);
    const averageValue = totalValue / list.length;

    // 100원 단위에서 반올림
    const roundedAverageValue = Math.round(averageValue / 100) * 100;

    return roundedAverageValue
}


//총 금액 계산
export const totalPrices = (list) => {
    // 모든 가격을 합산
    const totalPrice = list.reduce((acc, item) => {
        // 가격이 존재하는 경우에만 합산
        if (item.PRICE !== null && typeof item.PRICE === 'number') {
            acc += item.PRICE;
        }
        return acc;
    }, 0);

    return totalPrice
}


//배열에서 가장 비싼 값 찾기
export function subtractMaxValue(data) {
    // 데이터에서 value 속성만 추출하여 배열로 만듭니다.
    const values = data.map(item => item.value);
    
    // 배열에서 최대값을 찾습니다.
    const maxValue = Math.max(...values);
    
    return maxValue;
}



//전일 기준 변동 퍼센테이지
export const todayPersent = (data) => {
    return {
        BJ: Math.round(((data.BJPrice[data.BJPrice.length-1].value - data.BJPrice[data.BJPrice.length-2].value) / data.BJPrice[data.BJPrice.length-2].value) * 100),
        JN: Math.round(((data.JNPrice[data.JNPrice.length-1].value - data.JNPrice[data.JNPrice.length-2].value) / data.JNPrice[data.JNPrice.length-2].value) * 100),
    }
}