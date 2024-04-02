import React from "react";
import { View } from "react-native";
import { styles } from "../styles";
import SingleDeal from "../Components/SingleDeal";

const SingleDealScreen = ({ route }) => {
  return (
    <View>
      <SingleDeal route={route}></SingleDeal>
    </View>
  );
};

export default SingleDealScreen;