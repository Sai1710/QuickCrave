import React, { useContext, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalContext from "../../Context/GlobalContext";

const MenuItemModal = ({ modalVisible, setModalVisible, item }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const [quantity, setQuantity] = useState(1);
  const [itemPresent, setItemPresent] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);

  const { cart } = useContext(GlobalContext);
  useEffect(() => {
    const foundItem = cart?.cart_items?.find(
      (val) => val.food_item_id === item.id
    );
    setQuantity(foundItem ? foundItem.quantity : 1);
    if (foundItem) {
      setItemPresent(true);
      setCartItemId(foundItem.id);
    }
  }, []);
  const { handleAdd, updateItem } = useContext(GlobalContext);

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View
        className=" w-full h-full bg-black bg-opacity-50 flex items-end justify-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          justifyContent: "flex-end",
        }}
      >
        <View className="w-full bg-white rounded-t-3xl p-4">
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
            }}
            className="mx-3 mb-3"
            onPress={() => {
              setModalVisible((prev) => !prev);
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Image
            source={require("../../assets/ChineseFood.jpg")}
            className="w-full h-48 object-cover rounded-xl"
          />
          <View className="flex flex-row justify-between items-center mt-4">
            <View className="flex flex-row items-center">
              <Image
                source={
                  item.item_type === "Veg"
                    ? require("../../assets/VEG.png")
                    : require("../../assets/NONVEG.png")
                }
                className="h-5 w-5 mr-2 mb-4"
              />
              <Text className="text-lg font-bold mb-4">{item.name}</Text>
            </View>
            <Text className="text-lg font-bold text-green-700">
              ₹{item.price}
            </Text>
          </View>
          <View>
            <View>
              <Text className="font-semibold text-base mb-3 border-b-0.5 pb-2">
                SubType
              </Text>
              <View className="flex-row mb-3">
                {item.sub_type.map((item, index) => {
                  return (
                    <Text
                      className="bg-green-800  text-white px-3 font-semibold py-2 mr-2 rounded-2xl"
                      key={index}
                    >
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View>
              <Text className="font-semibold text-base mb-3 border-b-0.5 pb-2">
                Tags
              </Text>
              <View className="flex-row mb-3">
                {item.tags.map((item, index) => {
                  return (
                    <Text
                      className="bg-green-800  text-white px-3 font-semibold py-2 mr-2 rounded-2xl"
                      key={index}
                    >
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View>
              <Text className="font-semibold text-base mb-3 border-b-0.5 pb-2">
                Taste
              </Text>
              <View className="flex-row mb-3">
                {item.taste.map((item, index) => {
                  return (
                    <Text
                      className="bg-green-800  text-white px-3 font-semibold py-2 mr-2 rounded-2xl"
                      key={index}
                    >
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
          <View className="flex flex-row items-center justify-between mt-4">
            <View className="flex flex-row items-center justify-around bg-gray-100 p-2 rounded-lg border-0.5 border-green-700 mr-2">
              <TouchableOpacity
                onPress={() => {
                  if (quantity === 1) {
                    if (itemPresent) {
                      updateItem(cartItemId, item, 0);
                      setModalVisible((prev) => !prev);
                    }
                  }
                  if (quantity > 0) {
                    setQuantity((prev) => prev - 1);
                  }
                }}
              >
                <AntDesign name="minuscircleo" size={24} color="#2F855A" />
              </TouchableOpacity>
              <Text className="font-bold text-lg mx-2">{quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                <AntDesign name="pluscircleo" size={24} color="#2F855A" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center flex-1 justify-center ml-2 bg-green-800 p-2 rounded-lg border-0.5 border-green-700"
              onPress={() => {
                if (itemPresent) {
                  updateItem(cartItemId, item, quantity);
                } else {
                  handleAdd(item, quantity);
                }
                setModalVisible((prev) => !prev);
              }}
            >
              <Text className="font-bold text-lg text-white mx-2">
                Add Item {quantity === 0 ? "" : "₹ " + quantity * item.price}
              </Text>
              <AntDesign name="shoppingcart" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MenuItemModal;
