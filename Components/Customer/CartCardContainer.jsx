import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import CartItemCard from "./CartItemCard";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import RazorpayCheckout from "react-native-razorpay";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import GlobalContext from "../../Context/GlobalContext";

const CartCardContainer = ({ stall, items }) => {
  const [totalPrice, setTotalPrice] = useState(
    items.reduce((total, item) => total + item.price, 0)
  );
  const { getCart } = useContext(GlobalContext);
  useEffect(() => {
    setTotalPrice(items.reduce((total, item) => total + item.price, 0));
    setTotalItems(
      items.reduce((quantity, item) => quantity + item.quantity, 0)
    );
  }, [items]);
  const [totalItems, setTotalItems] = useState(
    items.reduce((quantity, item) => quantity + item.quantity, 0)
  );
  const [orderId, setOrderId] = useState(null);

  const renderItem = (itemData) => {
    return <CartItemCard item={itemData.item} />;
  };
  const navigation = useNavigation();

  const createOrder = async () => {
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: "Please Wait",
      textBody: "Redirecting you to Razorpay",
    });
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();

    formData.append("order[vendor_id]", stall.id);
    formData.append("order[amount_to_be_paid]", Number(totalPrice));
    formData.append("order[total_items]", parseInt(totalItems, 10));
    await axios
      .post(`/api/v1/customer/orders`, formData, { headers })
      .then((res) => {
        console.log(res);

        const order_id = res.data.order.razorpay_order_id;
        setOrderId(res.data.order.razorpay_order_id);
        console.log(res.data.order.razorpay_order_id);
        console.log(stall.razorpay_key_id);
        console.log(totalPrice);
        if (res.data.order.status === "pending") {
          var options = {
            description: "FoodStall Payment",
            image:
              "https://imgs.search.brave.com/ZqdNdg_wQCwVYgHnGGH8P9CUnFApJifOMn_Rz35yy5w/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvMjY5Ny8yNjk3/ODAzLnBuZw",
            currency: "INR",
            key: stall.razorpay_key_id,
            amount: totalPrice * 100,
            name: "QuickCrave",
            order_id: res.data.order.razorpay_order_id,

            theme: { color: "#047857" },
          };
          RazorpayCheckout.open(options)
            .then((res) => {
              console.log(res);
              const title = res.razorpay_order_id
                ? res.razorpay_order_id
                : "No OrderId";
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Payment Succesful",
                textBody: "You will notified when your order is ready",
                autoClose: true,
              });
              axios
                .post(`/api/v1/customer/orders/callback`, {
                  order_id: order_id,
                  payment_id: res.razorpay_payment_id,
                })
                .then((response) => {
                  if (response.status === 200) {
                    getCart();
                  }
                })
                .catch((error) => {
                  console.log(error.message);
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Payment Failed",
                    textBody: "Please try again later",
                    autoClose: true,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Razorpay Error",
                textBody: "Payment Unsuccessful",
                autoClose: true,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return (
    <View className="m-4 border-0.5 p-3 rounded border-green-800">
      <View className="flex-row align-middle justify-between mb-3">
        <Text className="text-lg font-medium text-green-800  mx-1 self-center">
          {stall.stall_name}
        </Text>
        <TouchableOpacity
          className="bg-white rounded-full self-center"
          onPress={() => {
            navigation.navigate("StallMenu", { stall: stall, categoryId: -1 });
          }}
        >
          <FontAwesome6 name="circle-plus" size={40} color="#047857" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View className="flex-row justify-between align-middle my-3 mx-1">
        <Text className="font-semibold">Grand Total:</Text>
        <Text className="font-bold">$ {totalPrice}</Text>
      </View>
      <TouchableOpacity
        className="bg-green-800 rounded-lg p-2"
        onPress={createOrder}
      >
        <Text className="text-white text-lg font-bold text-center">Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCardContainer;
