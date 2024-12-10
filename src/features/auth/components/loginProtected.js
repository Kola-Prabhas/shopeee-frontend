import { Link } from "react-router-dom";
import { getUserId } from '../utils/getUserId';


function LoginProtected({ children }) {
	const userId = getUserId();

	if (!userId) {
		return (
			<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-indigo-600 sm:text-5xl">Login Required!</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">Please login to view this page</p>
				<div className="mt-6 flex items-center justify-center gap-x-6">
					<Link
						to="/login"
						className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Login
					</Link>
				</div>
			</main>
		)
	}

	return children;
}

export default LoginProtected;