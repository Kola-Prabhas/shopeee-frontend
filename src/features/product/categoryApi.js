const baseUrl = process.env.REACT_APP_BASE_URL;


export async function fetchCategories() {
	try {
		const res = await fetch(baseUrl + '/categories', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		return { data }

	} catch (error) {
		throw error
	}
}


export async function addCategory(category) {
	try {
		const res = await fetch(baseUrl + '/categories', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(category),

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