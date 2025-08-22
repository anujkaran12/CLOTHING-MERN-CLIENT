import axios from "axios";
import { toast } from "react-toastify";

export const placeOrderInDB = async (cartProducts, address, paymentMode) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/place-order`,
      {
        cartProducts,
        address,
        paymentMode,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem(
            process.env.REACT_APP_LOCALSTORAGE_KEY
          )}`,
        },
      }
    );
    
    if (res.status === 200) {
      toast.success("Order placed successfully");
      return true;
    }
    toast.error("Unable to place order");
    return false;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data || "Network error");
    return false;
  }
};
