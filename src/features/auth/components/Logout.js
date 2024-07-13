import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { selectUser, signOutAsync } from "../authSlice";
import { useDispatch } from "react-redux";


function Logout() {
	const user = useSelector(selectUser); 
	const dispatch = useDispatch();

	useEffect(() => {
		sessionStorage.removeItem('user');
		dispatch(signOutAsync(user.id))
	}, []);


	console.log(user)




	return (
		<>
			{
				!user && <Navigate to='/login'></Navigate>
			}	
			
		</>
		 
	);
}

export default Logout;