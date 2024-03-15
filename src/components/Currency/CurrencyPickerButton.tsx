import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import CurrencyDatas from '../../utils/JsonData/currency-flags.json';
import {appColors} from '../../constants/appColors';
import {NumberFormat} from '../../utils/Extension/numberFormat';

interface CurrencyProps {
  name: string;
  code: string;
  symbol: string;
  flag: string;
  emoji?: string;
}

interface CurrencyPickerProp {
  currencyInfo: CurrencyProps;
  onPress: Function;
}

const CurrencyPickerButton = ({currencyInfo, onPress}: CurrencyPickerProp) => {
  return (
    <Pressable style={styles.button} onPress={() => onPress()}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: appColors.black, marginEnd: 10, fontSize: 24}}>
          {currencyInfo.emoji}
        </Text>
        <Text style={{color: appColors.black, marginEnd: 4, fontWeight: '500'}}>
          {currencyInfo.symbol}
        </Text>
        <Text style={{color: appColors.black, fontWeight: '500'}}>
          {currencyInfo.code}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: appColors.black, fontSize: 18, fontWeight: '500'}}>
          {NumberFormat.formatToCurrency(110900)}
        </Text>
        <Text
          style={{
            color: appColors.black,
            fontWeight: '500',
            marginStart: 6,
            fontSize: 18,
          }}>
          {currencyInfo.symbol}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 22,
    backgroundColor: appColors.primaryBlur2,
    borderRadius: 50,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CurrencyPickerButton;
