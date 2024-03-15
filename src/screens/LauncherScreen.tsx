import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {useFeatureContext} from '../context/FeatureContext';

const HomeScreen = ({navigation}: any) => {
  const {currentFeature, setCurrentFeature} = useFeatureContext();
  const goToMain = (id: number) => {
    if (id === 1) {
      setCurrentFeature({id: 1, title: 'Translate'});
    } else setCurrentFeature({id: 2, title: 'Currency'});
    navigation.navigate('Main');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColors.white,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#165594',
          padding: 10,
          width: 200,
          justifyContent: 'center',
          marginBottom: 10,
        }}
        onPress={() => goToMain(1)}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Translate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#165594',
          padding: 10,
          width: 200,
          justifyContent: 'center',
        }}
        onPress={() => goToMain(2)}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Currency</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
