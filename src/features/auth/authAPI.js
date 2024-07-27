// A mock function to mimic making an async request for data
export  function fetchCount(amount = 1) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8080');
		const data = await res.json();

		resolve({ data });
	}) 
}


export function createUser(user) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch('http://localhost:8000/auth/signup', {
			method: 'POST',
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
	return new Promise(async (resolve, reject) => {
		const res = await fetch('http://localhost:8000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (res.ok) {
			const data = await res.json();

			resolve({ data });
		} else {
			const data = await res.json();

			reject({ data });
		}		
	})
}

/* export function checkAuth() {
	return new Promise(async (resolve, reject) => {
		const res = await fetch('http://localhost:8000/auth/check');

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

// 		const res = await fetch('http://localhost:8000/users/'+update.id, {
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