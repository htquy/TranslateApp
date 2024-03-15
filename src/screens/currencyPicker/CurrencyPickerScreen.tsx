import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import styles from './CurrencyPickerScreen.style';
import {appColors} from '../../constants/appColors';
import {useCurrencyContext} from '../../context/CurrencyContext';
import CurrencyData from '../../utils/JsonData/currency-flags.json';

interface CurrencyProps {
  name: string;
  symbol: string;
  code: string;
  emoji?: string;
  flag: string;
}

interface CurrencyPickerProps {
  currencyInfo: CurrencyProps;
  onPress: Function;
}

const CurrencyPickerScreen = () => {
  const navigation = useNavigation();
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [currencies, setCurrencies] = useState(CurrencyData);

  const handleSearch = (value: string) => {
    setSearchKeyWord(value);
    const filteredCurrency = CurrencyData.filter(
      (currency: CurrencyProps) =>
        currency.name.toLowerCase().includes(value.toLowerCase()) ||
        currency.code.toLowerCase().includes(value.toLowerCase()),
    );
    setCurrencies(filteredCurrency);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Currency</Text>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="close" size={26} color={appColors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchInput}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="search"
            size={22}
            color={appColors.gray2}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Seach Currency"
            value={searchKeyWord}
            onChangeText={value => handleSearch(value)}
          />
        </View>
        {searchKeyWord ? (
          <Icon
            name="close"
            size={22}
            color={appColors.gray}
            style={{marginRight: 10}}
            onPress={() => handleSearch('')}
          />
        ) : (
          ''
        )}
      </View>
      <FlatList
        data={currencies}
        renderItem={({item}) => (
          <CardItem currencyInfo={item} onPress={() => {}} />
        )}
        keyExtractor={item => item.code}
      />
    </View>
  );
};

const CardItem = (props: CurrencyPickerProps) => {
  const navigation = useNavigation();
  const CurrencyInfo = props.currencyInfo;
  const {setSourceCurrency, setTargetCurrency, isSourceCurrency} =
    useCurrencyContext();
  const handleSelectCurrency = () => {
    if (isSourceCurrency) {
      setSourceCurrency(CurrencyInfo);
      navigation.goBack();
    } else {
      setTargetCurrency(CurrencyInfo);
      navigation.goBack();
    }
  };

  return (
    <Pressable style={styles.cardItem} onPress={() => handleSelectCurrency()}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: appColors.black, fontSize: 24, marginStart: 8}}>
            {CurrencyInfo.emoji}
          </Text>
          <Text style={{color: appColors.black, fontSize: 16, marginStart: 10}}>
            {CurrencyInfo.code}
          </Text>
        </View>

        <Text style={{color: appColors.black, fontSize: 16, marginStart: 6}}>
          {CurrencyInfo.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default CurrencyPickerScreen;
