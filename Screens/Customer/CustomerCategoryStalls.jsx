import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import GlobalContext from "../../Context/GlobalContext";
import StallCard from "../../Components/Customer/StallCard";
import CartCard from "../../Components/Customer/CartCard";
import SearchBar from "../../Components/Custom/SearchBar";
import { LinearGradient } from "expo-linear-gradient";

const CustomerCategoryStalls = ({ route }) => {
  const { categoryName, vendors, id } = route.params;
  //   const [stalls, setStalls] = useState(data);
  console.log(vendors);
  const [displayedStalls, setDisplayedStalls] = useState(vendors);
  useEffect(() => {
    setDisplayedStalls(vendors);
    console.log("SetVendors");
  }, [vendors]);
  const { cart } = useContext(GlobalContext);
  function renderItem(itemData) {
    return <StallCard data={itemData.item} categoryId={id} />;
  }
  const handleSearch = (searchInput) => {
    const tempStalls = vendors.filter((item) => {
      return item.stall_name.includes(searchInput);
    });
    setDisplayedStalls(tempStalls);
  };
  return (
    <SafeAreaView className="flex-1 flex-col align-middle justify-between bg-white">
      <LinearGradient
        colors={["#D8F3DC", "#B7E4C7"]}
        className="py-3"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <NavBar title={categoryName} />

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

export default CustomerCategoryStalls;
