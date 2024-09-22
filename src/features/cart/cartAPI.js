const baseUrl = process.env.BASE_URL;

export function addToCart(item) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/cart', {
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
		const res = await fetch('http://localhost:8000/cart', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();


		resolve({ data });
	})
}


export function updateItem(item) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/cart/'+item.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item)
		});
		const data = await res.json();

		console.log(data);


		resolve({ data });
	})
}


export function deleteItem(itemId) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/cart/' + itemId, {
			method: 'DELETE',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		await res.json();


		resolve({
			data: {
				itemId
			}
		});
	})
}


export async function resetCart() {
	const res = await fetchItemsByUserId();
	const items = await res.data;

	for (let item of items) {
		await deleteItem(item.id);
	}

	new Promise.resolve({ data: { status: 'successful' } })

}