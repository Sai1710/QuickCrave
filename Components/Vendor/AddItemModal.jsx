import React, { useContext, useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const AddItemModal = ({
  modalVisible,
  setModalVisible,
  item,
  mode,
  getMenu,
  categories,
}) => {
  const [name, setName] = useState(item ? item.name : "");
  const [itemType, setItemType] = useState(item ? item.item_type : "");
  const [subTypes, setSubTypes] = useState(item ? item.sub_type : []);
  const [taste, setTaste] = useState(item ? item.taste : []);
  const [tags, setTags] = useState(item ? item.tags : []);
  const [categoryId, setCategoryId] = useState();
  const [price, setPrice] = useState(item ? item.price.toString() : "");
  const [itemSubTypeOptions, setItemSubTypeOptions] = useState([
    { label: "Regular", id: 1, value: "Regular" },
    { label: "Swaminarayan", id: 2, value: "Swaminarayan" },
    { label: "Jain", id: 3, value: "Jain" },
  ]);
  const [subTypePicker, setSubTypePicker] = useState(false);
  const [tagPicker, setTagPicker] = useState(false);
  const [tastePicker, setTastePicker] = useState(false);
  const [itemPicker, setItemPicker] = useState(false);
  const [categoryPicker, setCategoryPicker] = useState(false);
  const [vendorCategories, setVendorCategories] = useState();

  const getCategories = () => {
    const tempCategories = categories?.map((item) => {
      return { label: item.name, value: item.id };
    });
    setVendorCategories(tempCategories);
  };
  useEffect(() => {
    getCategories();
  }, [categories]);

  const [tasteOptions, setTasteOptions] = useState([
    { label: "Spicy", id: 1, value: "Spicy" },
    { label: "Medium", id: 2, value: "Medium" },
    { label: "Light", id: 3, value: "Light" },
  ]);

  const [tagOptions, setTagOptions] = useState([
    { label: "Best Seller", id: 1, value: "Best Seller" },
    { label: "Kids", id: 2, value: "Kids" },
    { label: "Starter", id: 3, value: "Starter" },
    { label: "Yummy", id: 4, value: "Yummy" },
    { label: "Healthy", id: 5, value: "Healthy" },
  ]);

  const [itemTypeOptions, setItemTypeOptions] = useState([
    { label: "Veg", value: "Veg" },
    { label: "NonVeg", value: "NonVeg" },
  ]);

  const resetForm = () => {
    setItemType("");
    setPrice("");
    setName("");
    setTags([]);
    setSubTypes([]);
    setTaste([]);
  };

  const editItem = () => {
    axios
      .put(`/api/v1/vendor/food_items/${item.id}`, {
        food_item: {
          name: name,
          item_type: itemType,
          sub_type: subTypes,
          taste: taste,
          tags: tags,
          price: price,
        },
      })
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Item Updated",
          button: "Close",
        });
        resetForm();
        getMenu();
        setModalVisible((prev) => !prev);
      });
  };
  const addItem = () => {
    console.log(name, price, subTypes, taste, tags, categoryId, itemType);
    // const formData = new FormData();
    // formData.append("food_item[name]", name);
    // formData.append("food_item[item_type]", itemType);
    // formData.append(`food_item[sub_type]`, JSON.stringify(subTypes));
    // formData.append(`food_item[taste]`, JSON.stringify(taste));
    // formData.append(`food_item[tags]`, JSON.stringify(tags));
    // formData.append("food_item[price]", price);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .post(`/api/v1/vendor/food_items?category_id=${categoryId}`, {
        food_item: {
          name: name,
          item_type: itemType,
          sub_type: subTypes,
          taste: taste,
          tags: tags,
          price: price,
        },
      })
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Item Added",
          button: "Close",
        });
        resetForm();
        getMenu();
        setModalVisible(false);
      });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        resetForm();
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
              Add Item
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
              }}
              onPress={() => {
                resetForm();
                setModalVisible((prev) => !prev);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
              className={`border border-gray-300 rounded p-2 mx-3 my-2`}
            />
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Price"
              keyboardType="numeric"
              className={`border border-gray-300 rounded p-2 mx-3 my-2`}
            />

            <View className={`border border-gray-300 rounded mx-3 my-2 z-[7]`}>
              <DropDownPicker
                open={itemPicker}
                value={itemType}
                items={itemTypeOptions}
                setOpen={setItemPicker}
                setValue={setItemType}
                onChangeValue={(val) => {
                  setItemType(val);
                }}
                placeholder="Item Type"
                className="rounded border-gray-300 border-0"
              />
            </View>
            {mode !== "edit" && (
              <View
                className={`border border-gray-300 rounded mx-3 my-2 z-[6]`}
              >
                <DropDownPicker
                  open={categoryPicker}
                  value={categoryId}
                  items={vendorCategories}
                  setOpen={setCategoryPicker}
                  setValue={setCategoryId}
                  onChangeValue={(val) => {
                    setCategoryId(val);
                  }}
                  placeholder="Category"
                  className="rounded border-gray-300 border-0"
                />
              </View>
            )}

            <View className={`border border-gray-300 rounded mx-3 my-2 z-[4]`}>
              <DropDownPicker
                mode="BADGE"
                open={subTypePicker}
                value={subTypes}
                items={itemSubTypeOptions}
                setOpen={setSubTypePicker}
                setValue={setSubTypes}
                onChangeValue={(val) => {
                  setSubTypes(val);
                }}
                multiple={true}
                placeholder="Sub Types"
                className="rounded border-gray-300 border-0"
              />
            </View>
            <View className="flex-row">
              <View
                className={`border border-gray-300 rounded ml-3 my-2 z-[3] flex-1`}
              >
                <DropDownPicker
                  mode="BADGE"
                  open={tagPicker}
                  value={tags}
                  items={tagOptions}
                  setOpen={setTagPicker}
                  setValue={setTags}
                  onChangeValue={(val) => {
                    setTags(val);
                  }}
                  multiple={true}
                  placeholder="Tags"
                  className="rounded border-gray-300 border-0"
                />
              </View>
              <View
                className={`border border-gray-300 rounded mx-3 my-2 z-[1] flex-1`}
              >
                <DropDownPicker
                  mode="BADGE"
                  open={tastePicker}
                  value={taste}
                  items={tasteOptions}
                  setOpen={setTastePicker}
                  setValue={setTaste}
                  onChangeValue={(val) => {
                    setTaste(val);
                  }}
                  placeholder="Tastes"
                  multiple={true}
                  className="rounded border-gray-300 border-0"
                />
              </View>
            </View>
          </View>

          <View className={`flex-row justify-between`}>
            <TouchableOpacity
              onPress={() => {
                if (mode === "edit") {
                  editItem();
                } else {
                  addItem();
                }
                setModalVisible(false);
              }}
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

export default AddItemModal;
