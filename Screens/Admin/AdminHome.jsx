import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminCategories from "./AdminCategories";
import AdminRequests from "./AdminRequests";
import AdminProfile from "./AdminProfile";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AdminHome = () => {
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
            case "AdminCategories":
              return (
                <Ionicons
                  name="fast-food"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "AdminRequests":
              return (
                <Ionicons
                  name="notifications"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "AdminProfile":
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
      <Tab.Screen name="AdminCategories" component={AdminCategories} />
      <Tab.Screen name="AdminRequests" component={AdminRequests} />
      <Tab.Screen name="AdminProfile" component={AdminProfile} />
    </Tab.Navigator>
  );
};

export default AdminHome;
