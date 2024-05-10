import {Dimensions, StyleSheet} from 'react-native';
import {appColors} from '../../constants/appColors';
const {width,height} =Dimensions.get('window');
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
    marginTop:32,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: appColors.gray4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 0.06*height,
    marginBottom:16
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
