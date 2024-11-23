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


export function updateUser(update) {
	return new Promise(async (resolve, reject) => {

		const res = await fetch(baseUrl + '/users/' + update.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			// headers: {
			// 	'Content-Type': 'application/json',
			// },
			body: update,

		});

		if (res.ok) {
			const data = await res.json();

			console.log('data ok ', data);
	
			resolve({ data });
		} else {
			const data = await res.json();

			console.log('data no ok ', data);
			reject({data})
		}
	})
}