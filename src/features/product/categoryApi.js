const baseUrl = process.env.REACT_APP_BASE_URL;


export async function fetchCategories() {
	try {
		const res = await fetch(baseUrl + '/categories', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		return { data }

	} catch (error) {
		console.log(error);
		throw error
	}
}