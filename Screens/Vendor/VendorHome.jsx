import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; // Import additional icons if needed
import VendorOrders from "../Vendor/VendorOrders";
import VendorMenu from "../Vendor/VendorMenu";
import VendorProfile from "../Vendor/VendorProfile";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const VendorHome = () => {
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
            case "VendorMenu":
              return (
                <MaterialIcons
                  name="menu-book"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "VendorOrders":
              return (
                <Ionicons
                  name="fast-food"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "VendorProfile":
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
      <Tab.Screen name="VendorMenu" component={VendorMenu} />
      <Tab.Screen name="VendorOrders" component={VendorOrders} />
      <Tab.Screen name="VendorProfile" component={VendorProfile} />
    </Tab.Navigator>
  );
};

export default VendorHome;
