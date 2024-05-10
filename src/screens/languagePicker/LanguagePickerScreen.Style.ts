import {StyleSheet} from 'react-native';
import {appColors} from '../../constants/appColors';
import { appSize } from '../../constants/appSize';
const {width,height}={width:appSize.sizes.WIDTH,height:appSize.sizes.HEIGHT-appSize.sizes.UNSAFETOP}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: appColors.black,
    fontWeight: 'bold',
    marginTop: appSize.sizes.UNSAFETOP,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: appColors.gray4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    height:0.06*height
  },
  cardItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: appColors.gray5,
    borderBottomWidth: 1,
  },
});

export default styles;
