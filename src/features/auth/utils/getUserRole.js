export function getUserRole() {
	const user = JSON.parse(sessionStorage.getItem('user'));
	
	return user?.role;
}