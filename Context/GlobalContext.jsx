import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();

const initialState = {
  categories: [],
  userInfo: {},
  cart: {},
  cartArray: [],
  loading: false,
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_CART_ARRAY":
      return { ...state, cartArray: action.payload };
    case "SET_USER":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const categorizeCart = (cart) => {
    const tempCart = cart.cart_items.reduce((acc, item) => {
      const vendorId = item.food_item?.vendor_category?.vendor_id;
      if (!acc[vendorId]) {
        acc[vendorId] = [];
      }
      acc[vendorId].push(item);
      return acc;
    }, {});
    console.log(tempCart);
    const tempCartArray = Object.keys(tempCart).map((key) => ({
      key,
      items: tempCart[key],
    }));
    console.log(tempCartArray);
    dispatch({ type: "SET_CART_ARRAY", payload: tempCartArray });
  };

  const updateCart = (price) => {
    axios
      .put(`api/v1/customer/carts`, {
        cart: {
          final_price: price,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_CART", payload: res.data?.cart });
        categorizeCart(res.data?.cart);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Cart Updated",
        });
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Cart Update Failed",
        });
      });
  };
  const deleteCart = async () => {
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: "Deleting Cart",
    });
    try {
      axios
        .delete(`/api/v1/customer/carts`)
        .then(async (response) => {
          console.log(response);
          getCart();
          dispatch({ type: "SET_CART", payload: [] });
          dispatch({ type: "SET_CART_ARRAY", payload: [] });
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Cart Deleted",
          });
          await AsyncStorage.removeItem("cart-id");
        })
        .catch((err) => {
          console.log(err);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Some Error Occured",
            textBody: "Unable to delete Cart",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getCart = () => {
    axios
      .get(`/api/v1/customer/cart`)
      .then((res) => {
        dispatch({ type: "SET_CART", payload: res.data?.cart });
        const totalPrice = res.data.cart.cart_items.reduce((total, item) => {
          return total + item.price;
        }, 0);
        console.log("totalPrice", totalPrice);
        updateCart(totalPrice);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          dispatch({ type: "SET_CART", payload: {} });
          dispatch({ type: "SET_CART_ARRAY", payload: [] });
        }
      });
  };
  const createCart = async (item, quantity) => {
    axios
      .post(`/api/v1/customer/carts`, {})
      .then(async (res) => {
        dispatch({ type: "SET_CART", payload: res.data?.cart });
        await AsyncStorage.setItem("cart-id", res.data.cart.id.toString());
        if (res.status === 200) {
          addItem(item, quantity);
          console.log(res);
        }
      })
      .catch((err) => {
        console.log("Axios", err);
      });
  };

  const addItem = (item, quantity) => {
    console.log("item", item);
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: "Adding Item to Cart",
    });
    if (quantity != 0) {
      try {
        axios
          .post(`/api/v1/customer/carts/cart_items`, {
            cart_item: {
              food_item_id: item.id,
              quantity: quantity,
              price: quantity * item.price,
            },
          })
          .then((res) => {
            console.log(res);
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Item Added",
              textBody: "Item Added to Cart",
            });
            getCart();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setUserInfo = (userInfo) => {
    dispatch({ type: "SET_USER", payload: userInfo });
  };

  const handleAdd = async (item, quantity) => {
    const cartId = await AsyncStorage.getItem("cart-id");
    if (cartId === null && quantity !== 0) {
      createCart(item, quantity);
    } else {
      addItem(item, quantity);
    }
  };
  const deleteItem = (cartItemId) => {
    axios
      .delete(`/api/v1/customer/carts/cart_items/${cartItemId}`)
      .then((res) => {
        console.log(res);
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateItem = (cartItemId, item, quantity) => {
    if (quantity === 0) {
      deleteItem(cartItemId);
      return;
    }
    const formData = new FormData();
    formData.append("cart_item[food_item_id]", item.id);
    formData.append("cart_item[quantity]", quantity);
    formData.append("cart_item[price]", quantity * item.price);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .put(`/api/v1/customer/carts/cart_items/${cartItemId}`, formData, {
        headers,
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_CART", payload: res.data?.cart });
        const totalPrice = res.data.cart.cart_items.reduce((total, item) => {
          return total + item.price;
        }, 0);
        console.log("totalPrice", totalPrice);
        updateCart(totalPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem("access_token");
    const role = await AsyncStorage.getItem("role");

    console.log("Token", token);
    axios
      .get(`/api/v1/${role ? role : "admin"}/categories`)
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_CATEGORIES", payload: res.data?.categories });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "SET_CATEGORIES", payload: [] });
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        categories: state.categories,
        loading: state.loading,
        cart: state.cart,
        cartArray: state.cartArray,
        userInfo: state.userInfo,
        fetchCategories,
        handleAdd,
        getCart,
        updateItem,
        deleteCart,
        categorizeCart,
        setUserInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
