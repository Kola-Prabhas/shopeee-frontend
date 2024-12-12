const baseUrl = process.env.REACT_APP_BASE_URL;

export async function addToCart(item) {
	try {
		const res = await fetch(baseUrl + '/cart', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item)
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData?.message || 'Failed to add item to cart!');
		}

		const data = await res.json();

		return data.data;
	} catch (e) {
		throw e;
	}
}


export async function fetchItemsByUserId() {
	try {
		const res = await fetch(baseUrl + '/cart', {
			credentials: 'include', // Include cookies in the request
		});


		if (!res.ok) { 
			const errorData = await res.json();
			throw new Error(errorData.message);
		}

		const data = await res.json();
		return data;
	} catch (e) {
		throw e;
	}
}


export async function updateItem(item) {
	try {
		const res = await fetch(baseUrl + '/cart/' + item.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item)
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message);
		}

		const data = await res.json();
		return data.data;
	} catch (e) {
		throw e;
	}
}


export async function deleteItem(itemId) {
	try {
		const res = await fetch(baseUrl + '/cart/' + itemId, {
			method: 'DELETE',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message);
		}

		const data = await res.json();
		return data.data;
	} catch (error) {
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

		return data;
	} catch (e) {
		throw e;
	}
}