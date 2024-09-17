import { useSelector } from "react-redux";
import {selectUser} from '../features/auth/authSlice'
import UserOrders from "../features/user/components/UserOrders";
import { Navigate } from "react-router-dom";


function UserOrdersPage() {
	const user = useSelector(selectUser);

	return ( 
		<>
			{/* {user.role === 'admin' && <Navigate to='/' replace={true} />} */}
			<UserOrders />
		</>
	);
}

export default UserOrdersPage;