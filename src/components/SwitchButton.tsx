import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {CoinImage, TranslateImage} from '../assets/svgs';
import {appColors} from '../constants/appColors';
import {useFeatureContext} from '../context/FeatureContext';

const SwitchButton = () => {
  const {currentFeature, setCurrentFeature} = useFeatureContext();

  const toggleFeature = () => {
    if (currentFeature.id === 1) {
      setCurrentFeature({id: 2, title: 'Currency'});
    } else {
      setCurrentFeature({id: 1, title: 'Translate'});
    }
  };

  return (
    <View style={{flex: 1, marginHorizontal: 16}}>
      <View style={styles.container}>
        <View
          style={[
            styles.buttonWrap,
            {flexDirection: currentFeature.id === 1 ? 'row' : 'row-reverse'},
          ]}>
          <TouchableOpacity style={styles.mainButton}>
            {currentFeature.id === 1 ? (
              <TranslateImage color={appColors.white} />
            ) : (
              <CoinImage color={appColors.white} />
            )}
            <Text style={styles.text}>{currentFeature.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subButton}
            onPress={() => toggleFeature()}>
            {currentFeature.id === 2 ? (
              <TranslateImage color={appColors.primary} />
            ) : (
              <CoinImage color={appColors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.primaryBlur2,
    height: 80,
    borderRadius: 40,
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    padding: 10,
    justifyContent: 'space-between',
  },
  mainButton: {
    backgroundColor: appColors.primary,
    borderRadius: 40,
    width: '80%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subButton: {
    backgroundColor: appColors.primaryBlur1,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: appColors.white,
    fontSize: 20,
    marginLeft: 12,
  },
});

export default SwitchButton;
