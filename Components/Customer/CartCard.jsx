import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const { height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../Context/GlobalContext";

export default function CartCard() {
  const navigation = useNavigation();

  const { cart, deleteCart } = useContext(GlobalContext);
  return (
    <Pressable
      className="flex-row items-center align-middle justify-between bg-green-900 p-4  border border-green-700  mx-auto z-10 w-[100%] opacity-95"
      onPress={() => {
        navigation.navigate("CustomerCart");
      }}
    >
      <View className="flex-row items-center justify-center">
        <Text className="font-bold text-lg text-white text-center">
          {cart?.cart_items?.length} items in cart
        </Text>
        <AntDesign name="shoppingcart" color="#fff" size={30} />
      </View>
      <TouchableOpacity onPress={deleteCart}>
        <AntDesign name="close" size={20} color="white" />
      </TouchableOpacity>
    </Pressable>
  );
}
