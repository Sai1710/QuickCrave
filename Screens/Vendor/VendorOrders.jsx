import React, { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import OrderCard from "../../Components/Vendor/OrderCard";
import axios from "axios";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [status, setStatus] = useState("pending");
  const getOrders = async () => {
    await axios
      .get("/api/v1/vendor/orders")
      .then((res) => {
        const sortedOrders = res.data.orders.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setOrders(sortedOrders);
        const tempOrders = sortedOrders.filter((item) => {
          return item.status === "pending";
        });
        setDisplayedOrders(tempOrders);
        console.log("xjsxj", sortedOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterOrders = (status) => {
    if (status === "pending") {
      const tempOrders = orders.filter((item) => {
        return item.status === "pending";
      });
      setDisplayedOrders(tempOrders);
    } else {
      const tempOrders = orders.filter((item) => {
        return item.status !== "pending";
      });
      setDisplayedOrders(tempOrders);
    }
  };
  useEffect(() => {
    filterOrders(status);
  }, [status]);
  useEffect(() => {
    getOrders();
  }, []);
  const renderOrders = (itemData) => {
    return <OrderCard order={itemData.item} getOrders={getOrders} />;
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="QuickCrave" />
      <View className={` p-4 flex-row align-middle justify-between mx-2`}>
        <Text className={`text-green-800 text-xl font-bold flex-1 self-center`}>
          Orders
        </Text>
      </View>
      <View className="p-2">
        <View className="flex-row align-middle justify-around">
          <TouchableOpacity
            className={`m-2 flex-1 p-2 rounded ${
              status === "pending" ? "border-b-2 border-green-700" : ""
            }`}
            onPress={() => {
              setStatus("pending");
            }}
          >
            <Text className="text-green-700 text-center font-bold text-xl">
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`m-2 flex-1 p-2 rounded ${
              status === "completed" ? "border-b-2 border-green-700" : ""
            }`}
            onPress={() => {
              setStatus("completed");
            }}
          >
            <Text className="text-green-700 text-center font-bold text-xl">
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {displayedOrders?.length !== 0 ? (
        <FlatList
          renderItem={renderOrders}
          numColumns={1}
          data={displayedOrders}
          className="mx-3 p-1"
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Orders Found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default VendorOrders;
