const baseUrl = process.env.REACT_APP_BACKEND_URL;



export function fetchUserInfo() {
	return new Promise(async resolve => {
		const res = await fetch(baseUrl + '/user', {
			credentials: 'include', // Include cookies in the request
		});
		const data = await res.json();

		resolve({ data });
	})
}


export async function updateUser(user) {
	try {
		const res = await fetch(baseUrl + '/user/' + user.id, {
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

		return { data };
	} catch (e) {
		throw e;
	}
}