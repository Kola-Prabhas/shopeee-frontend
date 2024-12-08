import { Navigate } from "react-router-dom";
import {getUserId} from '../utils/getUserId';


function UserProtected({ children }) {
	const userId = getUserId();

	if (!userId) {
		return <Navigate to='/login' replace={true} />
	}

	return children;
}

export default UserProtected;