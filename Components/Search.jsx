import React from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles";

const Search = ({ searchQuery, setSearchQuery, onSearch }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search deals"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    );
};

export default Search;
