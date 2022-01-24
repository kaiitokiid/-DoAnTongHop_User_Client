import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import headerReducer from "./headerSlice";
import cartReducer from "./cartSlice";
import keywordReducer from "./keywordSlice";
import submitReducer from "./submitSlice";
import paymentReducer from "./paymentSlice";

const rootReducer = {
	user: userReducer,
	isHeader: headerReducer,
	cart: cartReducer,
	keyword: keywordReducer,
	isSubmit: submitReducer,
	payment: paymentReducer,
}

const store = configureStore({
	reducer: rootReducer,
});

export default store;