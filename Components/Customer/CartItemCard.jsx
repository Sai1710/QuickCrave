import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import MenuItemModal from "./MenuItemModal";

const CartItemCard = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const foodItem = item.food_item;
  const link = "https://www.happyeater.com/images/default-food-image.jpg";

  return (
    <View
      className={`flex-row items-center bg-white rounded-lg mb-4 shadow-md border border-gray-300`}
    >
      <MenuItemModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item.food_item}
      />
      <Image source={{ uri: link }} className={`w-20 h-20 rounded-lg m-2`} />
      <View className={`flex-1 p-2`}>
        <Text className={`font-medium text-base mb-2`}>{foodItem.name}</Text>
        <Text className={`text-sm font-semibold text-green-800`}>
          $ {foodItem.price}
        </Text>
      </View>
      <View
        className={`flex-row items-center justify-between bg-gray-100 rounded-lg border-0.5 border-green-600 p-1 m-2`}
      >
        <TouchableOpacity onPress={() => setModalVisible((prev) => !prev)}>
          <AntDesign name="minuscircleo" color="#2F855A" size={20} />
        </TouchableOpacity>
        <Text className={`font-bold text-base mx-2`}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => setModalVisible((prev) => !prev)}>
          <AntDesign name="pluscircleo" color="#2F855A" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemCard;
