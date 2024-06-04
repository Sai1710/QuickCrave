import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const CustomModal = ({
  visible,
  title,
  buttonTitle,

  setVisible,
  onButtonClick,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible((prev) => !prev);
      }}
    >
      <View
        className={`flex-1 justify-center items-center bg-black p-3`}
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <View className={`bg-white rounded-lg p-6 w-80`}>
          <Text className={`text-base text-center font-bold mb-4`}>
            {title}
          </Text>
          <View className="flex-row align-middle justify-center">
            <TouchableOpacity
              className={`bg-gray-300 rounded-lg py-2 px-4 items-center flex-1 mx-1`}
              onPress={() => {
                setVisible((prev) => !prev);
              }}
            >
              <Text className={`text-white font-bold`}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`rounded-lg py-2 px-4 items-center flex-1 mx-1  ${
                buttonTitle === "Delete" ? "bg-red-700" : "bg-green-700"
              }`}
              onPress={() => {
                onButtonClick();
                setVisible((prev) => !prev);
              }}
            >
              <Text className={`text-white font-bold`}>{buttonTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
