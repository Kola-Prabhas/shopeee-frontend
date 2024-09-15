// A mock function to mimic making an async request for data



// A mock function to mimic making an async request for data
export function fetchProductsByFilter(filter, sortOptions, pagination, admin) {
	let queryString = '';


	for (let key in filter) {
		for (let item of filter[key]) {
			queryString += `${key}=${item}&`
		}
	}

	for (let key in pagination) {
		queryString += `${key}=${pagination[key]}&`;
	}

	for (let key in sortOptions) {
		queryString += `${key}=${sortOptions[key]}&`;
	}

	if (admin) {
		queryString += `admin=true`;
	}


	console.log('queryString ', queryString);



	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/products?' + queryString, {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		const totalItems = await res.headers.get('X-Total-Count');

		resolve({ data: { data, totalItems } } );
	})
}

export function fetchCategories() {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/categories', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		resolve({ data });
	})
}

export function fetchBrands() {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/brands', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		resolve({ data } );
	})
}

export function fetchProductById(id) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/products/' + id, {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		console.log(data);

		resolve({ data });
	})
}


export function addProduct(product) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/products', {
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

export function updateProduct(update) {
	console.log('Updated product ', update);

	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/products/' + update.id, {
			method: 'PATCH',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(update),
		});
		const data = await res.json();

		resolve({ data });
	})
}