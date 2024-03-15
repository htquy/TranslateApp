import {useHeaderHeight} from '@react-navigation/elements';
import {Dimensions, StatusBar} from 'react-native';

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    STATUSBAR_HEIGHT: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    HEADER_HEIGHT: useHeaderHeight(),
  },
};
