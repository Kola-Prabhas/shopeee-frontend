import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import AdminHome from "../features/admin/components/AdminHome";
import Home from "../features/user/components/Home";


export default function HomePage() {
	const user = useSelector(selectUser);

	if (user.role === 'admin') {
		return <AdminHome />
	}


	return <Home />
}