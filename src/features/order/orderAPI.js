const baseUrl = process.env.REACT_APP_BASE_URL;



// export async function fetchUserOrders() {
// 	try {
// 		const res = await fetch(baseUrl + '/orders/own', {
// 			credentials: 'include', // Include cookies in the request
// 		});
// 		const data = await res.json();

// 		return { data };
// 	} catch (error) {
// 		console.log('error ', error);

// 		throw error;		
// 	}
// }



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
		const res = await fetch(baseUrl + '/orders?' + queryString, {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json(); 

		const totalOrders = await res.headers.get('X-Total-Count');


		resolve({ data: {data, totalOrders} });
	})
}


export function updateOrder(update) {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/orders/'+update.id, {
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

