import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrdersByUserId, fetchUserInfo,updateUser } from './userAPI';

const initialState = {
	status: 'idle',
    userInfo: null
};


export const fetchOrdersByUserIdAsync = createAsyncThunk(
  'user/fetchOrdersByUserId',
  async () => {
    const response = await fetchOrdersByUserId();
    return response.data;
  }
);


export const fetchUserInfoAsync = createAsyncThunk(
	'user/fetchUserInfo',
	async () => {
		const response = await fetchUserInfo();
		return response.data;
	}
);

export const updateUserAsync = createAsyncThunk(
	'auth/updateUser',
	async (update) => {
		const response = await updateUser(update);
		return response.data;
	}
);

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
	  })
	  .addCase(fetchUserInfoAsync.pending, (state) => {
		state.status = 'loading';
	  })
	  .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
		state.status = 'idle';
		state.userInfo = action.payload;
	  })
		.addCase(updateUserAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(updateUserAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			state.userInfo = action.payload;
		});
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
