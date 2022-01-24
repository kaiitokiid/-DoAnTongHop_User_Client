const { createSlice } = require("@reduxjs/toolkit");

var index;

const findProductInCartByID = (cart, id) => {
	let index = -1;
	if (cart.length > 0) {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].product._id === id) {
				index = i;
				break;
			}
		}
	}
	return index;
}

var data = JSON.parse(localStorage.getItem('PAYMENT'));

var initialState = data ? data : [];

const paymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		addPaymentItem(state, action) {
			const isChecked = state.find(item => {
				return item._id === action.payload._id
			})
			let newState;

			if (!isChecked) {
				newState = [...state];
				newState.push(action.payload);
				localStorage.setItem('PAYMENT', JSON.stringify(newState));
			}
			else {
				newState = state.filter(item => item._id !== action.payload._id);
				localStorage.setItem('PAYMENT', JSON.stringify(newState));
			}

			return newState;
		},
		resetPayment(state) {
			localStorage.setItem('PAYMENT', JSON.stringify(''));
			return [];
		}
	},
});

const { actions, reducer } = paymentSlice;
export const { addPaymentItem, resetPayment } = actions;
export default reducer;