import React from 'react';
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const CustomHeader = () => {
  const navigation = useNavigation();
  const handleLogoPress = () => {
    navigation.navigate("Home");
  };
  return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333333', paddingVertical: 10, marginTop: 50 }}>
        <TouchableOpacity onPress={handleLogoPress}><Image source={require('../assets/4.png')} style={{ width: 200, height: 60 }} /></TouchableOpacity>
      </View>
  );
};
export default CustomHeader;