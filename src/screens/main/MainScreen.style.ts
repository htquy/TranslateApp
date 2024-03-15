import {StyleSheet} from 'react-native';
import {appColors} from '../../constants/appColors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    height: '100%',
  },
  footer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollViewContent: {flexGrow: 1},
  swicthButotn: {},
});

export default styles;
