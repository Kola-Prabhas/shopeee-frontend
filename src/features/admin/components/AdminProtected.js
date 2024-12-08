import { Navigate } from "react-router-dom";
import PageNotFound from "../../../pages/404";

import { getUserId } from '../../auth/utils/getUserId';
import {getUserRole} from '../../auth/utils/getUserRole';

function AdminProtected({ children }) {
	const userId = getUserId();
	const userRole = getUserRole();
    

	if (!userId) {
		return <Navigate to='/login' replace={true} />
	} 

	if (userRole !== 'admin') {
		return <PageNotFound/>
	}

	return children;
}

export default AdminProtected;