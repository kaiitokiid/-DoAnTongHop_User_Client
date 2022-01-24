const { createSlice } = require("@reduxjs/toolkit");

var index;
// const findProductInCart = (cart, product) => {
// 	let index = -1;
// 	if (cart.length > 0) {
// 		for (let i = 0; i < cart.length; i++) {
// 			if (cart[i].product.id === product.id) {
// 				index = i;
// 				break;
// 			}
// 		}
// 	}
// 	return index;
// }

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

var data = JSON.parse(localStorage.getItem('CART'));

var initialState = data ? data : [];

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			index = findProductInCartByID(state, action.payload.product._id);
			console.log(index);

			const newState = [...state];

			if (index === -1) {
				newState.push(action.payload)
				localStorage.setItem('CART', JSON.stringify(newState));
				return newState;
			}
			else {
				newState[index].quantity += action.payload.quantity;
				localStorage.setItem('CART', JSON.stringify(newState));
			}
		},
		removeItem(state, action) {
			index = findProductInCartByID(state, action.payload);
			if (index !== -1) {
				state.splice(index, 1);
				localStorage.setItem('CART', JSON.stringify(state));
			}
		},
		increaseItem(state, action) {
			index = findProductInCartByID(state, action.payload);
			if (index !== -1) {
				state[index].quantity++;
			}
			localStorage.setItem('CART', JSON.stringify(state));
		},
		decreaseItem(state, action) {
			index = findProductInCartByID(state, action.payload);
			if (index !== -1 && state[index].quantity !== 1) {
				state[index].quantity--;
			}
			localStorage.setItem('CART', JSON.stringify(state));
		},
	},
});

const { actions, reducer } = cartSlice;
export const { addItem, removeItem, increaseItem, decreaseItem } = actions;
export default reducer;