import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.REACT_APP_BASE_URL + '/user';


export const userApi = createApi({
	reducerPath: 'userInfo',
	baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
	endpoints: (builder) => ({
		getUserInfo: builder.query({
			query: () => '/',
		}),
	}),
});

export const { useGetUserInfoQuery } = userApi;