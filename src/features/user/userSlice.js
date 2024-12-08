import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo, updateUser} from './userAPI';

const initialState = {
	status: 'idle',
	userInfo: null,
};



export const fetchUserInfoAsync = createAsyncThunk(
	'user/fetchUserInfo',
	async () => {
		const response = await fetchUserInfo();
		return response.data;
	}
);

export const updateUserAsync = createAsyncThunk(
	'auth/updateUser',
	async (update) => {
		const response = await updateUser(update);
		return response.data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUser: state => {
			state.userInfo = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchUserInfoAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.userInfo = action.payload;
			})
			.addCase(updateUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateUserAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.userInfo = action.payload;
			});
	},
});


export const { resetUser } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
