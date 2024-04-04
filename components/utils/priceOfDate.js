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

    // 각 그룹의 가격 평균 계산 및 데이터 변환
    const convertedData = [];
    for (const date in groupedData) {
        const prices = groupedData[date].map(item => item.PRICE);
        const averagePrice = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length / 1000) * 1000; // 평균 가격 계산 후 반올림
        convertedData.push({ value: averagePrice, date: date });
    }

    return sortedData;
}


export const persentOfDate = (today, yesterday) => {
    const changePercentage = ((today[0].value - yesterday[0].value) / yesterday[0].value) * 100;
    return changePercentage.toFixed(2);
}
