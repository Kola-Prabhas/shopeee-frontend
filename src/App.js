import './App.css';

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import AppLayout from './components/appLayout';

import PageNotFound from './pages/404';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage';

import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import ProductDetailsPage from './pages/ProductDetailPage';


import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';

import Protected from './features/auth/components/protected';
import AdminProtected from './features/admin/components/AdminProtected';


import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckout from './pages/StripeCheckout';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
	timeout: 5000,
	position: positions.TOP_RIGHT,
};


const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Protected><Home /></Protected>,
			},
			{
				path: "/admin",
				element: <AdminProtected><AdminHome /></AdminProtected>,
			},
			{
				path: "/cart",
				element: <Protected><CartPage /></Protected>,
			},
			{
				path: "/checkout",
				element: <CheckoutPage />,
			},
			{
				path: "/stripe-checkout",
				element: <Protected><StripeCheckout /></Protected>,
			},
			{
				path: "/product-details/:id",
				element: <Protected><ProductDetailsPage /></Protected>,
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
				element: <Protected><OrderSuccessPage /></Protected>,
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
				element: <Protected><LogoutPage /></Protected>,
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
		element: <PageNotFound></PageNotFound>,
	}
]);



function App() {
  return (
	  <div className="App">
		  <Provider template={AlertTemplate} {...options}>
			  <RouterProvider router={router} />
		  </Provider>
	  </div>
  );
}

export default App;
