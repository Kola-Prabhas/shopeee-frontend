import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createOrder,
	fetchAllOrders,
	fetchUserOrders,
	updateOrder
} from './orderAPI';

import { clearCartAsync } from '../cart/cartSlice';


export const createOrderAsync = createAsyncThunk(
	'order/createOrder',
	async (order, { rejectWithValue, dispatch }) => {
		try {
			const response = await createOrder(order);
			
			const cartItems = order.items;
			dispatch(clearCartAsync(cartItems));

			return response.order;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);


export const fetchAllOrdersAsync = createAsyncThunk(
	'order/fetchAllOrders',
	async ({ pagination, sortOptions, admin }) => {
		const response = await fetchAllOrders({ pagination, sortOptions, admin });

		return response.data;
	}
);


export const fetchUserOrdersAsync = createAsyncThunk(
	'order/fetchUserOrders',
	async ({ userId }, { rejectWithValue }) => {
		try {
			const response = await fetchUserOrders({ userId });
			return response;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const updateOrderAsync = createAsyncThunk(
	'order/updateOrder',
	async (order, {rejectWithValue}) => {
		try {
			const response = await updateOrder(order);
			return response.data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);


const initialState = {
	status: 'idle',
	orders: [],
	currentOrder: null,
	totalOrders: 0,
	currentOrderStatus: 'idle',
	updateOrderStatus: 'idle'
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		resetCurrentOrder: state => {
			state.currentOrder = null;
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchAllOrdersAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.orders = action.payload.data;
				state.totalOrders = action.payload.totalOrders;
			})


			.addCase(fetchUserOrdersAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				
				const orders = action.payload.orders;
				const totalOrders = action.payload.totalOrders;
				state.orders = orders;
				state.totalOrders = totalOrders;
			})
			.addCase(fetchUserOrdersAsync.rejected, (state, action) => {
				state.status = 'idle';
			})



			.addCase(createOrderAsync.pending, (state) => {
				state.currentOrderStatus = 'loading';
			})
			.addCase(createOrderAsync.fulfilled, (state, action) => {
				state.currentOrderStatus = 'idle';
				const order = action.payload;

				state.orders.unshift(order);
				state.currentOrder = order;
			})
			.addCase(createOrderAsync.rejected, (state, action) => {
				state.currentOrderStatus = 'idle';
			})

			

			.addCase(updateOrderAsync.pending, (state) => {
				state.updateOrderStatus = 'loading';
			})
			.addCase(updateOrderAsync.fulfilled, (state, action) => {
				state.updateOrderStatus = 'idle';
				state.orders = state.orders.map(order => {
					if (order.id === action.payload.id) {
						return action.payload;
					}

					return order;
				});
			})
			.addCase(updateOrderAsync.rejected, (state) => {
				state.updateOrderStatus = 'idle';
			});
	},
});


export const { resetCurrentOrder } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;

export const selectOrdersStatus = (state) => state.order.status
export const selectCurrentOrderStatus = (state) => state.order.currentOrderStatus
export const selectUpdateOrderStatus = (state) => state.order.updateOrderStatus

export default orderSlice.reducer;
