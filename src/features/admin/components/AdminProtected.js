import { useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice";
import { Navigate } from "react-router-dom";

function AdminProtected({ children }) {
	const user = useSelector(selectUser);

	if (!user) {
		return <Navigate to='/login' replace={true}></Navigate>
	}

	if (user.role !== 'admin') {
		return <Navigate to='/' replace={true}></Navigate>
	}

	return children;
}

export default AdminProtected;