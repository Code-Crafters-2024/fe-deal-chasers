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
/*import * as ImagePicker from "expo-image-picker"; */

const PostDeal = () => {
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

  /*const [selectedImage, setSelectedImage] = useState(null); */

  useEffect(() => {
    fetchCategories();
  }, [selectedCategoryId]);

  const handleCategoryChange = (value) => {
    setSelectedCategoryId(value);
  };

  const handleReset = () => {
    setSelectedCategoryId(null);
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw error;
      }
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
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
        },
      ]);
      if (error) {
        console.error("Error posting deal:", error.message);
        Alert.alert("Error", "Failed to post deal");
      } else {
        Alert.alert("Success", "Deal posted successfully");
        setTitle("");
        setBody("");
        setPrice("");
        setLocation([53.4460907260892, -2.301016365725]); //location reset placeholder
      }
    } catch (error) {
      console.error("Error posting deal:", error.message);
      Alert.alert("Error", "Failed to post deal");
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

  const pickImageAsync = async () => {
    /*
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
    */
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

      <View>
        <TouchableOpacity activeOpacity={0.9} onPress={() => setShow(true)}>
          <TextInput
            editable={false}
            placeholder="YYYY-MM-DD (2022-05-22)"
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
      <Button
        title="Choose a photo"
        theme="primary"
        label="Choose a photo"
        onPress={pickImageAsync}
      />
      <View style={styles.dropdownContainer}>
        <View style={[styles.dropdown, styles.categoryDropdown]}>
          <Picker
            selectedValue={selectedCategoryId}
            onValueChange={(itemValue) => handleCategoryChange(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Category" value={null} />
            {categories.map((category) => (
              <Picker.Item
                key={category.category_id}
                label={category.name}
                value={category.category_id}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Button title="Submit Deal" onPress={handleSubmit} />
    </View>
  );
};
export default PostDeal;
