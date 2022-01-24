const { createSlice } = require("@reduxjs/toolkit");

const keywordSlice = createSlice({
	name: 'keyword',
	initialState: '',
	reducers: {
		setKeyword(state, action) {
			return state = action.payload;
		},
		removeKeyword(state) {
			return '';
		}
	},
});

const { actions, reducer } = keywordSlice;
export const { setKeyword, removeKeyword } = actions;
export default reducer;