const baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function fetchBrands() {
	console.log('baseurl ', baseUrl);

	try {
		const res = await fetch(baseUrl + '/brands', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		return { data };
	} catch (error) {
		throw error;
	}
}


export async function addBrand(brand) {
	try {
		const res = await fetch(baseUrl + '/brands', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(brand),

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