import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FilterModal = ({
  modalVisible,
  setModalVisible,
  categories,
  selectedCategory,
  setSelectedCategory,
  applyFilter,
}) => {
  console.log(selectedCategory);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible((prev) => !prev);
      }}
    >
      <View
        className="flex-1 justify-end"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <View className="bg-white rounded-lg mx-3" style={{ marginBottom: 60 }}>
          <View className="flex-row align-middle justify-around border-b-0.5 p-2">
            <Text className="text-center font-bold flex-1 text-[#1d543a] text-xl ml-6">
              Filter
            </Text>
            <Pressable
              style={{
                alignSelf: "center",
              }}
              onPress={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </Pressable>
          </View>
          {categories ? (
            categories.map((item) => {
              return (
                <TouchableOpacity
                  className="flex-row align-middle justify-center p-2 border-b-0.5"
                  onPress={() => {
                    setSelectedCategory(item.id);
                  }}
                >
                  <Text className={`text-base font-semibold text-black `}>
                    {item.name}
                  </Text>
                  {selectedCategory == item.id && (
                    <FontAwesome5
                      name="check"
                      size={16}
                      color="black"
                      style={{
                        alignSelf: "center",
                        marginLeft: 10,
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            })
          ) : (
            <></>
          )}
          <TouchableOpacity
            className="flex-row align-middle justify-center p-2 border-b-0.5"
            onPress={() => {
              setSelectedCategory(-1);
            }}
          >
            <Text className={`self-center text-base font-semibold text-black `}>
              All
            </Text>
            {selectedCategory == -1 && (
              <FontAwesome5
                name="check"
                size={16}
                color="black"
                style={{
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              />
            )}
          </TouchableOpacity>
          {/* <FlatList
            data={categories}
            renderItem={(itemData) => {
              return (
                
              );
            }}
          /> */}
          <View className="flex-row align-middle justify-center">
            <TouchableOpacity
              className="p-3 flex-1 m-2 bg-gray-300 rounded-lg"
              onPress={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <Text className="text-center font-bold text-base">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 flex-1 m-2 bg-green-800 rounded-lg"
              onPress={() => {
                applyFilter(selectedCategory);
                setModalVisible((prev) => !prev);
              }}
            >
              <Text className="text-center font-bold text-base text-white">
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
