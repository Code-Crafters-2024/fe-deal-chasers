import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../lib/supabase";
import { styles } from "../styles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';
const placeholderImageViewerImage = require("../assets/icon.png");
import ImageViewer from "./ImageViewer";

const PostDeal = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState([53.4460907260892, -2.301016365725]); //location placeholder
  const [author, setAuthor] = useState("caca2a4c-3ea8-4059-aec8-18e4d3883552");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [expiry, setExpiry] = useState("");
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [selectedCategoryId]);

  useEffect(() => {
    fetchAuthenticatedUser(); // Fetch authenticated user on component mount
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategoryId(value);
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw new Error("Failed to fetch categories");
      }
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      Alert.alert("Error", "Failed to fetch categories. Please try again later.");
    }
  };

  const fetchAuthenticatedUser = async () => {
    try {
      const user = supabase.auth.user;
      if (user) {
        setAuthor(user.id);
      }
    } catch (error) {
      console.error("Error fetching authenticated user:", error.message);
      Alert.alert("Error", "Failed to fetch authenticated user.");
    }
  };


  const handleSubmit = async () => {
    if (!title || !body || !price || !location || !selectedGalleryImage) {
      Alert.alert("Error", "Please fill in all fields and select an image");
      return;
    }
    try {
      const { data, error } = await supabase.from("deals").insert([
        {
          title,
          body,
          price: parseFloat(price),
          location,
          category_id: selectedCategoryId,
          author,
          expiry: expiry,
          image_url: imageUrl,
        },
      ]);
  
      if (error) {
        console.error("Error posting deal:", error.message);
        Alert.alert("Error", "Failed to post deal. Please try again later.");
      } else {
        Alert.alert("Success", "Deal posted successfully");
        setTimeout(() => {
          navigation.navigate('Deals');
        }, 2000);
        // Clear all fields
        setTitle("");
        setBody("");
        setPrice("");
        setLocation([53.4460907260892, -2.301016365725]);
        setSelectedCategoryId(null);
        setExpiry("");
        setSelectedGalleryImage("");
        setImageUrl("");
        setDate(new Date());
      }
    } catch (error) {
      console.error("Error posting deal:", error.message);
      Alert.alert("Error", "Failed to post deal. Please try again later.");
    }
  };

  const dateOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (event.type == "dismissed") {
      setShow(false);
      return null;
    } else {
      setShow(false);
      let tempDate = new Date(currentDate);
      let expiryDate =
        tempDate.getFullYear() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getDate();
      setExpiry(expiryDate);
      return;
    }
  };

  const pickGalleryImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      if (result.assets.length > 0 && result.assets[0].uri) {
        setSelectedGalleryImage(result.assets[0].uri);
        setImageUrl(result.assets[0].uri);
        console.log(result);
      } else {
        console.log("No image URI available");
      }
    }
  };

  const CustomButton = ({ title, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.dropdownLabel}>Category:</Text>
      <View style={styles.dropdownContainer}>
        <View style={[styles.dropdown, styles.categoryDropdown]}>
          <Picker
            selectedValue={selectedCategoryId}
            onValueChange={(itemValue) => handleCategoryChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="" value={null} />
            {categories.map((category) => (
              <Picker.Item
                key={category.category_id}
                label={category.name}
                value={category.category_id}
                itemStyle={styles.pickerItemLabel}
              />
            ))}
          </Picker>
        </View>
      </View>
      <Text style={styles.formLabel}>Description:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Enter description"
        multiline
        value={body}
        onChangeText={setBody}
      />
      <Text style={styles.formLabel}>Price:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <View style={styles.datePickerContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => setShow(true)}>
          <TextInput
            style={styles.dateInput}
            editable={false}
            placeholder="Click to select an expiry date"
            value={expiry}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            display="default"
            onChange={dateOnChange}
            minimumDate={today}
          />
        )}
      </View>
      <ImageViewer placeholderImageSource={placeholderImageViewerImage} selectedImage={selectedGalleryImage}></ImageViewer>
      <CustomButton title="Select Photo" onPress={pickGalleryImageAsync} />
      <CustomButton title="Submit Deal" onPress={handleSubmit} />
    </View>
  );
};
export default PostDeal;
