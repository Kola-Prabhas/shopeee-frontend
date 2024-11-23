import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrdersByUserId, fetchUserInfo, updateUser, createUserOrder } from './userAPI';

const initialState = {
	status: 'idle',
	userInfo: null,
	currentOrder: null,


	createUserOrderStatus: 'idle',
	userOrdersStatus: 'idle',
	// currentOrderStatus: 'idle'
};


// export const fetchOrdersByUserIdAsync = createAsyncThunk(
// 	'user/fetchOrdersByUserId',
// 	async () => {
// 		const response = await fetchOrdersByUserId();
// 		return response.data;
// 	}
// );


export const createUserOrderAsync = createAsyncThunk(
	'order/createUserOrder',
	async (order) => {
		const response = await createUserOrder(order);
		console.log('response.data ', response.data)
		return response.data;
	}
);



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
		resetCurrentOrder: (state) => {
			console.log('reset current order ', state.currentOrder);
			state.currentOrder = null;
		}
	},

	extraReducers: (builder) => {
		builder
			// .addCase(fetchOrdersByUserIdAsync.pending, (state) => {
			// 	state.status = 'loading';
			// })
			// .addCase(fetchOrdersByUserIdAsync.fulfilled, (state, action) => {
			// 	state.status = 'idle';
			// 	if (action.payload.length > 0) {
			// 		state.userInfo.orders = action.payload;
			// 	}
			// })
			.addCase(createUserOrderAsync.pending, (state) => {
				state.createUserOrderStatus = 'loading';
			})
			.addCase(createUserOrderAsync.fulfilled, (state, action) => {
				state.createUserOrderStatus = 'idle';
				state.userInfo.orders.push(action.payload);
				state.currentOrder = action.payload;
			})
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


export const { resetUser, resetCurrentOrder } = userSlice.actions;
// export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectCurrentOrder = (state) => state.user.currentOrder;
export const selectCreateUserOrderStatus = (state) => state.user.createUserOrderStatus;

export default userSlice.reducer;
