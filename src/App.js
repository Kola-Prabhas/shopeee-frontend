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

// import LoginProtected from './features/auth/components/LoginProtected';
import AdminProtected from './features/admin/components/AdminProtected';


import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckout from './pages/StripeCheckout';
import LoginProtected from "./features/auth/components/loginProtected";


const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/cart",
				element: <LoginProtected><CartPage /></LoginProtected>,
			},
			{
				path: "/checkout",
				element: <LoginProtected><CheckoutPage /></LoginProtected>,
			},
			{
				path: "/stripe-checkout",
				element: <LoginProtected><StripeCheckout /></LoginProtected>,
			},
			{
				path: "/product-details/:id",
				element: <ProductDetailsPage />,
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
				element: <LoginProtected><UserOrdersPage /></LoginProtected>,
			},
			{
				path: "/profile",
				element: <LoginProtected><UserProfilePage /></LoginProtected>,
			},
			{
				path: "/logout",
				element: <LoginProtected><LogoutPage /></LoginProtected>,
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
