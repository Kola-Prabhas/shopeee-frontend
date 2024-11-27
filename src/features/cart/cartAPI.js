const baseUrl = process.env.REACT_APP_BASE_URL;

export function addToCart(item) {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/cart', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item)
		});
		const data = await res.json();


		resolve({ data });
	})
}


export function fetchItemsByUserId() {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/cart', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();


		resolve({ data });
	})
}


export function updateItem(item) {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/cart/' + item.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item)
		});
		const data = await res.json();


		resolve({ data });
	})
}


export async function deleteItem(itemId) {
	console.log('delete item called')
	try {
		const res = await fetch(baseUrl + '/cart/' + itemId, {
			method: 'DELETE',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		const data = await res.json();
	
		return {data};
	} catch (error) {
		console.log('error in deleting cart', error);
		throw error;		
	}

}


export async function clearCart(cartItems) {
	const cartItemIds = [];

	for (const item of cartItems) {
		cartItemIds.push(item.id)
	}


	try {
		const res = await fetch(baseUrl + '/cart/', {
			method: 'DELETE',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ cartItemIds })
		});

		const data = await res.json();

		return { data };
	} catch (e) {
		console.log(e);
		throw e;
	}
}