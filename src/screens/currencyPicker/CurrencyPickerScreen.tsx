import { ScrollView, TouchableOpacity, View, StyleSheet, Text,TextInput,FlatList, Dimensions } from "react-native";
import currencys from '../../utils/JsonData/Currency.json'
import React,{useState,useEffect} from "react";
import styles from "./CurrencyPickerScreen.style";
import CountryFlag from "react-native-country-flag";
import Icon  from "react-native-vector-icons/MaterialIcons";
import { appColors } from "../../constants/appColors";
import { appSize } from "../../constants/appSize";
import { useRoute } from "@react-navigation/native";
const {width,height}={width:appSize.sizes.WIDTH,height:appSize.sizes.HEIGHT}
interface CurrencyInfo {
  currencyCode: string;
  currencyName: string;
  symbol: string;
  symbol_native: string;
  countryName: string;
  countryCode: string;
  countryuse: string[];
}
interface CurrencyProps{
  route:any;
  navigation:any;
}

const CurrencyPickerScreen=({navigation}:any)=>{
  const route=useRoute();
  const { currency, setCurrency } = route.params as { currency: string, setCurrency: React.Dispatch<React.SetStateAction<string>> };

    const [data, setData] = useState(currencys);
    const [text,setText]=useState('');
  useEffect(()=>{
    let tempData = currencys.filter((item:CurrencyInfo) => {
      return item.currencyCode.toLowerCase().indexOf(text.toLowerCase()) > -1||item.currencyName.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    setData(tempData);
  },[text]);
  console.log(currency,"123456");
  var listCurrency=data.concat();
    data.forEach((item,index)=>{
        if(item.currencyCode==currency){
            let indexCurrency=index;
            if(indexCurrency>-1){
                listCurrency.splice(index,1);
                listCurrency.unshift(item);
            }
            return;
        }
    })
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Currency</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={26} color={appColors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchInput}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="search"
            size={22}
            color={appColors.gray2}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Seach Currency"
            style={{color:'black'}}
            value={text}
            onChangeText={value => setText(value)}
          />
        </View>
        {text ? (
          <Icon
            name="close"
            size={22}
            color={appColors.gray}
            style={{marginRight: 10}}
            onPress={() => setText('')}
          />
        ) : (
          ''
        )}
      </View>
        <FlatList
        data={listCurrency}
        renderItem={({ item, index }) => (
            <TouchableOpacity
                key={index}
                style={styles.countryItem}
                onPress={() => { setCurrency(item.currencyCode); navigation.goBack(); }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 0.08 * width, height: 0.08 * width, overflow: "hidden", borderRadius: 0.4 * height, alignItems: 'center' }}>
                        <CountryFlag isoCode={item.countryCode} size={0.08 * width} />
                    </View>
                    <Text style={{ left: 0.02 * width, top: 0.01 * width,color:item.currencyCode==currency?'green':'black' }}>{item.currencyName}</Text>
                    <Text style={{ right: 0.02 * width, top: 0.01 * width, position: 'absolute',color:item.currencyCode==currency?'green':'black' }}>{item.currencyCode}</Text>
                </View>
            </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: 'rgba(0, 0, 0, 0.05)' }} /> // Thay đổi độ trong suốt của màu sắc ở đây
        )}
    />
                </View>
    );
};

export default CurrencyPickerScreen;
