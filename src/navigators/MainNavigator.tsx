import {StatusBar} from 'react-native';
import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CurrencyPickerScreen, LauncherScreen, MainScreen} from '../screens';
import {appColors} from '../constants/appColors';
import LanguagePickerScreen from '../screens/languagePicker/LanguagePickerScreen';
import {LanguageProvider, FeatureProvider, CurrencyProvider} from '../context';
import { useNavigation } from '@react-navigation/native';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation=useNavigation();
  return (
    <FeatureProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Stack.Navigator>
            <Stack.Screen
              name="Launcher"
              component={() => <LauncherScreen navigation={navigation} />}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Main" component={()=><MainScreen />} />
            <Stack.Screen
              name="LanguagePicker"
              component={LanguagePickerScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CurrencyPicker"
              component={()=><CurrencyPickerScreen navigation={navigation} />}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </CurrencyProvider>
      </LanguageProvider>
    </FeatureProvider>
  );
};

export default MainNavigator;
