export function getUserId() {
	const user = JSON.parse(sessionStorage.getItem('user'));

	return user?.id;
}