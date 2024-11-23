import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../auth/authSlice";
import { selectUserInfo } from "../../user/userSlice";
import PageNotFound from "../../../pages/404";

function AdminProtected({ children }) {
	const userInfo = useSelector(selectUserInfo);
	const user = useSelector(selectUser);


	if (!user) {
		return <Navigate to='/login' replace={true} />
	} 

	if (user && userInfo.role !== 'admin') {
		return <PageNotFound/>
	}

	return children;
}

export default AdminProtected;