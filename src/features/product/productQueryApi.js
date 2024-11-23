import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { fetchProductsByFilter } from './productAPI';


const baseUrl = process.env.REACT_APP_BASE_URL + '/products';


export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include'}),
	endpoints: (builder) => ({
		fetchProductsByFilter: builder.query({
			query: ({ filter, sortOptions, pagination, admin=false }) => {
				// Construct the query string
				const params = new URLSearchParams();

				Object.keys(filter).forEach((key) => {
					filter[key].forEach((item) => params.append(key, item));
				});

				Object.entries(pagination).forEach(([key, value]) => params.append(key, value));
				Object.entries(sortOptions).forEach(([key, value]) => params.append(key, value));

				if (admin) {
					params.append('admin', 'true');
				}

				const queryString = '?' + params.toString();

				return queryString;
			},
			transformResponse: (response, meta) => ({
				products: response,
				totalItems: meta.response.headers.get('X-Total-Count'), 
			}),
			providesTags: (result, error, { filter, sortOptions, pagination, admin }) => {
				const tags = [{ type: 'Products', id: 'LIST' }];

				if (filter) {
					for (const key in filter) {
						filter[key].forEach((value) => {
							tags.push({ type: 'Products', id: `${key}-${value}` });
						});
					}
				}

				if (sortOptions) {
					for (const key in sortOptions) {
						tags.push({ type: 'Products', id: `sort-${key}-${sortOptions[key]}` });
					}
				}

				if (pagination) {
					tags.push({ type: 'Products', id: `page-${pagination.page || 1}` });
				}

				if (admin) {
					tags.push({ type: 'Products', id: 'admin' });
				}

				return tags;
			}
		})
	}),
})


export const {useFetchProductsByFilterQuery } = productApi;