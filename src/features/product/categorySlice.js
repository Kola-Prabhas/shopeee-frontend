import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCategories } from './categoryApi';

const initialState = {
	categories: [],
	status: 'idle',
	error: null,
}


export const fetchCategoriesAsync = createAsyncThunk(
	'category/fetchCategories',
	async (_, {rejectWithValue}) => {
		try {
			const response = await fetchCategories();
			return response.data;
			
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);



export const categorySlice = createSlice({
	name: 'category',
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(fetchCategoriesAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.categories = action.payload;
			})
			.addCase(fetchCategoriesAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
	}
});

export const selectAllCategories = state => state.category.categories;
export const selectCategoriesStatus = state => state.category.status;
export const selectCategoriesError = state => state.category.error;


export default categorySlice.reducer;