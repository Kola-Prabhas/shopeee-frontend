import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";

import { ThreeDots } from 'react-loader-spinner';


const baseUrl = process.env.REACT_APP_BASE_URL;

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51PfYgfCP52ANZ4velwZeiqbZBWg6pNcmaiXtR8lkmUgVkOgPMGCxAYyFtUuQFPiBnBokZDjBs9uSoSbXw1KPwz7K00lFfm5M6b");

export default function StripeCheckout() {
	const [clientSecret, setClientSecret] = useState("");
	const [clientSecretLoading, setClientSecretLoading] = useState(true);

	const location = useLocation();
	const totalAmount = location.state.totalPrice;
	const orderId = location.state.orderId;

	useEffect(() => {
		setClientSecretLoading(true);
		// Create PaymentIntent as soon as the page loads
		fetch(baseUrl + "/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ totalAmount: +totalAmount.toFixed(2) }),
			meta: {
				order_id: orderId
				// this info will go to stripe and then to our server via webhook
				// useful for determining which order is successful even if client closes the browser
			}
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret))
			.finally(() => setClientSecretLoading(false));
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const appearance = {
		theme: 'stripe',
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="Stripe my-10 flex items-center justify-center">
			{clientSecretLoading && (
				<div className='min-h-[80vh] flex items-center justify-center'>
					<ThreeDots
						visible={true}
						height="80"
						width="80"
						color="#4F46E5"
						radius="10"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			)}
			{clientSecret && !clientSecretLoading && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm
						orderId={orderId}
						totalAmount={totalAmount}
					/>
				</Elements>
			)}
		</div>
	);
}