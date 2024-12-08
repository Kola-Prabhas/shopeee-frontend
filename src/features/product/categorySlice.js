import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCategories, addCategory } from './categoryApi';


export const fetchCategoriesAsync = createAsyncThunk(
	'category/fetchCategories',
	async (_, {rejectWithValue}) => {
		try {
			const response = await fetchCategories();
			return response.data;
			
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);


export const addCategoryAsync = createAsyncThunk(
	'category/addCategory',
	async (category, { rejectWithValue }) => {
		try {
			const response = await addCategory(category);

			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	categories: [],
	status: 'idle',
	addCategoryStatus: 'idle'
}

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

				const categories = action.payload?.sort((a, b) => a.label.localeCompare(b.label));
				state.categories = categories;
			})
			.addCase(fetchCategoriesAsync.rejected, (state, action) => {
				state.status = 'idle';
				state.error = action.payload;
			})
		
		
		
			.addCase(addCategoryAsync.pending, (state) => {
				state.addCategoryStatus = 'loading';
			})
			.addCase(addCategoryAsync.fulfilled, (state, action) => {
				state.addCategoryStatus = 'idle';
				const category = action.payload.category;

				state.categories.push(category);
				state.categories?.sort((a, b) => a.label.localeCompare(b.label))
			})
			.addCase(addCategoryAsync.rejected, (state) => {
				state.addCategoryStatus = 'idle';
			})
	}
});

export const selectAllCategories = state => state.category.categories;
export const selectCategoriesStatus = state => state.category.status;
export const selectAddCategoryStatus = state => state.category.addCategoryStatus;


export default categorySlice.reducer;