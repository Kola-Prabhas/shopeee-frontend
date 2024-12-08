import { useEffect } from "react";
import { logoutUserAsync } from "../authSlice";
import { useDispatch } from "react-redux";
import { resetUser } from "../../user/userSlice";
import { getUserId } from "../utils/getUserId";


function Logout() {
	const dispatch = useDispatch();

	const userId = getUserId();


	useEffect(() => {
		sessionStorage.removeItem('user');
		
		dispatch(resetUser())
		dispatch(logoutUserAsync(userId))
	}, [dispatch, userId]);


	return (
		<div> User logout successful</div>
	)
}


export default Logout;