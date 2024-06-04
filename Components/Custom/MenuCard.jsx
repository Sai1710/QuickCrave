import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import MenuItemModal from "../Customer/MenuItemModal";
import axios from "axios";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import AddItemModal from "../Vendor/AddItemModal";
import CustomModal from "./CustomModal";
const MenuCard = ({ item, role, getMenu, index }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const deleteItem = () => {
    axios
      .delete(`/api/v1/vendor/food_items/${item.id}`)
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Item Deleted",
          button: "Close",
        });
        getMenu();
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Failed",
          textBody: "Menu couldn't be Deleted",
          button: "Close",
        });
      });
  };

  return (
    <View className={`p-4 border border-gray-300 rounded mt-4 mx-2 flex-1`}>
      {role === "customer" && (
        <MenuItemModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          item={item}
        />
      )}
      {role !== "customer" && (
        <AddItemModal
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          item={item}
          getMenu={getMenu}
          mode="edit"
        />
      )}
      {role !== "customer" && (
        <CustomModal
          visible={modalVisible}
          setVisible={setModalVisible}
          title="Are you sure you want to delete this Item?"
          buttonTitle="Delete"
          buttonColor="red"
          onButtonClick={deleteItem}
        />
      )}
      <View className={`flex-row justify-between items-center mb-2`}>
        <View
          style={{
            borderColor: item.item_type === "Veg" ? "green" : "red",
          }}
          className="rounded-full border"
        >
          <View
            style={{
              backgroundColor: item.item_type === "Veg" ? "green" : "red",
            }}
            className="w-[10] h-[10] rounded-full m-[2]"
          ></View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (role !== "customer") {
              setEditModalVisible((prev) => !prev);
            } else {
              setFavorite((prev) => !prev);
            }
          }}
        >
          {role == "customer" ? (
            <MaterialIcons
              name={!favorite ? "favorite-border" : "favorite"}
              size={20}
              color={!favorite ? "black" : "red"}
            />
          ) : (
            <MaterialIcons name="edit" size={24} color="#2F855A" />
          )}
        </TouchableOpacity>
      </View>
      <View className={`mb-2`}>
        <Image
          source={require("../../assets/ChineseFood.jpg")}
          className={`h-36 w-full rounded-full`}
        />
      </View>
      <View className={`mt-2`}>
        <View className={`flex-row justify-between items-center`}>
          <Text className={`text-[15px] font-semibold`}>{item.name}</Text>
        </View>
        <View className={`flex-row justify-between items-center`}>
          <Text className={`text-green-800 font-semibold text-sm`}>
            $ {item.price}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (role !== "customer") {
                deleteItem();
              } else {
                setModalVisible((prev) => !prev);
              }
            }}
          >
            {role == "customer" ? (
              <Ionicons name="add-circle" color="#2F855A" size={30} />
            ) : (
              <MaterialIcons name="delete" size={20} color="#f10000" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuCard;
