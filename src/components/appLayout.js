import { Outlet } from "react-router-dom";
import Navbar from "../features/navbar";

function AppLayout() {
	return ( 
		<Navbar>
			<Outlet />
		</Navbar>
	 );
}

export default AppLayout;