import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { selectUser, logoutUserAsync } from "../authSlice";
import { useDispatch } from "react-redux";
import { resetUser } from "../../user/userSlice";


function Logout() {
	const user = useSelector(selectUser); 
	const dispatch = useDispatch();

	useEffect(() => {
		sessionStorage.removeItem('user');
		dispatch(resetUser())
		dispatch(logoutUserAsync(user.id))
	}, [dispatch, user.id]);



	// return !user && <Navigate to='/login' />

	
	return (
		<div> User logout successful</div>
	)
}


export default Logout;