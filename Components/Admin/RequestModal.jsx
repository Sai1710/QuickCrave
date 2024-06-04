import React from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import axios from "axios";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";

const RequestModal = ({ visible, setVisible, stall, handleShow }) => {
  const {
    first_name,
    last_name,
    franchise_details,
    email,
    categories,
    status,
    id,
  } = stall;

  const handleReject = () => {
    axios
      .post(`/api/v1/admin/reject_request/${id}`)
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Vendor Successfully Rejected",
          button: "Close",
        });
        setVisible((prev) => !prev);
        handleShow();
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Failed",
          textBody: "Vendor couldn't be Rejected",
          button: "Close",
        });
      });
  };
  const handleAccept = () => {
    axios
      .post(`/api/v1/admin/approve_request/${id}`)
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Vendor Successfully Approved",
          button: "Close",
        });
        setVisible((prev) => !prev);
        handleShow();
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Failed",
          textBody: "Vendor couldn't be Approved",
          button: "Close",
        });
      });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View
        className={`flex-1 justify-center items-center bg-black bg-opacity-50`}
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View className={`bg-white rounded-lg p-6 w-80`}>
          <View className="flex-row align-middle justify-between p-3">
            <Text className="font-extrabold text-xl text-[#047857]">
              Vendor Details
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
              }}
              onPress={() => {
                setVisible((prev) => !prev);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="p-3">
            <View className="flex-row align-middle justify-between">
              <Text className={`mb-2`}>Name:</Text>
              <Text className="font-semibold">
                {first_name} {last_name}
              </Text>
            </View>
            <View className="flex-row align-middle justify-between">
              <Text className={`mb-2`}>Franchise Details:</Text>
              <Text className="font-semibold">{franchise_details}</Text>
            </View>
            <View className="flex-row align-middle justify-between">
              <Text className={`mb-2`}>Email:</Text>
              <Text className="font-semibold">{email}</Text>
            </View>
            <View className={`mb-4`}>
              <Text className={`mb-2`}>Categories:</Text>
              {stall.type_of_categories?.map((category, index) => (
                <Text key={index} className={`ml-2 font-semibold text-right`}>
                  - {category}
                </Text>
              ))}
            </View>
            {status === "pending" && (
              <View className="flex-row mr-2 justify-end">
                <TouchableOpacity
                  className="border rounded m-1 p-2 border-red-950"
                  onPress={() => {
                    handleReject();
                  }}
                >
                  <Entypo name="cross" size={24} color="darkred" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="border rounded m-1 p-2"
                  onPress={() => {
                    handleAccept();
                  }}
                >
                  <Entypo name="check" size={24} color="green" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestModal;
