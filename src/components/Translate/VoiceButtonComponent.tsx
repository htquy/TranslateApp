import {View, Text, TouchableOpacity, StyleSheet, Easing} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {appColors} from '../../constants/appColors';
import {MicrophoneImage} from '../../assets/svgs';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface voiceButtonProps {
  isRecording: boolean;
  setIsRecording: Function;
}

const VoiceButtonComponent = ({
  isRecording,
  setIsRecording,
}: voiceButtonProps) => {
  return (
    <Animated.View style={[styles.container]}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: appColors.primary,
            padding: 16,
            borderRadius: 80,
            borderColor: appColors.primaryBlur2,
            width: 80,
            height: 80,
          },
        ]}
        onPress={() => {
          setIsRecording((prev: any) => !prev);
        }}>
        {isRecording ? (
          <View
            style={{
              width: 26,
              height: 26,
              backgroundColor: appColors.white,
              margin: 10,
            }}></View>
        ) : (
          <MicrophoneImage color={appColors.primary} width={46} height={46} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.primaryBlur2,
    borderRadius: 80,
    borderColor: appColors.primaryBlur2,
    transform: [{scale: 1}],
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripler: {
    backgroundColor: 'rgba(125,244,102,0.3)',
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default VoiceButtonComponent;
