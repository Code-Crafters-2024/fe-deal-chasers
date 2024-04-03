import React from 'react';
import { View, Image } from "react-native";


export default CustomHeader = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333333', paddingVertical: 10, marginTop: 50 }}>
      <Image source={require('../assets/4.png')} style={{ width: 200, height: 60 }} />
    </View>
  );