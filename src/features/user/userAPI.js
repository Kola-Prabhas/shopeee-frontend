// A mock function to mimic making an async request for data
export  function fetchCount(amount = 1) {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8080');
		const data = await res.json();

		resolve({ data });
	}) 
}



export function fetchOrdersByUserId() {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/orders/own');
		const data = await res.json();

		resolve({ data });
	})
}


export function fetchUserInfo() {
	return new Promise(async resolve => {
		const res = await fetch('http://localhost:8000/users/own');
		const data = await res.json();

		console.log(data);

		resolve({ data });
	})
}


export function updateUser(update) {
	return new Promise(async (resolve, reject) => {

		const res = await fetch('http://localhost:8000/users/' + update.id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(update),

		});
		const data = await res.json();


		resolve({ data });
	})
}