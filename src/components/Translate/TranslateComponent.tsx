import {View, Text, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import React, {useRef, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import LanguagePickerButton from './LanguagePickerButton';
import {styles} from './Translate.Style';
import {appColors} from '../../constants/appColors';
import {useLanguageContext} from '../../context/LanguageContext';
import {
  ArrowImage,
  DocumentImage,
  HandwriteImage,
  MicrophoneImage,
  UploadImage,
} from '../../assets/svgs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VoiceButton from './VoiceButtonComponent';
import VoiceButtonComponent from './VoiceButtonComponent';

const TranslateComponent = ({navigation, isKeyboardVisible}: any) => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textInputRef = useRef(null);
  const {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
    isSourceLanguage,
    setIsSourceLanguage,
  } = useLanguageContext();
  const goToLanguagePickerScreen = () => {
    navigation.navigate('LanguagePicker');
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await Clipboard.getString();
      setTextToTranslate(prev => prev + text);
    } catch (error) {
      console.error('Error pasting from clipboard', error);
      return null;
    }
  };

  const handleSwitchLanguage = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      <View style={styles.languagePicker}>
        <LanguagePickerButton
          name={sourceLanguage.name}
          code={sourceLanguage.code}
          backgroundColor={appColors.primaryBlur2}
          onPress={() => {
            isSourceLanguage ? () => {} : setIsSourceLanguage(true);
            goToLanguagePickerScreen();
          }}
        />
        <TouchableOpacity onPress={() => handleSwitchLanguage()}>
          <ArrowImage color={appColors.black} width={24} height={24} />
        </TouchableOpacity>
        <LanguagePickerButton
          name={targetLanguage.name}
          code={targetLanguage.code}
          onPress={() => {
            isSourceLanguage ? setIsSourceLanguage(false) : () => {};
            goToLanguagePickerScreen();
          }}
        />
      </View>

      <View style={{flex: 1}}>
        <View style={styles.textArea}>
          <TextInput
            style={styles.text}
            value={textToTranslate}
            ref={textInputRef}
            onChangeText={value => setTextToTranslate(value)}
            placeholder="Enter text..."
            placeholderTextColor={appColors.gray2}
            multiline={true}
            textAlignVertical="top"></TextInput>
          {textToTranslate ? (
            <TouchableOpacity style={styles.deleteTextButton}>
              <Icon
                name="close"
                size={24}
                color={appColors.gray}
                style={{marginRight: 10}}
                onPress={() => setTextToTranslate('')}
              />
            </TouchableOpacity>
          ) : (
            ''
          )}
          <TouchableOpacity
            style={styles.pasteButton}
            onPress={() => pasteFromClipboard()}>
            <DocumentImage color={appColors.black} width={24} height={24} />
            <Text style={{color: appColors.sPrimary, marginStart: 8}}>
              Paste
            </Text>
          </TouchableOpacity>
        </View>
        {textToTranslate && (
          <View style={styles.textArea}>
            <TextInput
              style={styles.text}
              value={textToTranslate}
              ref={textInputRef}
              onChangeText={value => setTextToTranslate(value)}
              placeholder="Enter text..."
              placeholderTextColor={appColors.gray2}
              multiline={true}
              textAlignVertical="top"
              editable={false}></TextInput>
          </View>
        )}
      </View>

      {!isKeyboardVisible && (
        <View
          style={[
            styles.actionRow,
            {justifyContent: isRecording ? 'center' : 'space-between'},
          ]}>
          {!isRecording && (
            <View style={{alignItems: 'center', width: 80}}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => textInputRef.current.focus()}>
                <HandwriteImage
                  color={appColors.primary}
                  width={28}
                  height={28}
                />
              </TouchableOpacity>
              <Text>Handwrite</Text>
            </View>
          )}

          <VoiceButtonComponent
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />

          {!isRecording && (
            <View style={{alignItems: 'center', width: 80}}>
              <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                <UploadImage color={appColors.primary} width={28} height={28} />
              </TouchableOpacity>
              <Text>Upload</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default TranslateComponent;
