import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchBrands } from './brandApi';


const initialState = {
	brands: [],
	status: 'idle',
	error: null,
}


export const fetchBrandsAsync = createAsyncThunk(
	'brand/fetchBrands',
	async (_,{ rejectWithValue }) => {
		try {
			const response = await fetchBrands();
			return response.data;
		} catch (error) {
			return rejectWithValue(error);			
		}
	}
);



export const brandSlice = createSlice({
	name: 'brand',
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(fetchBrandsAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchBrandsAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				const brands = action.payload?.sort((a, b) => a.label.localeCompare(b.label));

				state.brands = brands;
			})
			.addCase(fetchBrandsAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
	}
});


export const selectAllBrands = state => state.brand.brands;
export const selectBrandsStatus = state => state.brand.status;
export const selectBrandsError = state => state.brand.error;


export default brandSlice.reducer;