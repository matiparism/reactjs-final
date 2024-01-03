import { useState } from 'react';
import './Checkout.css';
import { Link, Navigate } from 'react-router-dom';
import { FaCheck, FaArrowLeft, FaCube, FaTrash } from 'react-icons/fa';
import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore';
import { useCartContext } from '../../Context/CartContext';
import CheckoutInputs from './CheckoutInputs';

export default function Checkout() {
	const {
		cartList,
		getTotalPrice,
		getItemQuantity,
		clearCartList,
		deleteItem,
	} = useCartContext();
	const [orderId, setOrderId] = useState('');
	const [user, setUser] = useState({
		fullName: '',
		email: '',
		emailRepeat: '',
		phone: '',
	});

	const inputs = [
		{
			id: 1,
			name: 'fullName',
			type: 'text',
			placeholder: 'Enter your full name',
			errorMessage: 'Your name must be more than 5 characters long.',
			label: 'Full Name',
			pattern: '.{6,}',
			required: true,
		},
		{
			id: 2,
			name: 'phone',
			type: 'text',
			placeholder: 'Enter your phone number',
			errorMessage:
				'Your phone number must contain 10 numeric digits in format: 000-000-0000.',
			label: 'Phone',
			pattern: '^(1s?)?((([0-9]{3}))|[0-9]{3})[s-]?[0-9]{3}[s-]?[0-9]{4}$',
			required: true,
		},
		{
			id: 3,
			name: 'email',
			type: 'email',
			placeholder: 'Enter your email address',
			errorMessage: 'Your email address must be in format: email@example.com',
			label: 'Email',
			pattern: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
			required: true,
		},
		{
			id: 4,
			name: 'emailRepeat',
			type: 'email',
			placeholder: 'Enter your email address again',
			errorMessage: "Email addresses don't match.",
			label: 'Repeat Email',
			pattern: user.email,
			required: true,
		},
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		const order = {
			buyer: {
				name: user.fullName,
				email: user.email,
				phone: user.phone,
			},
			items: cartList.map((it) => ({
				id: it.id,
				name: it.name,
				price: it.price,
				quantity: it.quantity,
			})),
			total: getTotalPrice(),
			date: serverTimestamp(),
		};
		const emailControl = new RegExp(
			'^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'
		);
		const phoneControl = new RegExp(
			'^(1s?)?((([0-9]{3}))|[0-9]{3})[s-]?[0-9]{3}[s-]?[0-9]{4}$'
		);

		if (
			user.fullName.length <= 5 ||
			!phoneControl.test(user.phone) ||
			user.email !== user.emailRepeat ||
			!emailControl.test(user.email) ||
			cartList.length === 0
		) {
			return false;
		}

		const db = getFirestore();
		const ordersCollection = collection(db, 'orders');
		addDoc(ordersCollection, order).then(({ id }) => {
			setOrderId(id);
			clearCartList();
		});
	};

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<>
			<section className='checkout'>
				<div className='checkout__head'>
					<Link to='/cart'>
						<FaArrowLeft className='checkout__head__back' />
					</Link>
					<h1 className='checkout__title'>Checkout</h1>
				</div>
				<form className='checkout__form'>
					<div className='checkout__inputs'>
						{inputs.map((input) => (
							<CheckoutInputs
								key={input.id}
								{...input}
								value={user[input.name] || ''}
								onChange={onChange}
							/>
						))}
					</div>
					<button
						onClick={handleSubmit}
						className='checkout__submit__button'
						type='submit'
					>
						Submit Order
						<FaCheck className='checkout__submit__icon' />
					</button>
				</form>
			</section>
			<section className='checkout__cart'>
				<h1 className='checkout__cart__title'>Order Summary</h1>
				<p className='checkout__cart__number'>
					{getItemQuantity()}
					{getItemQuantity() === 1 ? ' item' : ' items'}
				</p>
				{cartList.map((it) => {
					return (
						<div
							className='cart__item'
							key={it.id}
						>
							<img
								src={it.img}
								alt={`${it.name} 3D Print`}
								className='checkout__cart__img'
							/>
							<div className='checkout__cart__description'>
								<div>
									<div className='cart__item__head'>
										<h2 className='cart__item__name'>{it.name}</h2>
										<FaCube className='cart__item__icon' />
									</div>
									<div className='cart__item__price'>
										<p>Price: ${it.price}</p>
										<p>Sub-total: ${it.price * it.quantity}</p>
									</div>
								</div>
								<div className='cart__units'>
									<div>
										<p className='cart__item__pieces'>
											{it.pieces * it.quantity} pieces
										</p>
										<p className='cart__units__quantity'>
											x{it.quantity} units
										</p>
									</div>
									<button
										onClick={() => deleteItem(it.id)}
										className='cart__units__button'
									>
										<FaTrash />
									</button>
								</div>
							</div>
						</div>
					);
				})}
				<div className='cart__price'>
					<p>Sub-total:</p>
					<p>${getTotalPrice().toFixed(2)}</p>
					<p>Delivery Fees:</p>
					<p>$5.99</p>
					<h3>Total Amount:</h3>
					<p className='cart__price__total'>
						${getTotalPrice() + (5.99).toFixed(2)}
					</p>
				</div>
				{orderId ? <Navigate to={'/order/' + orderId} /> : ''}
			</section>
		</>
	);
}
