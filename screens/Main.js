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
  Dimensions,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import AnimatedNumbers from 'react-native-animated-numbers';
import Icon from 'react-native-vector-icons/Entypo'; // Entypo 아이콘 import

const Home = (props) => {
  const isFocused = useIsFocused();
  const [nickname, setNickname] = useState('로그인 해주세요!');
  const [buttonScale, setButtonScale] = useState(1);
  const [totalScale, setTotalScale] = useState(1);
  const [animateToNumber, setAnimateToNumber] = useState(1000000 - 64732);
  const [initialAnimationCompleted, setInitialAnimationCompleted] = useState(true); // 초기 애니메이션 완료 상태로 설정
  const [buttonColor, setButtonColor] = useState('#6C60F1'); // 초기 버튼 색상 설정

  const increase = () => {
    setAnimateToNumber(animateToNumber + 64732);
  };

  const decrease = () => {
    setAnimateToNumber(animateToNumber - 64732);
  };

  const doubledecrease = () => {
    setAnimateToNumber(animateToNumber - 64732 * 2);
  };

  const handleTotalPress = () => {
    props.navigation.navigate('MyPage');
    doubledecrease();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem('@user');

      if (user !== null) {
        setNickname(JSON.parse(user).nickname);
      }
    };

    const unsubscribeBlur = props.navigation.addListener('blur', () => {
      decrease();
    });

    fetchUser();

    const timer = setTimeout(() => {
      increase();
    }, 1);

  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.userSection}>
          <Text style={styles.userText}>{nickname}</Text>
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
                  source={require('../assets/icons/illustration.png')}
                  style={styles.illustration}
                />

                <View
                  onTouchStart={() => {
                    setButtonScale(0.95);
                    // 스케일이 줄어들 때 배경색 변경
                    setButtonColor('#423A7A'); // 어두운 색상으로 변경
                  }}
                  onTouchEnd={() => {
                    setButtonScale(1);
                    // 스케일이 다시 원래대로 돌아올 때 배경색 원래 색상으로 변경
                    setButtonColor('#6C60F1'); // 원래 색상으로 변경
                  }}
                  style={[styles.howButton, { transform: [{ scale: buttonScale }], backgroundColor: buttonColor }]}
                >
                  <Text style={styles.howText}>방법 보러가기</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={[styles.section1, { height: 200 }]}>
                <View style={styles.explanation}>
                  <Text style={styles.explanationSubText}>테스트 1</Text>
                  <Text style={styles.explanationMainText}>테스트 2</Text>
                </View>
                <Image
                  source={require('../assets/icons/illustration.png')}
                  style={styles.illustration}
                />

                <View
                  onTouchStart={() => {
                    setButtonScale(0.95);
                    // 스케일이 줄어들 때 배경색 변경
                    setButtonColor('#423A7A'); // 어두운 색상으로 변경
                  }}
                  onTouchEnd={() => {
                    setButtonScale(1);
                    // 스케일이 다시 원래대로 돌아올 때 배경색 원래 색상으로 변경
                    setButtonColor('#6C60F1'); // 원래 색상으로 변경
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
                  source={require('../assets/icons/Hand-Icon.png')}
                  style={styles.totalAssetsImage}
                />
              </View>
              <View style={{ width: '60%', left: 30, height: '90%' }}>
                <Text style={styles.totalSubText1}>
                  총 자산{'\n'}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {initialAnimationCompleted && (
                    <AnimatedNumbers
                      includeComma
                      animateToNumber={animateToNumber}
                      fontStyle={styles.totalMainText}
                    />
                  )}
                  <Text style={{ marginLeft: 5, fontSize: 18, fontFamily: 'Pretendard-SemiBold' }}>원</Text>

                  {/* increase 버튼이 없으면 돌아가지 않아서 화면에 나오지 않게만 처리 */}
                  <View style={{ width: 1, height: 20 }}>
                    <Button title="increase" onPress={increase} />
                  </View>

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

        <View style={[styles.section, { height: 300 }]}>
          <Image
            source={require('../assets/icons/GraphImage.png')}
            style={styles.totalGraphImage}
          />
          <Text style={styles.totalText}>총 자산 그래프</Text>
        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
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
    fontFamily: 'Pretendard-light',
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
    fontFamily: 'Pretendard-Regular',
  },
  illustration: {
    position: 'absolute',
    bottom: 0,
    right: 260,
    width: 60,
    height: 80,
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
    backgroundColor: '#6C60F1',
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
    fontFamily: 'Pretendard-Regular',
    left: 50,
    top: 0,
  },
  totalGraphImage: {
    top: 20,
    left: 20,
  },
});
