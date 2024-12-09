import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

import {
	fetchUserAddresses,
	addUserAddress,
	deleteUserAddress,
	updateUserAddress
} from './addressAPI';


export const fetchUserAddressesAsync = createAsyncThunk(
	'address/fetchUserAddresses',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchUserAddresses();
			return response.addresses;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
)

export const addUserAddressAsync = createAsyncThunk(
	'address/addUserAddress',
	async (address, { rejectWithValue }) => {
		try {
			const response = await addUserAddress(address);
			return response.address;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
)

export const deleteUserAddressAsync = createAsyncThunk(
	'address/deleteUserAddress',
	async (id, { rejectWithValue }) => {
		try {
			const response = await deleteUserAddress(id);
			return response.address;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
)

export const updateUserAddressAsync = createAsyncThunk(
	'address/updateUserAddress',
	async ({ id, address }, { rejectWithValue }) => {
		try {
			const response = await updateUserAddress(id, address);

			return response.address;
		} catch (error) {
			console.log('error ', error);
			return rejectWithValue(error.message);
		}
	}
);


const initialState = {
	status: 'idle',
	addresses: [],
	deletingAddesses: [], // ids of addresses being deleted
	updatingAddresses: [], // ids of addresses being updated
}



const addressSlice = createSlice({
	name: 'address',
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(fetchUserAddressesAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserAddressesAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.addresses = action.payload;
			})
			.addCase(fetchUserAddressesAsync.rejected, (state) => {
				state.status = 'idle';
			})


			.addCase(addUserAddressAsync.fulfilled, (state, action) => {
				state.addresses.push(action.payload);
			})
			// .addCase(addUserAddressAsync.rejected, (state) => {
			// })


			.addCase(deleteUserAddressAsync.pending, (state, action) => {
				const deletingAddressId = action.meta.arg;

				state.deletingAddesses.push(deletingAddressId);
			})
			.addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
				const addressId = action.meta.arg;
				const deleteAddressIndex = state.deletingAddesses.indexOf(addressId);
				
				state.addresses = state.addresses.filter(address => address.id !== addressId);
				state.deletingAddesses.splice(deleteAddressIndex, 1);
			})
			.addCase(deleteUserAddressAsync.rejected, (state, action) => {
				const addressId = action.meta.arg;
				const addressIndex = state.deletingAddesses.indexOf(addressId);

				state.deletingAddesses.splice(addressIndex, 1);
			})


			.addCase(updateUserAddressAsync.pending, (state, action) => {
				const updateAddressId = action.meta.arg.id;

				state.updatingAddresses.push(updateAddressId);
			})
			.addCase(updateUserAddressAsync.fulfilled, (state, action) => {
				const addressId = action.meta.arg.id;
				const updateAddressIndex = state.updatingAddresses.indexOf(addressId);

				state.addresses = state.addresses.map(address => {
					console.log('address ', current(address));
					if (address.id === addressId) {
						return action.payload;
					}

					return address;
				})
				state.updatingAddresses.splice(updateAddressIndex, 1);
			})
			.addCase(updateUserAddressAsync.rejected, (state, action) => {
				const addressId = action.meta.arg.id;
				const addressIndex = state.deletingAddesses.indexOf(addressId);

				state.updatingAddresses.splice(addressIndex, 1);
			})
	}
});

export default addressSlice.reducer;

export const selectUserAddresses = (state) => state.address.addresses;
export const selectUserAddressesStatus = (state) => state.address.status;
export const selectDeletingAddresses = (state) => state.address.deletingAddesses;
export const selectUpdatingAddresses = (state) => state.address.updatingAddresses;