import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewMarkerIcon = ({ deal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.marker}></View>
      <View style={styles.line}></View>
      <Text style={styles.text}>
        {deal.title} £{deal.price}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  marker: {
    backgroundColor: "#0078fe",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  line: {
    backgroundColor: "#0078fe",
    width: 2,
    height: 30,
  },
  text: {
    fontSize: 16,
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 5,
    borderRadius: 10,
  },
});

export default NewMarkerIcon;
