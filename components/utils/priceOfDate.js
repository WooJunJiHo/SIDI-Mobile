export const priceOfDate = (data) => {
    // 날짜별로 그룹화
    const groupedData = data.reduce((acc, curr) => {
        const date = new Date(curr.DATE).toLocaleDateString('ko-KR');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedData).sort((a, b) => {
        // a와 b를 문자열로 비교하여 정렬
        return a.localeCompare(b);
    });

    // 정렬된 날짜를 기준으로 데이터를 가져와 새로운 배열에 저장
    const sortedData = [];
    sortedDates.forEach(date => {
        groupedData[date].forEach(item => {
            sortedData.push(item);
        });
    });

    // 각 그룹의 가격 평균 계산 및 데이터 변환
    const convertedData = [];
    let previousAveragePrice = null;
    for (const date of sortedDates) {
        const prices = groupedData[date].map(item => item.PRICE);
        const averagePrice = prices.length > 0 ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length / 1000) * 1000 : previousAveragePrice;
        previousAveragePrice = averagePrice; // 현재 날짜의 평균값을 다음 날짜의 이전값으로 설정
        convertedData.push({ value: averagePrice, date: date });
    }

    return convertedData;
}


//변동률 구하기
export const persentOfDate = (today, yesterday) => {
    const changePercentage = ((today[0].value - yesterday[0].value) / yesterday[0].value) * 100;
    return changePercentage.toFixed(2);
}



//전일 데이터가 존재하지 않을 때
export const notFoundYseterday = (date) => {
    const yesterdayDate = new Date(date);
    yesterdayDate.setDate(date.getDate() - 1);
    return yesterdayDate
}