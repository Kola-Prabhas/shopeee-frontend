// This is currently not used
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/orders';

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
	endpoints: (builder) => ({
		getUserOrders: builder.query({
			query: () => 'own',
		})
	})
})


export const { useGetUserOrdersQuery } = orderApi;