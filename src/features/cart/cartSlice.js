import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { addToCart, deleteItem, fetchItemsByUserId, clearCart, updateItem } from './cartAPI';

import toast from 'react-hot-toast';


const initialState = {
	status: 'idle',
	items: [],

	addingCartItems: [], // items which are going to be added to cart
	updatingCartItems: [], // items which are going to be updated
	deletingCartItems: [], // cart items which are going to be removed
};


export const addToCartAsync = createAsyncThunk(
	'cart/addToCart',
	async (item, { rejectWithValue }) => {
		try {
			const response = await addToCart(item);
			const cartItem = response.item;
			
			return cartItem;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);


export const fetchItemsByUserIdAsync = createAsyncThunk(
	'cart/fetchItemsByUserId',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchItemsByUserId();
			const data = response.data;
			const cart = data.cart;

			return cart;
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
);


export const updateItemAsync = createAsyncThunk(
	'cart/updateItem',
	async (item, { rejectWithValue }) => {
		try {
			const response = await updateItem(item);
			return response.item;
		} catch (e) {
			rejectWithValue(e.message)
		}
	}
);


export const deleteItemFromCartAsync = createAsyncThunk(
	'cart/deleteItemFromCart',
	async (itemId, {rejectWithValue}) => {
		try {
			const response = await deleteItem(itemId);
			return response.item;
		} catch (error) {
			return  rejectWithValue(error.message);			
		}
	}
);


export const clearCartAsync = createAsyncThunk(
	'cart/clearCart',
	async (cartItems, { rejectWithValue }) => {
		try {
			const response = await clearCart(cartItems);
			return response.data;
		} catch (error) {
			rejectWithValue(error.message);			
		}
	}
);



export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchItemsByUserIdAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items = action.payload;
			})
			.addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
				state.status = 'idle';

				const message = action.payload;
				toast.error(message || 'Failed to fetch cart items');
			})


			.addCase(addToCartAsync.pending, (state, action) => {
				const item = action.meta.arg;
				const productId = item.product;

				state.addingCartItems.push(productId);
			})
			.addCase(addToCartAsync.fulfilled, (state, action) => {
				const cartItem = action.payload;
				state.items.push(cartItem);

				const itemId = action.meta.arg;
				const index = state.addingCartItems.indexOf(itemId);
				state.addingCartItems.splice(index, 1);

				const product = cartItem.product;
				toast.success(`${product.title} added to cart🥳`);
			})
			.addCase(addToCartAsync.rejected, (state, action) => {
				const itemId = action.meta.arg;
				const index = state.addingCartItems.indexOf(itemId);

				state.addingCartItems.splice(index, 1);

				const message = action.payload;
				toast.error(message || 'Failed to add item to cart!');
			})


			.addCase(updateItemAsync.pending, (state, action) => {
				const itemId = action.meta.arg.id;
				state.updatingCartItems.push(itemId);
			})
			.addCase(updateItemAsync.fulfilled, (state, action) => {
				const itemId = action.payload.id;
				const index = state.items.findIndex(item => item.id === itemId);
				state.items[index] = action.payload;

				const updatingCartItemIndex = state.updatingCartItems.indexOf(itemId);
				state.updatingCartItems.splice(updatingCartItemIndex, 1);

				const product = action.payload.product;
				toast.success(`${product.title} quantity updated to ${action.payload.quantity}`);
			})
			.addCase(updateItemAsync.rejected, (state, action) => {
				const itemId = action.meta.arg.id;
				const error = action.payload;
				const index = state.updatingCartItems.indexOf(itemId);

				state.updatingCartItems.splice(index, 1);

				toast.error(error || 'Failed to update cart item');
			})


			.addCase(deleteItemFromCartAsync.pending, (state, action) => {
				const itemId = action.meta.arg;
				state.deletingCartItems.push(itemId)
			})
			.addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
				const index = state.items.findIndex(item => item.id === action.payload.id);
				state.items.splice(index, 1);

				const deleteCartItemIndex = state.deletingCartItems.indexOf(action.payload.id);
				state.deletingCartItems.splice(deleteCartItemIndex, 1);

				const product = action.payload.product;
				toast.success(`${product.title} removed from cart`);
			})
			.addCase(deleteItemFromCartAsync.rejected, (state, action) => {
				const itemId = action.meta.arg;

				const proxyItem = state.items.find(item => item.id === itemId);
				const item = current(proxyItem);
				const product = item.product;
				
				const deleteCartItemIndex = state.deletingCartItems.indexOf(itemId);
				state.deletingCartItems.splice(deleteCartItemIndex, 1);

				toast.error(`Failed to remove ${product.title} from cart`);
			})


			.addCase(clearCartAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(clearCartAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items = [];
				toast.success('Cart cleared successfully')
			})
			.addCase(clearCartAsync.rejected, (state, action) => {
				state.status = 'idle';
				const error = action.payload;

				toast.error(error || 'Failed to clear cart');
			})
	},
});


export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsStatus = (state) => state.cart.status;

export const selectAddingCartItems = (state) => state.cart.addingCartItems;
export const selectUpdatingCartItems = (state) => state.cart.updatingCartItems;
export const selectDeletingCartItems = (state) => state.cart.deletingCartItems;

export default cartSlice.reducer;
