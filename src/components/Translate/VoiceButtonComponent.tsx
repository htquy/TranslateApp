import {View, Text, TouchableOpacity, StyleSheet, Easing} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {appColors} from '../../constants/appColors';
import {MicrophoneImage} from '../../assets/svgs';
import Voice from "@react-native-voice/voice";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
interface LanguageProps{
  name: string;
  code: string;
}
interface voiceButtonProps {
  isRecording: boolean;
  setIsRecording: Function;
  textToTranslate:string;
  setTexToTranslate:Function;
  sourceLanguage:LanguageProps;
}

const VoiceButtonComponent = ({
  isRecording,
  setIsRecording,
  textToTranslate,
  setTexToTranslate,
  sourceLanguage
}: voiceButtonProps) => {
  const speechStartHandler = (e:any) => {
    console.log("speechStart successful", e);
  };
    const speechEndHandler = (e:any) => {
     // setLoading(false);
      console.log("stop handler", e);
      setIsRecording(false);
    };
    const speechPartialResultsHandler = (e:any) => {
      //setIsUseVoice(true);
      console.log(true);
      const text = e.value[0];
      setTexToTranslate(text);
    };
    const startRecording = async () => {
      console.log("start ",sourceLanguage.code);

      try {
        await Voice.start(sourceLanguage.code);
      } catch (error) {
        console.log("errorStart", error);
      }
    };
    console.log(Voice.isRecognizing());
    const stopRecording = async () => {
      try {
        console.log("stop");
        await Voice.stop();
      } catch (error) {
        console.log("errorStop", error);
      }
      if(isRecording==false)setIsRecording(true);
    };
    useEffect(() => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechPartialResults=speechPartialResultsHandler;
        Voice.onSpeechEnd = speechEndHandler;
        return () => {
          console.log("destroy");
          Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);
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
          isRecording?stopRecording():startRecording();
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
