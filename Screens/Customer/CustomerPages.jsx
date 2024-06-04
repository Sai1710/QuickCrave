import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CustomerStallMenu from "./CustomerStallMenu";
import CustomerCategoryStalls from "./CustomerCategoryStalls";
import CustomerCategories from "./CustomerCategories";

const CustomerStack = createNativeStackNavigator();

const CustomerPages = () => {
  return (
    <CustomerStack.Navigator
      initialRouteName="CustomerCategories"
      screenOptions={{
        headerShown: false,
      }}
    >
      <CustomerStack.Screen
        name="Customer Catgeories"
        component={CustomerCategories}
      />
      <CustomerStack.Screen
        name="StallsList"
        component={CustomerCategoryStalls}
      />
      <CustomerStack.Screen name="StallMenu" component={CustomerStallMenu} />
    </CustomerStack.Navigator>
  );
};

export default CustomerPages;
