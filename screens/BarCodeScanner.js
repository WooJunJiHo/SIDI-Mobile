import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import ScannerOverlay from './ScannerOverlay';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Check if scanned data is a valid URL
    if (isURL(data)) {
      handleLink(data);
    } else {
      Alert.alert(
        'Barcode Scanned!',
        `Type: ${type}\nData: ${data}`,
        [
          { text: 'OK', onPress: () => setScanned(false) }
        ],
        { cancelable: false }
      );
    }
  };

  const isURL = (str) => {
    // Basic URL validation
    return str.startsWith('http://') || str.startsWith('https://');
  };

  const handleLink = (link) => {
    Linking.openURL(link);
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayMainText}>제품 가격 • 상태 • 그래프</Text>
          <Text style={styles.overlayText}>QR 코드 찍고 간편하게 등록하세요!</Text>
        </View>
        
        <ScannerOverlay />

      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    bottom: 140,
  },
  overlayMainText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'medium',
    marginBottom: 12,
  },
  overlayText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'medium',
  },
});

export default Scanner;
