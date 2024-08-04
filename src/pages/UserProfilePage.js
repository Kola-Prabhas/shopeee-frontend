import UserProfile from "../features/user/components/UserProfile";
import Navbar from "../features/navbar";


function UserProfilePage() {
	return (
		<>
			<Navbar>
				<UserProfile />
			</Navbar>
		</>

	);
}

export default UserProfilePage;