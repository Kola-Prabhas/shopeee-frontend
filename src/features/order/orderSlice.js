import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createOrder,
	fetchAllOrders,
	fetchUserOrders,
	updateOrder
} from './orderAPI';
import toast from 'react-hot-toast';


export const createOrderAsync = createAsyncThunk(
	'order/createOrder',
	async (order, { rejectWithValue }) => {
		try {
			const response = await createOrder(order);
			return response.order;
		} catch (e) {
			rejectWithValue(e.message);
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
	async (update) => {
		const response = await updateOrder(update);
		return response.data;
	}
);


const initialState = {
	status: 'idle',
	orders: [],
	currentOrder: null,
	totalOrders: 0,
	// currentOrderStatus: 'idle'
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

				const error = action.payload;
				toast.error(error || 'Failed to fetch user orders');
			})

			// .addCase(createOrderAsync.pending, (state) => {
			// })
			.addCase(createOrderAsync.fulfilled, (state, action) => {
				const order = action.payload;

				state.orders.unshift(order);
			})
			.addCase(createOrderAsync.rejected, (state, action) => {
				const error = action.payload;

				toast.error(error || 'Failed to create order');
			})

			.addCase(updateOrderAsync.pending, (state) => {
				state.ordersStatus = 'loading';
			})
			.addCase(updateOrderAsync.fulfilled, (state, action) => {
				state.ordersStatus = 'idle';
				state.orders = state.orders.map(order => {
					if (order.id === action.payload.id) {
						return action.payload;
					}

					return order;
				});
			});
	},
});


export const { resetCurrentOrder } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export const selectOrdersStatus = (state) => state.order.status
export const selectCurrentOrderStatus = (state) => state.order.currentOrderStatus

export default orderSlice.reducer;
