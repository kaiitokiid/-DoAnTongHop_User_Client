const { createSlice } = require("@reduxjs/toolkit");

const submitSlice = createSlice({
	name: 'submit',
	initialState: false,
	reducers: {
		setSubmit(state) {
			return state = !state
		},
	},
});

const { actions, reducer } = submitSlice;
export const { setSubmit } = actions;
export default reducer;