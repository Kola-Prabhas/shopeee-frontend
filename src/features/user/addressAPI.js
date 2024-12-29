const baseUrl = process.env.REACT_APP_BACKEND_URL;


export async function fetchUserAddresses() {
	try {
		const res = await fetch(baseUrl + '/address', {
			method: 'GET',
			credentials: 'include', // Include cookies in the request
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


export async function addUserAddress(address) {
	try {
		const res = await fetch(baseUrl + '/address', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ address })
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

export async function deleteUserAddress(id) {
	try {
		const res = await fetch(baseUrl + '/address/' + id, {
			method: 'DELETE',
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

export async function updateUserAddress(id, address) {
	try {
		const res = await fetch(baseUrl + '/address/' + id, {
			method: 'PUT',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ address })
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