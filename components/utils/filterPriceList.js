export const filterPriceList = (list, asset) => {

    // 예측된 모델 필터링   
    const modelList = list.filter((item) => item.AssetsName == asset)

    // 날짜를 기준으로 오름차순으로 정렬
    modelList.sort((a, b) => new Date(a.DATE) - new Date(b.DATE));


    // 빈 날짜 채우기
    const filledData = [];
    const earliestDate = new Date(modelList[0].DATE);
    const latestDate = new Date(modelList[modelList.length - 1].DATE);

    let currentDate = new Date(earliestDate);

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


    // 변환된 데이터
    const transformedData = filledData.map(item => ({
        value: item.PRICE,
        date: new Date(item.DATE).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }));

    return transformedData;
}



export const priceAverage = (list) => {
    // 평균 가격 구하기
    const totalValue = list.reduce((acc, cur) => acc + cur.value, 0);
    const averageValue = totalValue / list.length;

    // 100원 단위에서 반올림
    const roundedAverageValue = Math.round(averageValue / 100) * 100;

    return roundedAverageValue
}