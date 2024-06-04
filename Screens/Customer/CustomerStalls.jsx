import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import CartCard from "../../Components/Customer/CartCard";
import GlobalContext from "../../Context/GlobalContext";
import SearchBar from "../../Components/Custom/SearchBar";
import { LinearGradient } from "expo-linear-gradient";
import StallCard from "../../Components/Customer/StallCard";

const CustomerStalls = () => {
  const { cart, categories } = useContext(GlobalContext);
  const [stalls, setStalls] = useState();
  const [displayedStalls, setDisplayedStalls] = useState();
  function renderItem(itemData) {
    return <StallCard data={itemData.item} categoryId={-1} />;
  }
  const handleSearch = (searchInput) => {
    const tempStalls = stalls.filter((item) => {
      return item.stall_name.includes(searchInput);
    });
    setDisplayedStalls(tempStalls);
  };
  const fetchStalls = () => {
    const tempStalls = categories.reduce((acc, category) => {
      category.vendors.forEach((vendor) => {
        const existingVendor = acc.find((v) => v.id === vendor.id);
        if (!existingVendor) {
          acc.push(vendor);
          console.log(vendor);
        }
      });
      return acc;
    }, []);
    console.log(tempStalls);
    setStalls(tempStalls);
    setDisplayedStalls(tempStalls);
  };
  useEffect(() => {
    fetchStalls();
  }, []);
  return (
    <SafeAreaView className="flex-col flex-1 align-middle justify-between bg-white">
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
          <Text className="font-bold text-xl text-[#047857]">
            Browse by Stalls
          </Text>
        </View>
        <SearchBar onSearch={handleSearch} />
      </LinearGradient>
      {displayedStalls?.length !== 0 ? (
        <FlatList
          data={displayedStalls}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          className="m-2"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Stalls Found</Text>
        </View>
      )}
      {/* {Object.keys(cart).length !== 0 && <CartCard />} */}
    </SafeAreaView>
  );
};

export default CustomerStalls;
