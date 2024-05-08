import {Dimensions, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './MainScreen.style';
import SwitchButton from '../../components/SwitchButton';
import {useFeatureContext} from '../../context/FeatureContext';
import TranslateComponent from '../../components/Translate/TranslateComponent';
import CurrencyComponent from '../../components/Currency/CurrencyComponent';
import {appColors} from '../../constants/appColors';
import useKeyboardVisibility from '../../hooks/useKeyboardVisibility';
import {appInfo} from '../../constants/appInfos';
const {width,height}=Dimensions.get('window');
const MainScreen = ({navigation}: any) => {
  const {currentFeature, setCurrentFeature,somwidth,setSomwidth} = useFeatureContext();
  const isKeyboardVisible = useKeyboardVisibility();
  useEffect(() => {
    navigation.setOptions({
      title: currentFeature.title,
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: appColors.primary,
      },
      headerTintColor: 'white', // Change the text color
    });
  }, [currentFeature.title]);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            height: isKeyboardVisible
              ? '100%'
              : appInfo.sizes.HEIGHT +
                appInfo.sizes.STATUSBAR_HEIGHT -
                appInfo.sizes.HEADER_HEIGHT,
          },
        ]}>
        {currentFeature.id === 1 ? (
          <TranslateComponent
            navigation={navigation}
            isKeyboardVisible={isKeyboardVisible}
          />
        ) : (
          <CurrencyComponent
            navigation={navigation}
            isKeyboardVisible={isKeyboardVisible}
          />
        )}
        {!isKeyboardVisible && (
          <View style={styles.footer}>
            <SwitchButton somwidth={somwidth} setSomwidth={setSomwidth}/>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
