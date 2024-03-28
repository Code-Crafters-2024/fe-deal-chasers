import React from "react";
import { styles } from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image, TouchableOpacity, Pressable, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;


export default function DealsListCard({ item, index, categories }) {
  let itemCategory = ''

  for(let i=0; i<categories.length; i++){
    if(categories[i].category_id === item.category_id){
      itemCategory = categories[i].name
    }
  }

  function onShare() {
    console.log("share button pressed");
  }

  function formatDate(created_at) {
    return new Date(created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <View style={extraStyles.card}> 
      <Image
        source={{ uri: item.image_url }}
        style={extraStyles.cardImage}
        resizeMode="cover"
      />
      <View style={extraStyles.textContent}>
        <Text style={styles.dealsTitle}>{item.title}</Text>
        <Text style={styles.dealsText}>Category: {itemCategory}</Text>
        <Text style={styles.dealsText}>
          Added: {formatDate(item.created_at)}
        </Text>
        <Text style={styles.dealsText}>Votes: {item.votes}</Text>
        <Text style={[styles.dealsText, styles.priceText]}>
          Price: £{item.price}
        </Text>
        <View style={styles.shareContainer}>
          <Pressable onPress={onShare}>
            <Icon name="share" size={24} color="#FF6347" />
          </Pressable>
        </View>
        <TouchableOpacity
          style={styles.getDealButton}
          onPress={() => handleGetDeal(item.link)}
        >
          <Text style={styles.getDealText}>Get Deal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const extraStyles = StyleSheet.create({
    card: {
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
      },cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
      },
      textContent: {
        flex: 2,
        padding: 10,
      },
})