const baseUrl = process.env.REACT_APP_BASE_URL;



// export function fetchOrdersByUserId() {
// 	return new Promise(async resolve => {
// 		const res = await fetch(baseUrl + '/orders/own', {
// 			credentials: 'include', // Include cookies in the request
// 		});
// 		const data = await res.json();

// 		resolve({ data });
// 	})
// }



export function createUserOrder(order) {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/orders/', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order)
		});

		const data = await res.json();


		const response = await fetch(baseUrl + '/users/' + order.user, {
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



export function fetchUserInfo() {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/users/own', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		resolve({ data });
	})
}


export async function updateUser(user) {
	console.log('user ', user);

	try {
		const res = await fetch(baseUrl + '/users/' + user.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user)
		});

		if (!res.ok) {
			const errorData = await res.json();

			throw new Error(errorData.message);
		}

		const data = await res.json();

		console.log('data ', data);

		return { data };
	} catch (e) {
		throw e;
	}
}