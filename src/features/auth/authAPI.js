const baseUrl = process.env.REACT_APP_BASE_URL;

export function createUser(user) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(baseUrl+'/auth/signup', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),

		});
		const data = await response.json();

		resolve({ data });
	})
}

export function loginUser(user) {
	console.log('user ', user);
	return new Promise(async (resolve, reject) => {
		// const res = await fetch(baseUrl + '/auth/login', {
		const res = await fetch('http://localhost:8000/auth/login', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (res.ok) {
			const data = await res.json();
			console.log('login response ', data);

			resolve({ data });
		} else {
			const data = await res.json();
			console.log('login error ', data);


			reject({ data });
		}		
	})
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

export function signOut(userId) {
	return new Promise(async (resolve, reject) => {

		resolve({ data: 'success' });
	})
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