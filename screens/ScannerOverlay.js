import React from 'react';
import { View, StyleSheet } from 'react-native';

const ScannerOverlay = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.rectangleContainer}>
        <View style={styles.topLeftCorner} />
        <View style={styles.topRightCorner} />
        <View style={styles.bottomLeftCorner} />
        <View style={styles.bottomRightCorner} />
        <View style={styles.plusSignVertical} />
        <View style={styles.plusSignHorizontal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    top: 100
  },
  rectangleContainer: {
    width: 200,
    height: 200,
    borderWidth: 0,
    borderColor: 'white',
    position: 'relative',
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
  },
  plusSignVertical: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 3,
    height: 20,
    backgroundColor: 'white',
    transform: [{ translateX: -1.5 }, { translateY: -10 }],
  },
  plusSignHorizontal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 3,
    backgroundColor: 'white',
    transform: [{ translateX: -10 }, { translateY: -1.5 }],
  },
});

export default ScannerOverlay;
