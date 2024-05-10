import { Text, View,StyleSheet, TouchableOpacity, Dimensions,ScrollView } from "react-native";
import CountryFlag from "react-native-country-flag";
import currencys from '../../utils/JsonData/Currency.json'
import NumBoard from "./NumboardComponent";
import { useState,useEffect } from "react";
import { appColors } from "../../constants/appColors";
const{width,height}=Dimensions.get('window');
const CurrencyComponent=({navigation}:any)=>{
    const [text,setText]=useState();
    const [currency1,setCurrency1]=useState('USD')
    const [currency2,setCurrency2]=useState('')
    const [result1,setResult1]=useState('')
    const [result2,setResult2]=useState('')
    var currencyUnit1=currencys.find(item=>item.currencyCode==currency1);
    var currencyUnit2=currencys.find(item=>item.currencyCode==currency2);
    useEffect(() => {
        fetch('https://ipinfo.io/json')
          .then(response => response.json())
          .then(data => {
            const { country } = data;
            let cu=currencys.find(item=>item.countryuse.includes(country));
            if(cu!=null){
            setCurrency2(cu.currencyCode);}
            console.log(cu);
          })
          .catch(error => console.error('Error fetching country:', error));
      }, []);
      console.log(result2)
    return(
            <View style={{flex:1,paddingLeft:0.025*width,paddingRight:0.025*width}}>
            <View style={[styles.viewcurren,{backgroundColor:appColors.primaryBlur2}]}>
            <TouchableOpacity style={{flexDirection:'row'}}
            onPress={()=>{navigation.navigate('CurrencyPicker',{currency:currency1,setCurrency:setCurrency1})}}>
            <View style={styles.flag}>{currencyUnit1&&<CountryFlag isoCode={currencyUnit1?.countryCode} size={0.08*width} />}</View>
            <Text style={{fontSize:0.05*width,left:5,top:0.01*width}}>{currencyUnit1&&currencyUnit1.currencyCode}</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'flex-end',marginRight:0.04*width}}>
            <ScrollView horizontal={true}>
            <Text style={{fontSize:0.06*width,marginRight:0,color:appColors.gray}}>{result1}{currencyUnit1&&currencyUnit1.symbol}</Text>
            </ScrollView>
            </View>
            </View>
            <View style={[styles.viewcurren,{backgroundColor:appColors.gray4,top:0.06*width}]}>
            <TouchableOpacity style={{flexDirection:'row'}}
            onPress={()=>{navigation.navigate('CurrencyPicker',{currency:currency2,setCurrency:setCurrency2})}}>
            <View style={styles.flag}>{currency2==''?null:(currencyUnit2&&<CountryFlag isoCode={currencyUnit2?.countryCode} size={0.08*width} />)}</View>
            <Text style={{fontSize:0.05*width,left:5,top:0.01*width}}>{currencyUnit2?.currencyCode}</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'flex-end',marginRight:0.04*width}}>
                <ScrollView horizontal={true}>
            <Text style={{fontSize:0.06*width,color:appColors.gray}}>{result2}{currencyUnit2?.symbol}</Text>
            </ScrollView>
            </View>
            </View>
            <View style={{alignItems:'center'}}>
            <NumBoard currency1={currency1} currency2={currency2} setCurrency1={setCurrency1} setCurrency2={setCurrency2} result1={result1} result2={result2} setResult1={setResult1} setResult2={setResult2} />
            </View>
            </View>
    )
}
export default CurrencyComponent;
const styles=StyleSheet.create(
    {
        viewcurren:{
            flexDirection:'row',
            height:0.16*width,
            paddingTop:0.04*width,
            paddingBottom:0.04*width,
            top:0.04*width,
            paddingLeft:0.04*width,
            borderRadius:0.08*width
        },
        flag:{
            width:0.08*width, 
            height:0.08*width,
            overflow:"hidden",
            borderRadius:0.4*height,
            alignItems:'center'
        }
    }
)