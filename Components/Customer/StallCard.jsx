import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import IP_ADDRESS from "../../config";

const StallCard = ({ data, categoryId }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("StallMenu", { stall: data, categoryId: categoryId });
  };

  return (
    <View className={`bg-white p-1 mx-2 my-2 rounded shadow-md border-0.5`}>
      <Pressable onPress={handlePress}>
        <View className={`flex-row align-middle justify-start`}>
          <Image
            source={{
              uri: data.stall_logo_url
                ? data.stall_logo_url.replace("localhost", IP_ADDRESS)
                : link,
            }}
            className={`h-36 w-36 rounded`}
          />
          <View className="flex-col align-middle justify-start m-3 w-[100%]">
            <Text className={`text-xl font-semibold`}>{data.stall_name}</Text>
            <View className="flex-row align-middle mt-3">
              {data.type_of_categories.map((item) => {
                return (
                  <View className="border-0.5 p-0.5 rounded mr-1" key={item.id}>
                    <Text className="text-gray-600 mx-0.5 text-xs">{item}</Text>
                  </View>
                );
              })}
            </View>
            <View className="border-0.5 border-gray-300 w-[50%] mt-5"></View>
            <View className="flex-row justify-start align-middle mt-3">
              <MaterialCommunityIcons name="chef-hat" size={20} color="gray" />
              <Text className="self-center ml-1">
                {data.first_name} {data.last_name}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default StallCard;
