import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import RequestCard from "../../Components/Admin/RequestCard";
import axios from "axios";

const AdminRequests = () => {
  const [status, setStatus] = useState("pending");
  const [requests, setRequests] = useState([]);

  const getRequests = () => {
    axios
      .get(`/api/v1/admin/requests?status=${status}`)
      .then((res) => {
        console.log(res);
        setRequests(res.data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequests();
  }, [status]);
  const renderItem = (itemData) => {
    return <RequestCard data={itemData.item} handleShow={getRequests} />;
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="QuickCrave" />
      <View className="mx-6 my-3">
        <Text className="font-bold text-xl text-[#047857]">
          Vendor Requests
        </Text>
      </View>
      <View className="m-2 p-2">
        <View className="flex-row align-middle justify-around">
          <TouchableOpacity
            className={`m-2 flex-1 p-2 rounded ${
              status === "pending" ? "bg-[#047857]" : "bg-[#ccc6c5]"
            }`}
            onPress={() => {
              setStatus("pending");
            }}
          >
            <Text className="text-white text-center font-semibold">
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`m-2 flex-1 p-2 rounded ${
              status === "approved" ? "bg-[#047857]" : "bg-[#ccc6c5]"
            }`}
            onPress={() => {
              setStatus("approved");
            }}
          >
            <Text className="text-white text-center font-semibold">
              Approved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`m-2 flex-1 p-2 rounded ${
              status === "rejected" ? "bg-[#047857]" : "bg-[#ccc6c5]"
            }`}
            onPress={() => {
              setStatus("rejected");
            }}
          >
            <Text className="text-white text-center font-semibold">
              Rejected
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={requests}
        renderItem={renderItem}
        numColumns={2}
        className="m-2"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AdminRequests;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
