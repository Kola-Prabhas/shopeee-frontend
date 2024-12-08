import AdminHome from "../features/admin/components/AdminHome";
import Home from "../features/user/components/Home";

import {getUserRole} from '../features/auth/utils/getUserRole';


export default function HomePage() {
	const userRole = getUserRole();

	if (userRole === 'admin') {
		return <AdminHome />
	}


	return <Home />
}