import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { selectCartItems, fetchItemsByUserIdAsync } from '../features/cart/cartSlice';
import { selectUser } from '../features/auth/authSlice';
import { fetchOrdersByUserIdAsync, fetchUserInfoAsync } from '../features/user/userSlice';



const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

// Links in the navbar
const navigation = [
	{ name: 'Home', link: '/', user: true },
	{ name: 'Orders', link: '/user-orders', user: true },
	{ name: 'Admin Home', link: '/admin', admin: true },
	{ name: 'Orders Dashboard', link: '/admin/orders', admin: true },

]

// Links that appear when user clicks on their profile
const userNavigation = [
	{ name: 'My Profile', link: '/profile' },
	{ name: 'My Orders', link: '/user-orders' },
	{ name: 'Sign out', link: '/logout' },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}



export default function Navbar({ children }) {
	const userInfo = useSelector(selectUser);
	const items = useSelector(selectCartItems);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(fetchUserInfoAsync());
		if (userInfo?.role !== 'admin') {
			dispatch(fetchOrdersByUserIdAsync());
			dispatch(fetchItemsByUserIdAsync());
		}
	}, [dispatch, userInfo]);

	// console.log('user info ', userInfo);


	return (
		<div className="min-h-full">
			{userInfo && <Disclosure as="nav" className="bg-gray-800">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex h-16 items-center justify-between">
								{/* Desktop navbar */}
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<img
											className="h-8 w-8"
											src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
											alt="Your Company"
										/>
									</div>
									<div className="hidden md:block">
										<div className="ml-10 flex items-baseline space-x-4">
											{navigation.map((item) => {
												return item[userInfo.role] && (
													<Link
														key={item.name}
														to={item.link}
														className={classNames(
															item.current
																? 'bg-gray-900 text-white'
																: 'text-gray-300 hover:bg-gray-700 hover:text-white',
															'rounded-md px-3 py-2 text-sm font-medium'
														)}
														aria-current={item.current ? 'page' : undefined}
													>
														{item.name}
													</Link>
												)
											})}
										</div>
									</div>
								</div>
								<div className="hidden md:block">
									<div className="ml-4 flex items-center md:ml-6">
										{userInfo.role !== 'admin' && <>
											<Link to='/cart'>
												<button
													type="button"
													className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
												>
													<span className="absolute -inset-1.5" />
													<span className="sr-only">View notifications</span>
													<ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
												</button>
											</Link>
											<span className="inline-flex items-center rounded-full mb-5 -ml-3 z-10 bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
												{items.length}
											</span>
										</>}

										{/* Profile dropdown */}
										<Menu as="div" className="relative ml-3">
											<div>
												<Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													<img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													{userNavigation
														.filter(x => x.link !== '/user-orders' || userInfo.role !== 'admin')
														.map((item) => {
															return (
																<Menu.Item
																	key={item.name}
																	className={`${item.link === '/user-orders' && 'md:hidden'}`}
																	onClick={item.name === 'Sign Out' ? () => sessionStorage.removeItem('user') : null}

																>
																	{({ active }) => (
																		<Link
																			to={item.link}
																			className={classNames(
																				active ? 'bg-gray-100' : '',
																				'block px-4 py-2 text-sm text-gray-700'
																			)}
																		>
																			{item.name}
																		</Link>
																	)}
																</Menu.Item>
															)

														})}
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>

								{/* Mobile menu button */}
								<div className="-mr-2 flex md:hidden">
									<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>

						{/* Mobile navigation */}

						<Disclosure.Panel className="md:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
								{navigation.map((item) => (
									item[userInfo.role] && <Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'block rounded-md px-3 py-2 text-base font-medium'
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
							<div className="border-t border-gray-700 pb-3 pt-4">
								<div className="flex justify-between items-center px-2">
									<div className='flex items-center px-5'>
										<div className="flex-shrink-0">
											<img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
										</div>
										<div className="ml-3">
											<div className="text-base font-medium leading-none text-white">{userInfo.name}</div>
											<div className="text-sm font-medium leading-none text-gray-400">{userInfo.email}</div>
										</div>
									</div>

									<div className='flex mt-5'>
										<Link to='/cart'>
											<button
												type="button"
												className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
											>
												<span className="absolute -inset-1.5" />
												<ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
											</button>
										</Link>
										<span className="inline-flex items-center rounded-full mb-8 -ml-3 z-10 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
											{items.length}
										</span>
									</div>

								</div>
								<div className="mt-3 space-y-1 px-2">
									{userNavigation
										.filter(x => x.link !== '/user-orders' || userInfo.role !== 'admin')
										.map((item) => (
										<Link
											key={item.name}
											to={item.link}
											className={`${item.link === '/user-orders' && 'md:hidden'}`}
										>
											<Disclosure.Button
												key={item.name}
												as="a"
												href={item.href}
												className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
											>
												{item.name}
											</Disclosure.Button>
										</Link>

									))}
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>}

			{/* Custom heading to show in all pages on top of the actual page content */}
			{/* <header className="bg-white shadow">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">E-commerce</h1>
					</div>
				</header> */}


			{/* Content of all the pages is rendered here */}
			<main>
				<div className="mx-auto">{children}</div>
			</main>
		</div>
	)
}