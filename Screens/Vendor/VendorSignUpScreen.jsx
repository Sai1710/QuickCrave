import { useState, useContext, useEffect } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import VendorHome from "../Vendor/VendorHome";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../Context/GlobalContext";

export default function VendorSignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobile, setMobile] = useState();
  const [stallName, setStallName] = useState("");
  const [razorpayId, setRazorpayId] = useState();
  const [razorpaySecret, setRazorpaySecret] = useState();
  const [stallLogo, setStallLogo] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [franchise, setFranchise] = useState(false);
  const [franchiseDetails, setFranchiseDetails] = useState("");
  const [categoryPicker, setCategoryPicker] = useState(false);
  const navigation = useNavigation();
  const { categories, fetchCategories } = useContext(GlobalContext);
  const [fetchedCategories, setFetchedCategories] = useState();

  const getCategories = () => {
    const tempCategories = categories.map((item) => {
      return { label: item.name, value: item.name };
    });
    setFetchedCategories(tempCategories);
  };

  const handleSubmit = () => {
    if (franchiseDetails.length !== 0) {
      setFranchise(true);
    }
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !mobile ||
      !stallName ||
      !razorpayId ||
      !razorpaySecret ||
      !stallLogo ||
      !franchiseDetails ||
      !franchise
    ) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Incomplete Details",
        textBody: "Please enter all the details",
      });
      return;
    }
    if (selectedCategories.length === 0) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "No Categories Selected",
        textBody: "Select Some Categories",
      });
      return;
    }

    const formData = new FormData();
    formData.append("vendor[first_name]", firstName);
    formData.append("vendor[last_name]", lastName);
    formData.append("vendor[email]", email);
    formData.append("vendor[password]", password);
    formData.append("vendor[phone_number]", mobile);
    formData.append("vendor[stall_name]", stallName);
    formData.append("vendor[razorpay_key_id]", razorpayId);
    formData.append("vendor[razorpay_secret_id]", razorpaySecret);

    formData.append("vendor[stall_logo]", {
      uri: stallLogo.uri,
      name: stallLogo.fileName,
      type: stallLogo.mimeType,
    });
    formData.append("vendor[franchise_details]", franchiseDetails);
    formData.append("vendor[franchise]", franchise);
    formData.append(
      `vendor[type_of_categories]`,
      JSON.stringify(selectedCategories)
    );
    formData.append("client_id", "OT-Fkr2xgMFDGwjPO_cga2BiDwVZX5RDPwGtjTG1Vs8");

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .post("/api/v1/vendor/sign_up", formData, { headers })
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Request Sent",
          button: "Close",
        });
        navigation.replace("LoginPage");
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Failed",
          textBody: "Request Couldn't be Sent",
          button: "Close",
        });
      });
  };
  const uploadImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      copyToCacheDirectory: true,
    });
    setStallLogo(image.assets[0]);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    getCategories();
  }, [categories]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#FFFFFF"} />

      <View style={styles.card}>
        <Text className="font-bold text-2xl mb-3 text-center text-[#047857]">
          QuickCrave
        </Text>
        <Text style={styles.subtitle}>
          Explore food from different cuisines !!!
        </Text>
        <View className="flex-row align-middle justify-center mb-6">
          <View className={`flex-1`} onPress={() => {}}>
            <Text className="text-center text-[#047857] text-lg font-bold p-2">
              Vendor Registration
            </Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View className="flex-row align-middle justify-center">
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setfirstName}
                className="flex-1 mr-1"
              />
              <TextInput
                style={styles.input}
                className="flex-1 ml-1"
                placeholder="Last Name"
                value={lastName}
                onChangeText={setlastName}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={setMobile}
              placeholder="Mobile"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Franchise Details"
              value={franchiseDetails}
              onChangeText={setFranchiseDetails}
            />
            <TextInput
              style={styles.input}
              placeholder="Razorpay ID"
              value={razorpayId}
              onChangeText={setRazorpayId}
            />
            <TextInput
              style={styles.input}
              placeholder="Razorpay Secret"
              value={razorpaySecret}
              onChangeText={setRazorpaySecret}
            />
            <View className="flex-row align-middle justify-center">
              <TextInput
                className={`border border-gray-300 rounded p-2 mr-1 my-1 flex-1`}
                value={stallName}
                onChangeText={setStallName}
                placeholder="StallName"
              />
              <TouchableOpacity
                className={`bg-[#047857] rounded flex-2 p-2 ml-1 my-1`}
                onPress={uploadImage}
              >
                {!stallLogo ? (
                  <MaterialCommunityIcons
                    name="image-plus"
                    size={24}
                    color="white"
                  />
                ) : (
                  <Ionicons
                    name="checkmark-done-circle-sharp"
                    size={24}
                    color="white"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View className="my-2">
              <DropDownPicker
                mode="BADGE"
                open={categoryPicker}
                value={selectedCategories}
                items={fetchedCategories}
                setOpen={setCategoryPicker}
                setValue={setSelectedCategories}
                onChangeValue={(val) => {
                  setSelectedCategories(val);
                }}
                multiple={true}
                style={{
                  borderColor: "#e5e7eb",
                  borderRadius: 4,
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={styles.signupLink}
                onPress={() => {
                  console.log("Forgot Password");
                }}
              >
                <Text style={styles.signupText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signupLink}
                onPress={() => navigation.navigate("LoginPage")}
              >
                <Text style={styles.signupText}>Login Instead?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    width: "90%",
    backgroundColor: "rgb(255,255,255)",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 40, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#047857",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  dividerLine: {
    backgroundColor: "#333",
    height: 1,
    flex: 1,
    marginHorizontal: 5,
  },
  dividerText: {
    fontWeight: "600",
    marginHorizontal: 5,
  },
  socialLogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#778CA3",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#047857",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});
