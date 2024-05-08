import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Alarm = (props) => {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

  const [pressedIndex, setPressedIndex] = useState(null); // 눌린 알림의 인덱스

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user");
        if (userData !== null) {
          const user = JSON.parse(userData);
          setUserInfo(user);
        } else {
          // 사용자 정보가 없을 때 처리할 부분
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Text style={styles.mainTitle}>알림</Text>

      <ScrollView>
        <View style={styles.listSection}>
          {list.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.alarmView,
                pressedIndex === idx && styles.pressedAlarmView
              ]}
              onTouchStart={() => setPressedIndex(idx)}
              onTouchEnd={() => setPressedIndex(null)}
            >
              <View>

              </View>
              <Image style={styles.alarmImage} source={{ uri: userInfo.profileImg }} />
              <Text style={styles.alarmText}>
              <Text style={styles.highlightText}>{userInfo.nickname}</Text> 님이 <Text style={styles.highlightText}>아이폰 12</Text> 자산을 추가했습니다.
              </Text>
              <Text style={styles.alarmDate}>17시간</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Alarm;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    textAlign: 'center',
    marginTop: 30,
  },
  listSection: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  alarmView: {
    width: '100%',
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2, // 그림자 효과
    transitionDuration: 150,
    transitionProperty: 'transform',
  },
  pressedAlarmView: {
    transform: [{ scale: 0.95 }], // 눌렸을 때 스케일 줄이기
    backgroundColor: '#F5F5F5', // 선택된 부분의 배경색
  },
  alarmImage: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    marginRight: 12,
    left: 20,
  },
  alarmText: {
    width: '66%',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    left: 20,
  },
  highlightText: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#111111',
  },
  alarmDate: {
    color: '#767676',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    position: 'absolute',
    right: 20,
  },
});
