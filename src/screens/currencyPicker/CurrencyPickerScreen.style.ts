import {StyleSheet} from 'react-native';
import {appColors} from '../../constants/appColors';

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
    marginTop: 32,
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
  },
  cardItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: appColors.gray5,
    borderBottomWidth: 1,
  },
  countryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
},
});

export default styles;
