import React, { useContext, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import axios from "axios";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import * as ImagePicker from "expo-image-picker";
import GlobalContext from "../../Context/GlobalContext";

const AddCategory = ({ modalVisible, setModalVisible }) => {
  const [category, setCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const { fetchCategories } = useContext(GlobalContext);
  const resetForm = () => {
    setCategory("");
    setCategoryImage(null);
  };
  const addCategory = () => {
    const formData = new FormData();
    formData.append("category[name]", category);
    formData.append("category[image]", {
      uri: categoryImage.uri,
      type: categoryImage.mimeType,
      name: categoryImage.fileName,
    });
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .post("/api/v1/admin/categories", formData, { headers })
      .then((res) => {
        console.log(res.message);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Category Successfully Added",
          button: "Close",
        });
        resetForm();
        fetchCategories();
        setModalVisible((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Failed",
          textBody: "Please try sometime later",
          button: "Close",
        });
      });
  };
  const uploadImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      copyToCacheDirectory: true,
    });
    setCategoryImage(image.assets[0]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View
        className={`flex-1 justify-center items-center bg-black bg-opacity-50`}
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View className={`bg-white rounded-lg p-4 w-80`}>
          <View className="flex-row align-middle justify-between p-3">
            <Text className="font-extrabold text-xl text-[#047857]">
              Add Category
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
              }}
              onPress={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row align-middle justify-center">
            <TextInput
              className={`border border-gray-300 rounded p-2 ml-3 mr-1 my-2 flex-1`}
              value={category}
              onChangeText={setCategory}
              placeholder="Category"
            />
            <TouchableOpacity
              className={`bg-[#047857] rounded flex-2 p-2 mr-3 ml-1 my-2`}
              onPress={uploadImage}
            >
              {!categoryImage ? (
                <MaterialCommunityIcons
                  name="image-plus"
                  size={24}
                  color="white"
                />
              ) : (
                <Ionicons
                  name="checkmark-done-circle-sharp"
                  size={24}
                  color="white"
                />
              )}
            </TouchableOpacity>
          </View>
          <View className={`flex-row justify-between`}>
            <TouchableOpacity
              onPress={addCategory}
              className={`bg-[#047857] rounded flex-1 mx-3 py-3 mt-3`}
            >
              <Text className={`text-white font-semibold text-center`}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCategory;
