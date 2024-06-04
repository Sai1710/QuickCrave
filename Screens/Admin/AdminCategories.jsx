import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import NavBar from "../../Components/Custom/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import CategoryCard from "../../Components/Custom/CategoryCard";
import GlobalContext from "../../Context/GlobalContext";
import AddCategory from "../../Components/Admin/AddCategory";

export default AdminCategories = () => {
  const { categories, fetchCategories } = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const renderItem = (itemData) => {
    return <CategoryCard data={itemData.item} role="admin" />;
  };

  useEffect(() => {
    fetchCategories();
    console.log(categories);
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AddCategory
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <NavBar title="QuickCrave" />
      <View className="mx-6 my-2">
        <Text className="font-bold text-xl text-[#047857]">Categories</Text>
      </View>

      {categories?.length !== 0 ? (
        <FlatList
          data={categories}
          renderItem={renderItem}
          numColumns={2}
          className="m-2"
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Categories Found</Text>
        </View>
      )}
      <View className="items-center absolute bottom-10 left-0 right-0 mx-auto">
        <TouchableOpacity
          className="bg-white rounded-full"
          onPress={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          <FontAwesome6 name="circle-plus" size={70} color="#047857" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
