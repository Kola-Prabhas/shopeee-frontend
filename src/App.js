import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import { Toaster } from 'react-hot-toast';

import AppLayout from './components/appLayout';

import PageNotFound from './pages/404';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage';

import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import ProductDetailsPage from './pages/ProductDetailPage';


import AdminProductDetailPage from './pages/AdminProductDetailPage';

import Protected from './features/auth/components/protected';
import AdminProtected from './features/admin/components/AdminProtected';


import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckout from './pages/StripeCheckout';
import UserProtected from "./features/auth/components/userProtected";


const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <UserProtected><HomePage /></UserProtected>,
			},
			{
				path: "/cart",
				element: <Protected><CartPage /></Protected>,
			},
			{
				path: "/checkout",
				element: <Protected><CheckoutPage /></Protected>,
			},
			{
				path: "/stripe-checkout",
				element: <Protected><StripeCheckout /></Protected>,
			},
			{
				path: "/product-details/:id",
				element: <UserProtected><ProductDetailsPage /></UserProtected>,
			},
			{
				path: "/admin/product-details/:id",
				element: <AdminProtected><AdminProductDetailPage /></AdminProtected>,
			},
			{
				path: "/admin/orders",
				element: <AdminProtected><AdminOrdersPage /></AdminProtected>,
			},
			{
				path: "/admin/product-form",
				element: <AdminProtected><AdminProductFormPage /></AdminProtected>,
			},
			{
				path: "/admin/edit-product/:id",
				element: <AdminProtected><AdminEditProductPage /></AdminProtected>,
			},
			{
				path: "/order-details/:id",
				element: <OrderSuccessPage />,
			},
			{
				path: "/user-orders",
				element: <Protected><UserOrdersPage /></Protected>,
			},
			{
				path: "/profile",
				element: <Protected><UserProfilePage /></Protected>,
			},
			{
				path: "/logout",
				element: <UserProtected><LogoutPage /></UserProtected>,
			},
		]
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
	},
	{
		path: "/forgot-password",
		element: <ForgotPasswordPage />,
	},
	{
		path: "/reset-password",
		element: <ResetPasswordPage />,
	},
	{
		path: "*",
		element: <PageNotFound />,
	}
]);



function App() {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster
				toastOptions={{
					duration: 3000,
				}}
			/>
		</>
	)
}

export default App;
