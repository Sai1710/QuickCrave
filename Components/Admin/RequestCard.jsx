import React, { useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RequestModal from "./RequestModal";
import IP_ADDRESS from "../../config";

const RequestCard = ({ data, handleShow }) => {
  const [modalVisible, setModalVisible] = useState(false);
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
    >
      <RequestModal
        visible={modalVisible}
        setVisible={setModalVisible}
        stall={data}
        handleShow={handleShow}
      />
      <Image
        source={{
          uri: data.stall_logo_url
            ? data.stall_logo_url.replace("localhost", IP_ADDRESS)
            : "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc",
        }}
        className={`w-full h-44 rounded mb-2`}
      />
      <View className="flex-row align-middle justify-between m-1">
        <Text className={`text-sm my-1 text-center font-bold text-[#047857]`}>
          {data.stall_name}
        </Text>
        <TouchableOpacity
          className="self-center bg-[#047857] p-1 rounded"
          onPress={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          <Ionicons name="eye" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default RequestCard;
