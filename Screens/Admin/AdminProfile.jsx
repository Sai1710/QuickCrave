import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation, CommonActions } from "@react-navigation/native";

const AdminProfile = () => {
  const navigation = useNavigation();
  const logOut = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "LoginPage" }],
      })
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="QuickCrave" />
      <View className="pt-6 mx-4 bg-white rounded-lg shadow-lg">
        <View className="items-center mb-6">
          <View className="border-2 border-black rounded-full">
            <Image
              source={require("../../assets/ChineseFood.jpg")}
              className="w-48 h-48 rounded-full "
            />
          </View>
          <Text className="text-xl font-bold mt-2">Administrator</Text>
        </View>
        <View className="border-b border-gray-200 mb-6" />
        <View className="flex-col align-middle justify-between mb-4 border border-gray-900 p-3 rounded-xl">
          <Text className="text-lg text-black font-bold">Name:</Text>
          <Text className="text-lg ">Saikiriti Voonna</Text>
        </View>
        <View className="flex-col align-middle justify-between mb-4 border border-gray-900 p-3 rounded-xl">
          <Text className="text-lg text-black font-bold">Email:</Text>
          <Text className="text-lg ">admin@email.com</Text>
        </View>
        <View className="flex-col align-middle justify-between mb-4 border border-gray-900 p-3 rounded-xl">
          <Text className="text-lg text-black font-bold">Phone Number:</Text>
          <Text className="text-lg ">8264378841</Text>
        </View>
        <TouchableOpacity
          onPress={logOut}
          className="p-4 bg-red-500 text-white rounded-md "
        >
          <Text className="text-center text-white font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
