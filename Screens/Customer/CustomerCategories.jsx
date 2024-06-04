import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import GlobalContext from "../../Context/GlobalContext";
import CartCard from "../../Components/Customer/CartCard";
import CategoryCard from "../../Components/Custom/CategoryCard";
import SearchBar from "../../Components/Custom/SearchBar";
import { LinearGradient } from "expo-linear-gradient";

const CustomerCategories = () => {
  const { categories, cart } = useContext(GlobalContext);
  const [displayedCategories, setDisplayedCategories] = useState(categories);
  useEffect(() => {
    setDisplayedCategories(categories);
  }, [categories]);

  const handleSearch = (searchInput) => {
    const tempCategories = categories.filter((item) => {
      return item.name.includes(searchInput);
    });
    setDisplayedCategories(tempCategories);
  };
  const renderItem = (itemData) => {
    return <CategoryCard data={itemData.item} role="customer" />;
  };
  console.log("cart", cart);
  return (
    <SafeAreaView className="flex-col align-middle justify-between flex-1 bg-white">
      <LinearGradient
        colors={["#D8F3DC", "#B7E4C7"]}
        className="py-3"
        style={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <NavBar title="QuickCrave" />
        <View className="mx-6 my-2">
          <Text className="font-bold text-xl text-[#047857]">Categories</Text>
        </View>
        <SearchBar onSearch={handleSearch} />
      </LinearGradient>
      {displayedCategories?.length !== 0 ? (
        <FlatList
          data={displayedCategories}
          renderItem={renderItem}
          numColumns={2}
          className="m-2 flex-1"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Categories Found</Text>
        </View>
      )}
      {/* {Object.keys(cart).length !== 0 && <CartCard />} */}
    </SafeAreaView>
  );
};

export default CustomerCategories;
