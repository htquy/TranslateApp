import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './LanguagePickerScreen.Style';
import {appColors} from '../../constants/appColors';
import LanguageData from '../../utils/JsonData/languageCode.json';
import {useNavigation} from '@react-navigation/native';
import {useLanguageContext} from '../../context/LanguageContext';
import {Pressable} from 'react-native';

interface CountryProps {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
  isFirst?: string;
}

interface LanguageProps {
  name: string;
  code: string;
  isFirst?: string;
}

interface LanguagePickerProp {
  languageInfo: LanguageProps;
  onPress: Function;
}

const LanguagePickerScreen = () => {
  const navigation = useNavigation();

  const [searchKeyWord, setSearchKeyWord] = useState('');
  //const [countries, setCountries] = useState(CountryData);
  const [languages, setLanguage] = useState(LanguageData);
  const goBack = () => {
    navigation.goBack();
  };

  // const handleSearch = (value: string) => {
  //   setSearchKeyWord(value);
  //   const filteredCountries = CountryData.filter((country: CountryProps) =>
  //     country.name.toLowerCase().includes(value.toLowerCase()),
  //   );
  //   setCountries(filteredCountries);
  // };

  const handleSearch = (value: string) => {
    setSearchKeyWord(value);
    const filteredLanguages = LanguageData.filter((language: LanguageProps) =>
      language.name.toLowerCase().includes(value.toLowerCase()),
    );
    setLanguage(filteredLanguages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Language</Text>
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
            placeholder="Seach Language"
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
        data={languages}
        renderItem={({item}) => (
          <CardItem languageInfo={item} onPress={() => {}} />
        )}
        keyExtractor={item => item.code}
      />
    </View>
  );
};

const CardItem = (props: LanguagePickerProp) => {
  const navigation = useNavigation();
  const languageInfo = props.languageInfo;
  const {setSourceLanguage, setTargetLanguage, isSourceLanguage} =
    useLanguageContext();
  const handleSelectLanguage = () => {
    if (isSourceLanguage) {
      setSourceLanguage(languageInfo);
      navigation.goBack();
    } else {
      setTargetLanguage(languageInfo);
      navigation.goBack();
    }
  };

  return (
    <Pressable style={styles.cardItem} onPress={() => handleSelectLanguage()}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: appColors.black, fontSize: 16, marginStart: 20}}>
          {languageInfo.name}
        </Text>
      </View>
      {languageInfo.isFirst ? (
        <Text style={{fontSize: 20}}>{languageInfo.isFirst}</Text>
      ) : (
        ''
      )}
    </Pressable>
  );
};

export default LanguagePickerScreen;
