const baseUrl = process.env.REACT_APP_BASE_URL;

// export async function fetchProductsByFilter(filter, sortOptions, pagination, admin) {
// 	let queryString = '';


// 	for (let key in filter) {
// 		for (let item of filter[key]) {
// 			queryString += `${key}=${item}&`
// 		}
// 	}

// 	for (let key in pagination) {
// 		queryString += `${key}=${pagination[key]}&`;
// 	}

// 	for (let key in sortOptions) {
// 		queryString += `${key}=${sortOptions[key]}&`;
// 	}

// 	if (admin) {
// 		queryString += `admin=true`;
// 	}


// 	try {
// 		const res = await fetch(baseUrl + '/products?' + queryString, {
// 			credentials: 'include', // Include cookies in the request
// 		});

// 		const data = await res.json();

// 		const totalItems = await res.headers.get('X-Total-Count');

// 		return { data: { data, totalItems } };

// 	} catch (error) {
// 		console.log(error);
// 		return { data: error }
// 	}
// }


export async function fetchProductById(id) {
	try {
		const res = await fetch(baseUrl + '/products/' + id, {
			credentials: 'include', // Include cookies in the request
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message);
		}

		const data = await res.json();

		return data;
	} catch (error) {
		throw error;		
	}

}


export function addProduct(product) {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/products', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product),

		});
		const data = await res.json();

		resolve({ data });
	})
}

export async function updateProduct(product) {
	try {
		const res = await fetch(baseUrl + '/products/' + product.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product),
		});

		if (!res.ok) {
			const errorData = await res.json();

			throw new Error(errorData.message);
		}

		const data = await res.json();

		return data;
	} catch (error) {
		throw error;
	}
}