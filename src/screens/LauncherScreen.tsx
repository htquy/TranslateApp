import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, { useState } from 'react';
import {appColors} from '../constants/appColors';
import {useFeatureContext} from '../context/FeatureContext';
import { appSize } from '../constants/appSize';
const {width,height}={width:appSize.sizes.WIDTH,height:appSize.sizes.HEIGHT-appSize.sizes.UNSAFETOP}
const LauncherScreen = ({navigation}:any) => {
  const {currentFeature, setCurrentFeature,somwidth,setSomwidth} = useFeatureContext();
  const goToMain = (id: number,sizewidth:number) => {
    setSomwidth(height*sizewidth);
    console.log("som width first: --------------------------------",height*sizewidth,"--------",sizewidth)
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
        onPress={() => goToMain(1,0.35)}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Translate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#165594',
          padding: 10,
          width: 200,
          justifyContent: 'center',
        }}
        onPress={() => goToMain(2,0.052)}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Currency</Text>
      </TouchableOpacity>
    </View>
  );
};

export default  LauncherScreen;
