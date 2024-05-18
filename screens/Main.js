import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ScrollView,
	StyleSheet,
	Image,
	Alert,
	RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import AnimatedNumbers from 'react-native-animated-numbers';
import Icon from 'react-native-vector-icons/Entypo'; // Entypo 아이콘 import

//패치 데이터
import { fetchUserAssets } from '../components/Fetch/FetchData';
import { filterPriceList, totalPrices, mixPlatformData } from '../components/utils/filterPriceList';

//라인 그래프
import Linechart from '../components/Linechart/LineChart';

// import PTRView from 'react-native-pull-to-refresh';


const Home = (props) => {
	const isFocused = useIsFocused();

	const [nickname, setNickname] = useState('로그인 해주세요!');

	const [priceLoad, setPriceLoad] = useState(true);
	const [asset, setAsset] = useState(null)
	const [totalPrice, setTotalPrice] = useState(0)
	const [buttonScale, setButtonScale] = useState(1);
	const [totalScale, setTotalScale] = useState(1);
	const [initialAnimationCompleted, setInitialAnimationCompleted] = useState(true); // 초기 애니메이션 완료 상태로 설정
	const [buttonColor, setButtonColor] = useState('#967DFB'); // 초기 버튼 색상 설정

	const [refreshing, setRefreshing] = useState(false);

	//그래프 데이터
	const [mixedData, setMixedData] = useState();


	const handleRefresh = async () => {
		setRefreshing(true);

		//새로고침 로직 구현

		console.log('새로고침');
		setRefreshing(false);
	};

	const handleTotalPress = () => {
		props.navigation.navigate('MyPage');
	};
	const handleTotalPress1 = () => {
		props.navigation.navigate('Explanation');
	};

	useEffect(() => {
		const fetchUser = async () => {

			const user = await AsyncStorage.getItem('@user');

			if (user !== null) {
				setPriceLoad(true)
				const assetData = await AsyncStorage.getItem('@assetData');
				const scrapData = await AsyncStorage.getItem('@priceData');

				const assetList = JSON.parse(assetData)
				setAsset(assetList)

				if (assetList.length != 0) {
					const BJFilteredList = JSON.parse(scrapData).filter((item) => item.PLATFORM == "번개장터")
					const JNFilteredList = JSON.parse(scrapData).filter((item) => item.PLATFORM == "중고나라")

					const BJPrice = filterPriceList(BJFilteredList, `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`, assetList[0].CONDITIONS)
					const JNPrice = filterPriceList(JNFilteredList, `${assetList[0].COMPANY} ${assetList[0].MODEL} ${assetList[0].MORE}`, assetList[0].CONDITIONS)

					const platformMix = await mixPlatformData(BJPrice, JNPrice)

					setMixedData(platformMix)
				}


				setPriceLoad(false)

			}

			if (user !== null) {
				setNickname(JSON.parse(user).nickname);

				const priceData = await fetchUserAssets(JSON.parse(user))

				if (priceData != 0) {
					const totalValue = totalPrices(priceData)
					if (totalValue != null) {
						setTotalPrice(totalValue)
					}
				}
			}
		};


		fetchUser();

	}, [isFocused]);


	const handleButton2Release = () => {
		Alert.alert(
			'자산 등록을 시작합니다!',
			`방식을 선택해주세요`,
			[
				{
					text: 'QR Scan', onPress: () => {
						props.navigation.navigate('Scan')
					}
				},
				{ text: '사진 촬영', onPress: () => props.navigation.navigate('MyPage', {screen: 'AssetsAdd'}) },
			],
			{ cancelable: true }
		);
	};


	return (

		<SafeAreaView style={{ flex: 1 }} >
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
					/>
				}
			>
				<View style={styles.container}>
					<View style={styles.userSection}>
						<TouchableOpacity
							onPress={() => {
								AsyncStorage.removeItem('@user');
							}}
						>
							<Text style={styles.userText}>{nickname}</Text>
						</TouchableOpacity>
					</View>

					<View style={[styles.section, { height: 200, backgroundColor: 'rgba(255, 255, 255, 0)' }]}>
						<Swiper
							style={styles.wrapper}
							loop={true}
							showsPagination={true}
							horizontal={true}
							paginationStyle={{ top: -120, right: -280 }}
							autoplay={true}
							autoplayTimeout={3}
						>
							<View>
								<View style={[styles.section1, { height: 200 }]}>
									<View style={styles.explanation}>
										<Text style={styles.explanationSubText}>
											실물 자산을 편하게 관리하는 방법!
										</Text>
										<Text style={styles.explanationMainText}>
											SIDI 사용 방법을 알려드립니다
										</Text>
									</View>
									<Image
										source={require('../assets/icons/Man.png')}
										style={styles.illustration}
									/>
									<TouchableWithoutFeedback onPress={handleTotalPress1} >

										<View
											onTouchStart={() => {
												setButtonScale(0.95);
												// 스케일이 줄어들 때 배경색 변경
												setButtonColor('#745FC6');
											}}
											onTouchEnd={() => {
												setButtonScale(1);
												// 스케일이 다시 원래대로 돌아올 때 배경색 원래 색상으로 변경
												setButtonColor('#967DFB'); // 원래 색상으로 변경
											}}
											style={[styles.howButton, { transform: [{ scale: buttonScale }], backgroundColor: buttonColor }]}
										>
											<Text style={styles.howText}>방법 보러가기</Text>
										</View>
									</TouchableWithoutFeedback>

								</View>
							</View>

							<View>
								<View style={[styles.section1, { height: 200 }]}>
									<View style={styles.explanation}>
										<Text style={styles.explanationSubText}>테스트 1</Text>
										<Text style={styles.explanationMainText}>테스트 2</Text>
									</View>
									<Image
										source={require('../assets/icons/Man.png')}
										style={styles.illustration}
									/>

									<View
										onTouchStart={() => {
											setButtonScale(0.95);
											// 스케일이 줄어들 때 배경색 변경
											setButtonColor('#745FC6');
										}}
										onTouchEnd={() => {
											setButtonScale(1);
											// 스케일이 다시 원래대로 돌아올 때 배경색 원래 색상으로 변경
											setButtonColor('#967DFB'); // 원래 색상으로 변경
										}}
										style={[styles.howButton, { transform: [{ scale: buttonScale }], backgroundColor: buttonColor }]}
									>
										<Text style={styles.howText}>방법 보러가기</Text>
									</View>
								</View>
							</View>
						</Swiper>
					</View>

					<View style={styles.section}>
						<TouchableWithoutFeedback onPress={handleTotalPress} >
							<View
								onTouchStart={() => setTotalScale(0.95)}
								onTouchEnd={() => setTotalScale(1)}
								style={[
									styles.sectioninside,
									{
										height: 80,
										top: 8,
										flexDirection: 'row',
										alignItems: 'center',
										transform: [{ scale: totalScale }],
										backgroundColor: totalScale === 0.95 ? '#F5F5F5' : '#FFFFFF',
									}
								]}
							>
								<View style={styles.assetsContainer}>
									<Image
										source={require('../assets/icons/Pig.png')}
										style={styles.totalAssetsImage}
									/>
								</View>
								<View style={{ width: '60%', left: 24, height: '90%' }}>
									<Text style={styles.totalSubText1}>
										총 자산{'\n'}
									</Text>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										{initialAnimationCompleted && (
											<AnimatedNumbers
												includeComma
												animateToNumber={totalPrice}
												fontStyle={styles.totalMainText}
											/>
										)}
										<Text style={{ marginLeft: 5, fontSize: 18, fontFamily: 'Pretendard-SemiBold' }}>원</Text>

									</View>
								</View>

								<Icon
									name="chevron-small-right"
									size={24}
									color="#767676"
									style={styles.totalShortcutIcon}
								/>
							</View>
						</TouchableWithoutFeedback>
					</View>

					<View style={[styles.section, { height: 330 }]}>
						<Image
							source={require('../assets/icons/Graph.png')}
							style={styles.totalGraphImage}
						/>
						<Text style={styles.totalText}>총 자산 그래프</Text>
						{priceLoad == false && asset.length != 0 ?
							<Linechart ptData={mixedData} /> :
							<TouchableOpacity 
								style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
								onPress={handleButton2Release}
							>
								<Text style={styles.userText}>자산 등록하러 가기!</Text>
							</TouchableOpacity>
						}
					</View>
				</View>
				<View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row' }}>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<TouchableOpacity
							onPress={() => {
								props.navigation.navigate('ModelList');
							}}
						>
							<View style={styles.firstSmallSection}>
								<Image
									source={require('../assets/icons/QRcode-Hand.png')}
									style={styles.BottomImage}
								/>
								<Text style={styles.smallsectionText}>지원 가능 {'\n'}기종 보기</Text>
							</View>
						</TouchableOpacity>

						<View style={styles.smallSection}>
							<Image
								source={require('../assets/icons/QRcode-Hand.png')}
								style={styles.BottomImage}
							/>
							<Text style={styles.smallsectionText}>QR 코드 {'\n'}간단 등록</Text>
						</View>
						<View style={styles.smallSection}>
							<Image
								source={require('../assets/icons/Check.png')}
								style={styles.BottomImage}
							/>
							<Text style={styles.smallsectionText}>시세 {'\n'}그래프 확인</Text>
						</View>
						<View style={styles.smallSection}>
							<Image
								source={require('../assets/icons/Phone.png')}
								style={styles.BottomPhoneImage}
							/>
							<Text style={styles.smallsectionText}>내 자산 {'\n'}모아보기</Text>
						</View>
						<View style={styles.lastSmallSection}>
							<Image
								source={require('../assets/icons/Pen.png')}
								style={styles.BottomImage}
							/>
							<Text style={styles.smallsectionText}>중고 거래글 {'\n'}작성 AI</Text>
						</View>
					</ScrollView>
				</View>
			</ScrollView>
		</SafeAreaView >
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	wrapper: {
		overflow: 'hidden',
	},
	section: {
		width: '91%',
		height: 95,
		borderRadius: 20,
		marginBottom: 12,
		backgroundColor: '#FFFFFF',
	},
	smallSection: {
		width: 120,
		height: 120,
		borderRadius: 20,
		marginBottom: 12,
		backgroundColor: '#FFFFFF',
		marginRight: 12,
	},
	firstSmallSection: {
		width: 120,
		height: 120,
		borderRadius: 20,
		marginBottom: 12,
		backgroundColor: '#FFFFFF',
		left: 16,
		marginRight: 28,
	},
	lastSmallSection: {
		width: 120,
		height: 120,
		borderRadius: 20,
		marginBottom: 12,
		backgroundColor: '#FFFFFF',
		right: 16,
		marginLeft: 16,
	},
	section1: {
		width: '100%',
		height: 95,
		borderRadius: 20,
		marginBottom: 20,
		backgroundColor: '#FFFFFF',
	},
	sectioninside: {
		width: '96%',
		borderRadius: 20,
		backgroundColor: '#FFFFFF',
		elevation: 2,
		alignSelf: 'center',
	},
	userSection: {
		flexDirection: 'row',
		width: '91%',
		height: 70,
		alignItems: 'center',
	},
	userText: {
		fontSize: 20,
		fontFamily: 'Pretendard-SemiBold',
		color: '#111111'
	},
	explanation: {},
	explanationSubText: {
		position: 'absolute',
		color: '#767676',
		fontFamily: 'Pretendard-Light',
		fontSize: 14,
		left: 20,
		top: 20,
	},
	explanationMainText: {
		position: 'absolute',
		fontSize: 18,
		left: 20,
		color: '#111111',
		top: 40,
		fontFamily: 'Pretendard-SemiBold',
	},
	illustration: {
		position: 'absolute',
		bottom: 0,
		right: 240,
		width: 100,
		height: 100,
	},
	howButton: {
		position: 'absolute',
		justifyContent: 'center',
		width: 90,
		height: 36,
		borderRadius: 20,
		backgroundColor: '#6C60F1',
		right: 20,
		bottom: 20,
	},
	howText: {
		color: '#FFFFFF',
		fontSize: 12,
		fontFamily: 'Pretendard-SemiBold',
		textAlign: 'center',
		lineHeight: 40,
	},
	totalImage: {
		borderRadius: 100,
		width: 50,
		height: 50,
		Left: 20,
		Right: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	totalAssetsImage: {
		alignSelf: 'center',
		position: 'absolute',
		width: 90,
		height: 90,
	},
	totalSubText1: {
		color: '#111111',
		fontSize: 18,
		fontFamily: 'Pretendard-Regular',
		top: 14,
	},
	totalMainText: {
		fontFamily: 'Pretendard-SemiBold',
		fontSize: 18,
	},
	assetsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: 50,
		height: 50,
		borderRadius: 100,
		left: 14,
	},
	totalShortcutIcon: {
		marginTop: 1,
		position: 'absolute',
		right: 10,
	},
	totalText: {
		fontSize: 18,
		fontFamily: 'Pretendard-SemiBold',
		left: 54,
		top: -18,
	},
	totalGraphImage: {
		top: 10,
		left: 10,
		width: 40,
		height: 40,
	},
	smallsectionText: {
		fontSize: 18,
		fontFamily: 'Pretendard-SemiBold',
		left: 14,
		top: 34,
	},
	BottomImage: {
		width: 30,
		height: 30,
		left: 14,
		top: 14,
	},
	BottomPhoneImage: {
		width: 40,
		height: 30,
		top: 14,
	},
});
