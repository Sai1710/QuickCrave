import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo for icons

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View className="flex-row items-center border border-gray-300  bg-white rounded-lg p-2 mx-6 my-2">
      <Ionicons name="search" size={24} color="#047857" className="ml-2" />
      <TextInput
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
        className="flex-1 px-2"
      />
    </View>
  );
};

export default SearchBar;
