import {StyleSheet} from 'react-native';
import {appColors} from '../../constants/appColors';
import {appSize} from '../../constants/appSize';
const {width,height} ={width:appSize.sizes.WIDTH,height:appSize.sizes.HEIGHT-appSize.sizes.UNSAFETOP}
export const styles = StyleSheet.create({
  languagePicker: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: appColors.black,
  },
  buttonLang: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 0.08*height,
    borderRadius: (width-52)*0.2,
    width: (width-52)*0.5,
  },
  textArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: appColors.primaryBlur1,
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: height*0.03,
  },
  text: {
    fontSize: 24,
    color: appColors.black,
    height: '100%',
    marginTop:20,
  },
  deleteTextButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 9999,
  },
  pasteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.sprimaryBlur2,
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 80,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    alignItems: 'flex-end',
    marginBottom: height*0.15,
  },

  voiceButton: {},
  actionButton:{}
});
