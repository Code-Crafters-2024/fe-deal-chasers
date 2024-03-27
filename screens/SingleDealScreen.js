import React from "react";
import { View } from "react-native";
import { styles } from "../styles";
import SingleDeal from "../Components/SingleDeal";
const SingleDealScreen = () => {
  return (
    <View style={styles.container}>
      <SingleDeal></SingleDeal>
    </View>
  );
};
export default SingleDealScreen;