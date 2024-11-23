export default function ShippingDetails({ address }) {
	return (
		<div>
			<h2 className="text-lg sm:text-xl font-semibold">Delivery</h2>
			<p className="mt-1 truncate font-semibold max-sm:text-sm text-gray-900/50">{address.street}, {address.pinCode}</p>
			<p className="mt-1 truncate font-semibold max-sm:text-sm text-gray-900/50">{address.city}</p>
			<p className="mt-1 truncate font-semibold max-sm:text-sm text-gray-900/50">{address.name} {address.phone}</p>
			<p className="mt-1 truncate font-semibold max-sm:text-sm text-gray-900/50"></p>
		</div>
	)
}