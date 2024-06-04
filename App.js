import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import axios from "axios";
import VendorHome from "./Screens/Vendor/VendorHome";
import CustomerHome from "./Screens/Customer/CustomerHome";
import AdminHome from "./Screens/Admin/AdminHome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalProvider } from "./Context/GlobalContext";
import VendorSignUpScreen from "./Screens/Vendor/VendorSignUpScreen";
import { AlertNotificationRoot } from "react-native-alert-notification";
import CustomerProfile from "./Screens/Customer/CustomerProfile";
import CustomerCategoryStalls from "./Screens/Customer/CustomerCategoryStalls";
import CustomerStallMenu from "./Screens/Customer/CustomerStallMenu";
import CustomerSignUpScreen from "./Screens/Customer/CustomerSignUpScreen";
import CustomerCart from "./Screens/Customer/CustomerCart";
const Stack = createNativeStackNavigator();
import IP_ADDRESS from "./config";

export default function App() {
  axios.defaults.baseURL = `https://8bb1-27-59-92-2.ngrok-free.app/`;
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;
  axios.interceptors.request.use(
    async (config) => {
      config.headers["Authorization"] =
        "Bearer " + (await AsyncStorage.getItem("access_token"));
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <AlertNotificationRoot>
      <GlobalProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="#fff" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* Login and SignUp */}

            {/* Customer Pages */}
            <Stack.Screen name="LoginPage" component={LoginScreen} />
            <Stack.Screen name="CustomerHome" component={CustomerHome} />

            {/* VendorPages */}
            <Stack.Screen name="VendorHome" component={VendorHome} />
            {/* Admin */}
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen
              name="VendorSignUpScreen"
              component={VendorSignUpScreen}
            />
            <Stack.Screen
              name="CustomerSignUpScreen"
              component={CustomerSignUpScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalProvider>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
