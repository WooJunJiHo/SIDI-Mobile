import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Linking } from 'react-native';
import { Camera } from 'expo-camera';

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
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
});

export default Scanner;
