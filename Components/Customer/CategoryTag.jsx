import React, { useState } from "react";
import { Text, View } from "react-native";
import CheckBox from "react-native-check-box";

export default function CategoryTag({ category, setSelectedCategories }) {
  const [active, setActive] = useState(false);
  return (
    <View className="flex-row align-middle justify-start border-b-0.5 border-gray-300">
      <CheckBox
        style={{
          padding: 16,
        }}
        onClick={() => {
          setActive((prev) => !prev);
          setSelectedCategories((prev) => {
            if (prev.includes(category.id)) {
              return prev.filter((id) => id !== category.id);
            } else {
              return [...prev, category.id];
            }
          });
        }}
        isChecked={active}
        checkBoxColor="#1d543a"
      />
      <Text
        className={`self-center text-lg text-black ${
          active ? "font-bold" : ""
        }`}
      >
        {category.name}
      </Text>
    </View>
  );
}
