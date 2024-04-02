import React from 'react';
import { View, Image } from "react-native";


export default CustomHeader = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333333', paddingVertical: 10 }}>
      <Image source={require('../assets/orange-logo.png')} style={{ width: 200, height: 60 }} />
    </View>
  );