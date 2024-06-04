import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import NavBar from "../../Components/Custom/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../../Components/Customer/OrderCard";
import axios from "axios";

const CustomerProfile = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    await axios
      .get("/api/v1/customer/orders")
      .then((res) => {
        const sortedOrders = res.data.orders.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setOrders(sortedOrders);

        console.log(sortedOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);
  const logOut = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: "LoginPage" }, //to go to initial stack screen
        ],
      })
    );
  };
  const renderOrders = (itemData) => {
    return <OrderCard order={itemData.item} />;
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="QuickCrave" />
      {orders?.length !== 0 ? (
        <FlatList
          renderItem={renderOrders}
          numColumns={1}
          data={orders}
          className="mx-3"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Orders Found</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={logOut}
        className="p-4 bg-red-500 text-white rounded-md"
      >
        <Text className="text-center text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomerProfile;
