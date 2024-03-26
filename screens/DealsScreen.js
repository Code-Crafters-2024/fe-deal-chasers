import React from "react";
import Deals from "../Components/Deals";

const DealsScreen = ({ route }) => {
  const category = route.params?.category ?? null;

  return <Deals category={category} />;
};

export default DealsScreen;
