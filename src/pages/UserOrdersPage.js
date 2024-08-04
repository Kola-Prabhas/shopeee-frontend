import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar";


function UserOrdersPage() {
	return ( 
		<>
			<Navbar>
				<UserOrders />
			</Navbar>
		</>

	);
}

export default UserOrdersPage;