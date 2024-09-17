import { useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

function AdminProtected({ children }) {
	const userInfo = useSelector(selectUserInfo);
	const user = useSelector(selectUser);

	if (!user || userInfo.role !== 'admin') {
		return <Navigate to='/login' replace={true} />
	}

	// if (userInfo.role !== 'admin') {
	// 	return <Navigate to='/' replace={true}></Navigate>
	// }

	return children;
}

export default AdminProtected;