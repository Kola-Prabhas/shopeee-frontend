import { Navigate} from "react-router-dom";
import PageNotFound from "../../../pages/404";

import { getUserId } from '../utils/getUserId';
import {getUserRole} from '../utils/getUserRole';

function Protected({ children }) {
	const userId = getUserId;
	const userRole = getUserRole();


	if (!userId) {
		return <Navigate to='/login' replace={true} />
	} 


	if (userRole !== 'user') {
		return <PageNotFound />
	}

	return children;
}

export default Protected;