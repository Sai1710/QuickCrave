import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Context/GlobalContext";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import CartItemCard from "../../Components/Customer/CartItemCard";
import CartCardContainer from "../../Components/Customer/CartCardContainer";
import CustomModal from "../../Components/Custom/CustomModal";

function CustomerCart() {
  const { getCart, cartArray, deleteCart } = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getCart();
  }, []);
  const renderItem = (itemData) => {
    console.log(itemData.item);
    return (
      <CartCardContainer
        stall={itemData?.item?.items[0]?.food_item?.vendor_category?.vendor}
        items={itemData.item.items}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Are you sure you want to delete your Crat?"
        buttonTitle="Delete"
        buttonColor="red"
        onButtonClick={deleteCart}
      />
      <View className={` p-4 flex-row align-middle justify-between mx-2`}>
        <Text className={`text-green-800 text-xl font-bold flex-1 self-center`}>
          My Cart
        </Text>
        {cartArray.length != 0 && (
          <TouchableOpacity
            className="p-3 border-2 border-red-900 rounded-lg"
            onPress={() => {
              setModalVisible((prev) => !prev);
            }}
          >
            <Text className="text-red-900 font-bold">Delete Cart</Text>
          </TouchableOpacity>
        )}
      </View>
      {cartArray.length !== 0 ? (
        <FlatList data={cartArray} renderItem={renderItem} />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Items in Cart</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default CustomerCart;
