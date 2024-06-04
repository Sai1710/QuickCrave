import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomerCategories from "./CustomerCategories";
import CustomerStalls from "./CustomerStalls";
import CustomerProfile from "./CustomerProfile";
import CustomerCart from "./CustomerCart";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import GlobalContext from "../../Context/GlobalContext";
import CustomerPages from "./CustomerPages";

const Tab = createBottomTabNavigator();

const CustomerHome = () => {
  const { fetchCategories, getCart, cart } = useContext(GlobalContext);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    fetchCategories();
    getCart();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
        },

        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "CustomerPages":
              return (
                <Ionicons
                  name="fast-food"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "CustomerStalls":
              return (
                <Entypo
                  name="shop"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "CustomerCart":
              return (
                <Entypo
                  name="shopping-cart"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "CustomerProfile":
              return (
                <FontAwesome
                  name="user-circle"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );

            default:
              return null;
          }
        },
        tabBarBadgeStyle: { display: "none" },
      })}
    >
      <Tab.Screen name="CustomerPages" component={CustomerPages} />
      <Tab.Screen name="CustomerStalls" component={CustomerStalls} />
      <Tab.Screen
        name="CustomerCart"
        component={CustomerCart}
        options={{
          tabBarBadge: cart?.cart_items?.length,
          tabBarBadgeStyle: { backgroundColor: "red" },
        }}
      />
      <Tab.Screen name="CustomerProfile" component={CustomerProfile} />
    </Tab.Navigator>
  );
};

export default CustomerHome;
