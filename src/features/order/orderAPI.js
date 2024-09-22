export function createOrder(order) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/orders/', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order)
		});

		const data = await res.json();


		const response = await fetch('http://localhost:8000/users/' + order.user, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})

		await response.json();

		resolve({ data });
	})
}


export function fetchAllOrders({ pagination, sortOptions, admin }) {
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


	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/orders?' + queryString, {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json(); 

		console.log('querystring ', queryString);
		console.log('all orders', data);

		const totalOrders = await res.headers.get('X-Total-Count');


		resolve({ data: {data, totalOrders} });
	})
}


export function updateOrder(update) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/orders/'+update.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(update)
		});
		const data = await res.json();

		resolve({ data });
	})
}

/* export function resetOrder(orderId) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/orders/'+orderId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		resolve({ data });
	})
} */
