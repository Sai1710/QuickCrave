import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import NavBar from "../../Components/Custom/Navbar";
import MenuCard from "../../Components/Custom/MenuCard";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddItemModal from "../../Components/Vendor/AddItemModal";

const VendorMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  function renderItem(itemData) {
    return (
      <MenuCard
        item={itemData.item}
        role="vendor"
        getMenu={getMenu}
        index={itemData.index}
      />
    );
  }

  const [menu, setMenu] = useState([]);
  const [displayedMenu, setDisplayedMenu] = useState([]);
  const getCategories = async () => {
    const tempCategories = await AsyncStorage.getItem("categories");
    setCategories(JSON.parse(tempCategories));
    console.log("categories", JSON.parse(tempCategories));
    setCategoryId(categories[0]?.id);
  };
  useEffect(() => {
    getCategories();
  }, []);
  const filterMenu = (type) => {
    if (type === "All") {
      setDisplayedMenu(menu);
      return;
    }
    axios
      .get(`/api/v1/vendor/food_items?category_name=${type}`)
      .then((res) => {
        setDisplayedMenu(res.data.food_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMenu = () => {
    axios
      .get(`/api/v1/vendor/food_items`)
      .then((res) => {
        setMenu(res.data.food_items);
        setDisplayedMenu(res.data.food_items);
        console.log(res.data.food_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMenu();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="QuickCrave" />
      <AddItemModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        getMenu={getMenu}
        categories={categories}
      />
      <View className="mx-6 my-2 flex-row align-middle justify-between">
        <Text className="flex-1 font-bold text-xl text-[#047857] self-center">
          My Menu
        </Text>
        <View className="border flex-1 border-gray-300 rounded">
          <Picker
            selectedValue={categoryId}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              filterMenu(itemValue);
              setCategoryId(itemValue); // Make sure to update the categoryId state
            }}
          >
            <Picker.Item label="All" value="All" key="0" />

            {categories?.map((item, index) => (
              <Picker.Item label={item.name} value={item.name} key={item.id} />
            ))}
          </Picker>
        </View>
      </View>

      {displayedMenu?.length !== 0 ? (
        <FlatList
          data={displayedMenu}
          renderItem={renderItem}
          numColumns={2}
          className="m-2"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Menu Found</Text>
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

export default VendorMenu;
