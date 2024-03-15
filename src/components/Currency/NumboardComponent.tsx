import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import NumboardData from '../../utils/JsonData/numboardData.json';

const NumboardComponent = () => {
  return (
    <View>
      {NumboardData.map(key => (
        <TouchableOpacity
          key={key.value}
          style={styles.button}
          onPress={() => {}}>
          <Text style={styles.buttonText}>{key.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default NumboardComponent;
