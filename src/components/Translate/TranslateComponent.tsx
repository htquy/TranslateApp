import {View, Text, TouchableOpacity, TextInput, Keyboard,ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import LanguagePickerButton from './LanguagePickerButton';
import {styles} from './Translate.Style';
import {appColors} from '../../constants/appColors';
import {useLanguageContext} from '../../context/LanguageContext';
import Tts from "react-native-tts";
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
import axios from 'axios';

const TranslateComponent = ({navigation, isKeyboardVisible}: any) => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [textFromTranslate,setTextFromTranslate]=useState('');
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
    let language=sourceLanguage.code;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setTextFromTranslate(textToTranslate);
    setTextToTranslate(textFromTranslate);
    Tts.setDefaultLanguage(language);
  };
  const handleTranslate = async (text:string) => {
    console.log(text);
    const postData = {
      contents: text,
      contTargetLanguageCode: targetLanguage.code,
      sourceLanguageCode: sourceLanguage.code,
    };

    const fetchApi = async () => {
      try {
        console.log(postData);
        const url = `http://103.101.161.178:123/api/v1/translate`;
        var res = await axios.post(url, postData);
        setTextFromTranslate(res.data.translatedText);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const response = await fetchApi();
  console.log(response);
  };
  useEffect(()=>{
    Tts.setDefaultEngine(targetLanguage.code);
    Tts.setDefaultRate(0.5);
  },[])
  useEffect(() => {
    const fetchData = async () => {
        await handleTranslate(textToTranslate);
    };
    fetchData();
  }, [textToTranslate,targetLanguage]);
  return (
    <View style={{flex: 1, padding: 14}}>
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
          <ArrowImage color={appColors.black} width={24} height={24}/>
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
            <DocumentImage color={appColors.black} width={15} height={15} />
            {textToTranslate?'':<Text style={{color: appColors.sPrimary, marginStart: 8}}>
              Paste
            </Text>}
          </TouchableOpacity>
        </View>
        {textToTranslate && (
          <View style={styles.textArea}>
            <ScrollView>
            <TextInput
              style={styles.text}
              value={textFromTranslate}
              ref={textInputRef}
              placeholderTextColor={appColors.gray2}
              multiline={true}
              textAlignVertical="top"
              editable={false}></TextInput>
              </ScrollView>
              <TouchableOpacity style={styles.deleteTextButton}>
              <Icon
                name="volume-up"
                size={24}
                color={appColors.gray}
                style={{marginRight: 10}}
                onPress={() => {Tts.speak(textFromTranslate);console.log("text:     ",textFromTranslate);}}
              />
            </TouchableOpacity>
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
            <View style={{alignItems: 'center', width: 80,bottom:10}}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {}}>
                <HandwriteImage
                  color={appColors.primary}
                  width={28}
                  height={28}
                />
              </TouchableOpacity>
              <Text style={{color:"#CD1F20",fontSize:12}}>Handwrite</Text>
            </View>
          )}

          <VoiceButtonComponent
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            textToTranslate={textToTranslate}
            setTexToTranslate={setTextToTranslate}
            sourceLanguage={sourceLanguage}
          />

          {!isRecording && (
            <View style={{alignItems: 'center', width: 80,bottom:10}}>
              <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                <UploadImage color={appColors.primary} width={28} height={28} />
              </TouchableOpacity>
              <Text style={{color:"#CD1F20",fontSize:12}}>Upload</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default TranslateComponent;
