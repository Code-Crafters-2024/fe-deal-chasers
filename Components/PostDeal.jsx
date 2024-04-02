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


const PostDeal = () => {
  const navigation = useNavigation(); 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState([53.4460907260892, -2.301016365725]); //location placeholder
  const [author, setAuthor] = useState(1); //author placeholder
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [expiry, setExpiry] = useState("");
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showImageUrlPicker, setShowImageUrlPicker] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [selectedUrlImage, setSelectedUrlImage] = useState(
    "https://plus.unsplash.com/premium_photo-1664201889896-6a42c19e953a?q=80&w=1536&auto=f[…].3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const [imageUrl, setImageUrl] = useState(""); // Add state for image URL
  // const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [selectedCategoryId]);
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
  

  const handleSubmit = async () => {
    if (!title || !body || !price || !location) {
      Alert.alert("Error", "Please fill in all fields");
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
        setTitle("");
        setBody("");
        setPrice("");
        setLocation([53.4460907260892, -2.301016365725]);
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
    try {
      const { cancelled, assets } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      
      const avatarFile = selectedGalleryImage
const { data, error } = await supabase
  .storage
  .from('avatars')
  .upload('public/avatar1.png', avatarFile, {
    cacheControl: '3600',
    upsert: false
  })
      if (!cancelled && assets.length > 0) {
        setSelectedGalleryImage(assets[0].uri);
      } else {
        console.log("User canceled image selection or no image was selected.");
      }
    } catch (error) {
      console.error("Error picking image from gallery:", error);
      alert("Failed to pick image from gallery. Please try again.");
    }
  };
  

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

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

      {/* <View >
        <Button title="add image url" onPress={toggleModal} />
        <Modal isVisible={isModalVisible}>
          <View >
            <TextInput
              style={[styles.input, { backgroundColor: 'white' }]}
              placeholder="Enter image URL"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <Button title="Add" onPress={toggleModal} />
          </View>
        </Modal>
      </View> */}
      <CustomButton title="Select Photo" onPress={pickGalleryImageAsync} />
      <CustomButton title="Submit Deal" onPress={handleSubmit} />
    </View>
  );
};
export default PostDeal;
