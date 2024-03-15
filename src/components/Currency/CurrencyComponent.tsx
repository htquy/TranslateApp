import {View, Text} from 'react-native';
import React from 'react';
import CurrencyPickerButton from './CurrencyPickerButton';
import {styles} from './Currency.Style';
import {useCurrencyContext} from '../../context/CurrencyContext';
import {appColors} from '../../constants/appColors';
import NumboardComponent from './NumboardComponent';

const CurrencyComponent = ({navigation}: any) => {
  const {
    sourceCurrency,
    targetCurrency,
    setSourceCurrency,
    setTargetCurrency,
    isSourceCurrency,
    setIsSourceCurrency,
  } = useCurrencyContext();

  const goToCurrencyPickerScreen = () => {
    navigation.navigate('CurrencyPicker');
  };
  return (
    <View style={styles.container}>
      <View style={styles.currencyPickerWrap}>
        <CurrencyPickerButton
          currencyInfo={sourceCurrency}
          onPress={() => {
            isSourceCurrency ? () => {} : setIsSourceCurrency(true);
            goToCurrencyPickerScreen();
          }}
        />
        <CurrencyPickerButton
          currencyInfo={targetCurrency}
          onPress={() => {
            isSourceCurrency ? () => {} : setIsSourceCurrency(false);
            goToCurrencyPickerScreen();
          }}
        />
      </View>

      <NumboardComponent />
    </View>
  );
};

export default CurrencyComponent;
