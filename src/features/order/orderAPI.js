const baseUrl = process.env.REACT_APP_BACKEND_URL;


export async function fetchAllOrders({
	pagination,
	sortOptions,
	admin
}) {
	let queryString = '';

	for (let key in pagination) {
		queryString += `${key}=${pagination[key]}&`;
	}

	for (let key in sortOptions) {
		queryString += `${key}=${sortOptions[key]}&`;
	}

	if (admin) {
		queryString += `admin=true&`;
	}


	const res = await fetch(baseUrl + '/orders?' + queryString, {
		credentials: 'include', // Include cookies in the request
	});
	const data = await res.json();

	const totalOrders = await res.headers.get('X-Total-Count');


	return { data: { data, totalOrders } };
}

export async function fetchUserOrders({
	userId,
	pagination,
	sortOptions
}) {
	let queryString = '';

	for (let key in pagination) {
		queryString += `${key}=${pagination[key]}&`;
	}

	for (let key in sortOptions) {
		queryString += `${key}=${sortOptions[key]}&`;
	}


	try {
		const res = await fetch(baseUrl + `/orders/user/${userId}/?` + queryString, {
			credentials: 'include', // Include cookies in the request
		});
	
		if (!res.ok) {
			throw new Error('Failed to fetch user orders');
		}

		const ordersData = await res.json();

		return ordersData.data;
	} catch (e) {
		throw e;		
	}
}


export async function createOrder(order) {
	try {
		const res = await fetch(baseUrl + '/orders/', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order)
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message);
		}

		const data = await res.json();
		return data.data;
		// const response = await fetch(baseUrl + '/users/' + order.user, {
		// 	method: 'PATCH',
		// 	credentials: 'include', // Include cookies in the request
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(data)
		// })

		// await response.json();
	} catch (e) {
		throw e;
	}
}


export function updateOrder(order) {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/orders/' + order.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order)
		});
		const data = await res.json();

		resolve({ data });
	})
}

