export function getDiscountprice(price, discountPercentage) {
	return Math.round(price * (1 - discountPercentage / 100))
}