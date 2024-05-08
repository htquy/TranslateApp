import {Dimensions, StatusBar} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const appSize = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    UNSAFETOP:useSafeAreaInsets().top,
  },
};