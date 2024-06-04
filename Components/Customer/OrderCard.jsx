import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5 icons

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (Array.isArray(order.food_items_details)) {
      order?.food_items_details?.forEach((item) => {
        totalPrice += item.amount * item.quantity;
      });
      setTotalPrice(totalPrice);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  return (
    <View className="p-4 mb-4 border rounded-lg border-gray-300 bg-white border-green-700 border-opacity-50">
      {order.payment_status === "paid" ? (
        <Text className="absolute top-2 right-2 bg-green-500 py-1 px-2 rounded-md text-white font-bold">
          Paid
        </Text>
      ) : (
        <Text className="absolute top-2 right-2 bg-red-500 py-1 px-2 rounded-md text-white font-bold">
          Unpaid
        </Text>
      )}
      <Text className="text-lg font-bold">
        {order.status === "pending" || order.status === "rejected"
          ? "Order Number"
          : "Token Number"}
        : {order?.token_number}
      </Text>
      <Text className="text-base">
        Date: {new Date(order.created_at).toLocaleString()}
      </Text>
      <Text
        className={`text-base ${
          order.status === "pending"
            ? "text-yellow-700"
            : order.status === "rejected"
            ? "text-red-700"
            : order.status === "approved"
            ? "text-green-700"
            : order.status === "preparing"
            ? "text-blue-700"
            : "text-green-900"
        } font-bold`}
      >
        {order.status === "pending"
          ? "Pending"
          : order.status === "rejected"
          ? "Rejected"
          : order.status === "approved"
          ? "Approved"
          : order.status === "preparing"
          ? "Preparing"
          : "Prepared"}
      </Text>
      {expanded && (
        <View className="mt-2">
          <Text className="text-lg font-bold mb-2">Items:</Text>
          {Array.isArray(order.food_items_details) &&
            order?.food_items_details?.map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <View
                  style={{
                    borderColor: item.category === "Veg" ? "green" : "red",
                  }}
                  className="rounded-full border mr-2"
                >
                  <View
                    style={{
                      backgroundColor:
                        item.category === "Veg" ? "green" : "red",
                    }}
                    className="w-[10] h-[10] rounded-full m-[2]"
                  ></View>
                </View>
                <Text className="font-bold">{item.name}</Text>
                <Text className="mx-2 font-bold">x{item.quantity}</Text>
                <Text className="flex-1 font-bold text-right">
                  ${item.amount}
                </Text>
              </View>
            ))}
          <Text className="text-lg font-bold mt-2">
            Total Price: ${totalPrice}
          </Text>
        </View>
      )}
      <TouchableOpacity
        className="self-end p-2 bg-green-700 rounded-md mt-2"
        onPress={() => setExpanded(!expanded)}
      >
        <Text className="text-white font-bold">
          {expanded ? "Hide Details" : "View Details"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderCard;
