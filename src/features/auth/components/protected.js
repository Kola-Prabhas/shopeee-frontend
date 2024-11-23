import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
import { Navigate} from "react-router-dom";
import PageNotFound from "../../../pages/404";


function Protected({ children }) {
	const user = useSelector(selectUser);

	if (!user) {
		return <Navigate to='/login' replace={true} />
	} 


	if (user &&  user.role !== 'user') {
		return <PageNotFound />
	}

	return children;
}

export default Protected;