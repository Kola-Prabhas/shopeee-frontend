import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItem, fetchItemsByUserId, resetCart, updateItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);


export const fetchItemsByUserIdAsync = createAsyncThunk(
	'cart/fetchItemsByUserId',
	async () => {
		const response = await fetchItemsByUserId();
		return response.data;
	}
);


export const updateItemAsync = createAsyncThunk(
	'cart/updateItem',
	async (item) => {
		const response = await updateItem(item);
		return response.data;
	}
);


export const deleteItemFromCartAsync = createAsyncThunk(
	'cart/deleteItemFromCart',
	async (itemId) => {
		const response = await deleteItem(itemId);
		return response.data;
	}
);


export const resetCartAsync = createAsyncThunk(
	'cart/resetCart',
	async () => {
		const response = await resetCart();
		return response.data;
	}
);



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
 
  extraReducers: (builder) => {
    builder
		.addCase(addToCartAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(addToCartAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			state.items.push(action.payload);
		})
		.addCase(fetchItemsByUserIdAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			state.items = action.payload;
		})
	    .addCase(updateItemAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(updateItemAsync.fulfilled, (state, action) => {
			state.status = 'idle';

			const index = state.items.findIndex(item => item.id === action.payload.id);
			state.items[index] = action.payload;
		})
		.addCase(deleteItemFromCartAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			const index = state.items.findIndex(item => item.id === action.payload.itemId);
			state.items.splice(index, 1);
		})
		.addCase(resetCartAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(resetCartAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			state.items = [];
		})
  },
});


export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsStatus = (state) => state.cart.status;

export default cartSlice.reducer;
