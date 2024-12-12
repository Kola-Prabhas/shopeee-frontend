const baseUrl = process.env.REACT_APP_BASE_URL;

export async function createUser(user) {
	try {
		const response = await fetch(baseUrl + '/auth/signup', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			const errorData = await response.json();

			throw new Error(errorData.message);
		}

		const data = await response.json();

		return data;
	} catch (e) {
		throw e;
	}
}

export async function loginUser(user) {
	try {
		const res = await fetch(baseUrl + '/auth/login', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
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

/* export function checkAuth() {
	return new Promise(async (resolve, reject) => {
		const res = await fetch('baseUrl/auth/check');

		if (res.ok) {
			const data = await res.json();

			resolve({ data });
		} else {
			const data = await res.json();

			reject({ data });
		}
	})
}
 */

export async function logoutUser() {
	try {
		const res = await fetch(baseUrl + '/auth/logout', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		});

		const data = await res.json();

		return { data }
	} catch (e) {
		console.log('An error occurred while making reset password request ', e);

		return { data: e }
	}
}


export async function resetPasswordRequest(email) {
	try {
		const res = await fetch(baseUrl + '/auth/reset-password-request', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
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


export async function resetPassword({ email, password, token }) {
	try {
		const res = await fetch(baseUrl + '/auth/reset-password', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password, token }),
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

// export function updateUser(update) {
// 	return new Promise(async (resolve, reject) => {

// 		const res = await fetch('baseUrl/users/'+update.id, {
// 			method: 'PATCH',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(update),

// 		});
// 		const data = await res.json();


// 		resolve({ data });
// 	})
// }