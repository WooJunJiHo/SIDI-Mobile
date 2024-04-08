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
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: 'white',
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: 'white',
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: 'white',
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: 'white',
  },
  plusSignVertical: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 5,
    height: 20,
    backgroundColor: 'green',
    transform: [{ translateX: -2.5 }, { translateY: -10 }],
  },
  plusSignHorizontal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 5,
    backgroundColor: 'green',
    transform: [{ translateX: -10 }, { translateY: -2.5 }],
  },
});

export default ScannerOverlay;
