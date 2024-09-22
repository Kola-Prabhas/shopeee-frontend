import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder } from './orderAPI';

const initialState = {
	orders: [],
	currentOrder: null,
	totalOrders: 0,
	ordersStatus: 'idle',
	currentOrderStatus: 'idle'
};


export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
	'order/fetchAllOrders',
	async ({ pagination, sortOptions, admin }) => {
		const response = await fetchAllOrders({ pagination, sortOptions, admin });

		return response.data;
	}
);

export const updateOrderAsync = createAsyncThunk(
	'order/updateOrder',
	async (update) => {
		const response = await updateOrder(update);
		return response.data;
	}
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
	reducers: {
		resetOrder: (state) => {
			state.currentOrder = null;			
	    }
    },
 
  extraReducers: (builder) => {
    builder
		.addCase(createOrderAsync.pending, (state) => {
		    state.currentOrderStatus = 'loading';
		})
		.addCase(createOrderAsync.fulfilled, (state, action) => {
			state.currentOrderStatus = 'idle';
			state.orders.push(action.payload);
			state.currentOrder = action.payload;
		})
		.addCase(fetchAllOrdersAsync.pending, (state) => {
			state.ordersStatus = 'loading';
		})
		.addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
			state.ordersStatus = 'idle';
			state.orders = action.payload.data;
			state.totalOrders = action.payload.totalOrders;
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


export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const { resetOrder } = orderSlice.actions;

export const selectOrdersStatus = (state) => state.order.ordersStatus
export const selectCurrentOrderStatus = (state) => state.order.currentOrderStatus

export default orderSlice.reducer;
