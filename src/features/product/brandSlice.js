import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchBrands, addBrand} from './brandApi';

export const fetchBrandsAsync = createAsyncThunk(
	'brand/fetchBrands',
	async (_,{ rejectWithValue }) => {
		try {
			const response = await fetchBrands();
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);			
		}
	}
);


export const addBrandAsync = createAsyncThunk(
	'brand/addBrand',
	async (brand, { rejectWithValue }) => {
		try {
			const response = await addBrand(brand);

			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);


const initialState = {
	brands: [],
	status: 'idle',
	addBrandStatus: 'idle'
}


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
				console.log('brands ', brands);

				state.brands = brands;
			})
			.addCase(fetchBrandsAsync.rejected, (state, action) => {
				state.status = 'idle';
			})
		

			.addCase(addBrandAsync.pending, (state) => {
				state.addBrandStatus = 'loading';
			})
			.addCase(addBrandAsync.fulfilled, (state, action) => {
				state.addBrandStatus = 'idle';
				const brand = action.payload.brand

				state.brands.push(brand);
				state.brands?.sort((a, b) => a.label.localeCompare(b.label))
			})
			.addCase(addBrandAsync.rejected, (state, action) => {
				state.addBrandStatus = 'idle';
			})
	}
});


export const selectAllBrands = state => state.brand.brands;
export const selectBrandsStatus = state => state.brand.status;
export const selectAddBrandStatus = state => state.brand.addBrandStatus;


export default brandSlice.reducer;