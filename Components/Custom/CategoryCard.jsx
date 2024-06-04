import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import GlobalContext from "../../Context/GlobalContext";
import IP_ADDRESS from "../../config";

const CategoryCard = ({ data, role }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { fetchCategories } = useContext(GlobalContext);
  const deleteCategory = () => {
    axios
      .delete(`/api/v1/admin/categories/${data.id}`)
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Category Successfully Deleted",
          button: "Close",
        });
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Failed",
          textBody: "Category couldn't be Deleted",
          button: "Close",
        });
      });
  };
  return (
    <Pressable
      className={`flex-1 bg-white rounded shadow-md p-2 m-2`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={() => {
        if (role === "customer") {
          navigation.navigate("StallsList", {
            categoryName: data.name,
            vendors: data.vendors,
            id: data.id,
          });
        }
      }}
    >
      <CustomModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Are you sure you want to delete this category?"
        buttonTitle="Delete"
        buttonColor="red"
        onButtonClick={deleteCategory}
      />
      {role !== "admin" ? (
        <Image
          source={{
            uri: data.image
              ? data.image.replace("localhost", IP_ADDRESS)
              : "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc",
          }}
          className={`w-full h-44 rounded mb-2`}
        />
      ) : (
        <Image
          source={{
            uri: data.image_url
              ? data.image_url.replace("localhost", IP_ADDRESS)
              : "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc",
          }}
          className={`w-full h-44 rounded mb-2`}
        />
      )}
      <View className="flex-row align-middle justify-between m-1">
        <Text className={`text-sm my-1 text-center font-bold text-[#047857]`}>
          {data.name}
        </Text>
        {role === "admin" && (
          <TouchableOpacity
            className="self-center"
            onPress={() => {
              setModalVisible((prev) => !prev);
            }}
          >
            <MaterialIcons name="delete" size={20} color="#f10000" />
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

export default CategoryCard;
