import React, { useContext, useEffect } from "react";
import { View, Text, classNameS, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import GlobalContext from "../../Context/GlobalContext";
import IP_ADDRESS from "../../config";

const VendorProfile = () => {
  const navigation = useNavigation();
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user-info");
    setUserInfo(JSON.parse(user));
    console.log(userInfo);
  };
  useEffect(() => {
    getUser();
  }, []);
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
              source={{
                uri: userInfo?.stall_logo_url?.replace("localhost", IP_ADDRESS),
              }}
              className="w-48 h-48 rounded-full "
            />
          </View>
          <Text className="text-xl font-bold mt-2">
            {userInfo?.stall_name ? userInfo.stall_name : "No Stall Name "}
          </Text>
        </View>
        <View className="border-b border-gray-200 mb-6" />
        <View className="flex-col align-middle justify-between mb-4 border border-gray-900 p-3 rounded-xl">
          <Text className="text-lg text-black font-bold">Name:</Text>
          <Text className="text-lg ">
            {userInfo?.first_name} {userInfo?.last_name}
          </Text>
        </View>
        <View className="flex-col align-middle justify-between mb-4 border border-gray-900 p-3 rounded-xl">
          <Text className="text-lg text-black font-bold">Email:</Text>
          <Text className="text-lg ">{userInfo?.email}</Text>
        </View>
        <View className="flex-col align-middle justify-between mb-4 border border-gray-900 p-3 rounded-xl">
          <Text className="text-lg text-black font-bold">Phone Number:</Text>
          <Text className="text-lg ">{userInfo?.phone_number}</Text>
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

export default VendorProfile;
