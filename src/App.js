import './App.css';

import PageNotFound from './pages/404';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage';

import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import ProductDetailsPage from './pages/ProductDetailPage';


import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';

import Protected from './features/auth/components/protected';
import AdminProtected from './features/admin/components/AdminProtected';


import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckout from './pages/StripeCheckout';



const router = createBrowserRouter([
	{
		path: "/",
		element: <Protected><Home /></Protected>,
	},
	{
		path: "/admin",
		element: <AdminProtected><AdminHome /></AdminProtected>,
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
		element: <ForgotPasswordPage/>,
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
		element: <Protected><ProductDetailsPage /></Protected>,
	},
	{
		path: "/admin/product-details/:id",
		element: <AdminProtected><AdminProductDetailPage /></AdminProtected>,
	},
	{
		path: "/admin/orders",
		element: <AdminProtected><AdminOrdersPage/></AdminProtected>,
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
		element: <Protected><OrderPage></OrderPage></Protected>,
	},
	{
		path: "/user-orders",
		element: <Protected><UserOrdersPage></UserOrdersPage></Protected>,
	},
	{
		path: "/profile",
		element: <Protected><UserProfilePage></UserProfilePage></Protected>,
	},
	{
		path: "/logout",
		element: <Protected><LogoutPage></LogoutPage></Protected>,
	},
	{
		path: "*",
		element: <PageNotFound></PageNotFound>,
	},
]);



function App() {

  return (
	  <div className="App">
		   <RouterProvider router={router} />
	  </div>
  );
}

export default App;
