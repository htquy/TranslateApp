import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './Translate.Style';
import {appColors} from '../../constants/appColors';

interface LanguageProp {
  name: string;
  backgroundColor?: string;
  code: string;
  onPress: Function;
}

const LanguagePickerButton = ({
  name,
  backgroundColor,
  onPress,
}: LanguageProp) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonLang,
        {backgroundColor: backgroundColor ? backgroundColor : appColors.gray5},
      ]}
      onPress={() => onPress()}>
      <Text style={[styles.buttonText]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default LanguagePickerButton;
