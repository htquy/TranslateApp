import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { appSize } from '../../constants/appSize';
import { useHeaderHeight } from '@react-navigation/elements';
const {width,height}={width:appSize.sizes.WIDTH,height:appSize.sizes.HEIGHT-appSize.sizes.UNSAFETOP}
interface NumBoardProps{
  currency1:string;
  currency2:string;
  setCurrency1:React.Dispatch<React.SetStateAction<string>>;
  setCurrency2:React.Dispatch<React.SetStateAction<string>>
  result1:string;
  result2:string;
  setResult1:React.Dispatch<React.SetStateAction<string>>;
  setResult2:React.Dispatch<React.SetStateAction<string>>;
}
const NumBoard:React.FC<NumBoardProps> = ({currency1,currency2,setCurrency1,setCurrency2,result1,result2,setResult1,setResult2}) => {
  const headerHeight = useHeaderHeight();
  console.log(headerHeight);
  const[heightBoard,setHeightBoard]=useState(0);
  const board = [[['C','#FFC9C9','#CD1F20'], ['<-','#FFC9C9','#CD1F20','arrow-back'], ['||','#FFC9C9','#CD1F20','compare-arrows'], ['\u00F7','#CD1F20','#FFFFFF']],
                 [['7','#F4F4F4','#656565'], ['8','#F4F4F4','#656565'], ['9','#F4F4F4','#656565'], ['x',"#CD1F20",'#FFFFFF']], 
                 [['4','#F4F4F4','#656565'], ['5','#F4F4F4','#656565'], ['6','#F4F4F4','#656565'], ['+',"#CD1F20",'#FFFFFF']], 
                 [['1','#F4F4F4','#656565'], ['2','#F4F4F4','#656565'], ['3','#F4F4F4','#656565'], ['-','#CD1F20','#FFFFFF']], 
                 [['0','#F4F4F4','#656565'], ['.','#F4F4F4','#656565'], ['%','#F4F4F4','#656565'], ['=','#CD1F20','#FFFFFF']]];
  var boardh=500;
 if (appSize.sizes.HEIGHT-headerHeight-0.4*width-0.07*height>=1.2*width){
  boardh=1.2*width;
  console.log("width",width)
 }
 else boardh=appSize.sizes.HEIGHT-headerHeight-0.4*width-0.07*height;
  const handleButton=(item:string)=>{
    if(item=='C'){
      setResult1('');
      setResult2('');
    }
    else if(item=='<-'){
      setResult1(result1.slice(0,-1));
    }
    else if(item=='||'){
      let res=result1;
      setResult1(result2);
      setResult2(res);
      let curren=currency1
      setCurrency1(currency2);
      setCurrency2(curren);
    }
    else if(item=='='){
      let result=result1.replace(/x/g,'*').replace(/\u00F7/g,'/').replace(/%/g,'*(1/100)');
      const resul=parseFloat(eval(result)).toFixed(2);
      setResult1(resul.toString());
      ConvertAPI(resul);
    }
    else{
      setResult1(result1+item);
    }
  }
  const ConvertAPI=async (result:any)=>{
    if(result!=''&&parseFloat(result)>0){
      try{
          var url='http://103.124.92.113:8000/api/exchangerate'
          var res=await axios.get(url);
          console.log(res.data);
          var convertCurrency=parseFloat(res.data[currency2])/parseFloat(res.data[currency1])*result;
          setResult2(convertCurrency.toFixed(2).toString());
      }catch(error){
        console.log("Error:",error);
      }
    }
  }
  useEffect(()=>{
    ConvertAPI(result1);
  },[currency1,currency2])
  return (
    <>
    {console.log(boardh)}
    <View style={{ height:boardh,width:'100%',marginTop:0.08*width }}>
      {
        board.map((items, index) => (
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center', flex: 1,flexDirection:'row' }}>
            {
              items.map((i, innerIndex) => (
                <View key={innerIndex} style={{ justifyContent: 'center', alignItems: 'center', height: boardh*0.2, width: '25%' }}>
                  <TouchableOpacity style={{ width: 0.205*width, height: 0.18*boardh,justifyContent:'center',alignItems:'center', backgroundColor:i[1],borderRadius:width*0.05 }}
                  onPress={()=>handleButton(i[0])}
                  >
                    {i[3]!=null?
                    (i[0]=='||'?<View style={{transform: [{ rotate: '90deg' }],}}><Icon name={i[3]} size={38} color={i[2]}/></View>:
                    <Icon name={i[3]} size={28} color={i[2]}/>):
                    <Text style={{fontSize:28, color:i[2]}}>{i[0]}</Text>}
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
        ))
      }
    </View>
    </>
  );
};

export default NumBoard;
