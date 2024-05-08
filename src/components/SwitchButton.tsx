import {View, Text, TouchableOpacity, StyleSheet,Animated, Dimensions} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import {CoinImage, TranslateImage} from '../assets/svgs';
import {appColors} from '../constants/appColors';
import {useFeatureContext} from '../context/FeatureContext';
const {width,height}=Dimensions.get('window');
interface SwitchButton{
  somwidth:number,
  setSomwidth:Function
}
const SwitchButton:React.FC<SwitchButton> = ({somwidth,setSomwidth}) => {
  const [isMounted,setIsMounted]=useState(false);
  const {currentFeature, setCurrentFeature} = useFeatureContext();
  const animatedWidth2 = useRef(new Animated.Value(height*0.402-somwidth)).current;
  const animatedWidth1 = useRef(new Animated.Value(somwidth)).current;
  console.log(somwidth);
  const toggleFeature = () => {
    if (currentFeature.id === 1) {
      setCurrentFeature({id: 2, title: 'Currency'});
    } else {
      setCurrentFeature({id: 1, title: 'Translate'});
    }
  };
  useEffect(()=>{ 
    Animated.parallel([
      Animated.timing(animatedWidth1, {
        toValue: somwidth,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(animatedWidth2, {
        toValue: height * 0.402 - somwidth,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(()=>{
    });
  },[isMounted])
  const handlePress = () => {
    setIsMounted(!isMounted);
    if(currentFeature.id==1){
      setCurrentFeature({id:2,title:'Currency'})
    }
    else setCurrentFeature({id:1,title:'Translate'});
    setSomwidth(height*0.402-somwidth);
  };
  return (
    <View style={{flex: 1, marginHorizontal: 16}}>
        <View style={styles.container}>
          <TouchableOpacity 
          style={{}} onPress={()=>{currentFeature.id==2?handlePress():null}}>
          <Animated.View style={{height:height*0.052,width:animatedWidth1,backgroundColor:currentFeature.id==2?'#FFC9C9':"#CD1F20",top:height*0.007,left:height*0.007,borderRadius:21,alignItems:'center',flexDirection:'row',justifyContent:"center"}}>
            {currentFeature.id === 1 ? (
              <TranslateImage color={appColors.white} />
            ) : (
              <TranslateImage color={appColors.primary} />
            )}
            {currentFeature.id==2?null:<Text style={{color:"white",fontSize:20}}>Translate</Text>}
          </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{position:'absolute',top:height*0.007,right:height*0.007,flex:1,alignItems:"center"}} onPress={()=>{
           currentFeature.id==2?null: handlePress()
          }}>
            
          <Animated.View style={{width:animatedWidth2,height:height*0.052,borderRadius:height*0.026,backgroundColor:currentFeature.id==2?'#CD1F20':"#FFC9C9",alignItems:'center',flexDirection:'row',justifyContent:"center"}}>
          {currentFeature.id === 1 ? (
              <CoinImage color={appColors.primary} />
            ) : (
              <CoinImage color={appColors.white} />
            )}
          {currentFeature.id==2?<Text style={{color:"white",fontSize:20}}>Currency</Text>:null}
          </Animated.View>
          </TouchableOpacity>
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.primaryBlur2,
    height: height*0.066,
    borderRadius: 30,
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    padding: 10,
    justifyContent: 'space-between',
  },
  mainButton: {
    backgroundColor: appColors.primary,
    borderRadius: 40,
    width: '80%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subButton: {
    backgroundColor: appColors.primaryBlur1,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: appColors.white,
    fontSize: 20,
    marginLeft: 12,
  },
});

export default SwitchButton;
