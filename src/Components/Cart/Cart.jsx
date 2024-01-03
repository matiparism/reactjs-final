import { Link } from 'react-router-dom';
import './Cart.css';
import { useCartContext } from '../../Context/CartContext';
import {
	FaArrowLeft,
	FaLeaf,
	FaTrash,
	FaBoxOpen,
	FaAngleRight,
} from 'react-icons/fa';

export default function Cart() {
	const {
		cartList,
		deleteItem,
		getTotalPrice,
		getItemQuantity,
		clearCartList,
	} = useCartContext();

	return (
		<section className='cart'>
			<div className='cart__head'>
				<Link to={-1}>
					<FaArrowLeft className='cart__head__back' />
				</Link>
				<h1 className='cart__head__title'>Shopping Cart</h1>
			</div>
			<p className='cart__items__number'>
				{getItemQuantity()}
				{getItemQuantity() === 1 ? ' item' : ' items'}
			</p>
			{cartList.map((item) => {
				return (
					<div
						className='cart__item'
						key={item.id}
					>
						<img
							src={item.img}
							alt={`${item.name} product`}
							className='cart__item__img'
						/>
						<div className='cart__item__description'>
							<div>
								<div className='cart__item__head'>
									<h2 className='cart__item__name'>{item.name}</h2>
									<img
										className='cart__item__icon'
										src={'https://ibb.co/DMtB7sX'}
										alt={
											item.isPremium
												? 'Premium product icon'
												: 'Regular product icon'
										}
									/>
									{item.isVegetarian ? (
										<FaLeaf className='cart__item__icon' />
									) : (
										''
									)}
								</div>
								<div className='cart__item__price'>
									<p>Price: ${item.price}</p>
									<p>Sub-total: ${item.price * item.quantity}</p>
								</div>
							</div>
							<div className='cart__units'>
								<div>
									<p className='cart__item__pieces'>
										{item.pieces * item.quantity} pieces
									</p>
									<p className='cart__units__quantity'>
										x{item.quantity} units
									</p>
								</div>
								<button
									onClick={() => deleteItem(item.id)}
									className='cart__units__button'
								>
									<FaTrash />
								</button>
							</div>
						</div>
					</div>
				);
			})}
			{cartList.length === 0 ? (
				<div className='cart__empty'>
					<h3>Your cart is empty</h3>
					<Link to='/all'>
						<button>Browse Our Products</button>
					</Link>
				</div>
			) : (
				<>
					<div className='cart__price'>
						<p>Sub-total:</p>
						<p>${getTotalPrice().toFixed(2)}</p>
						<p>Delivery Fees:</p>
						<p>$5.99</p>
						<h3>Total Amount:</h3>
						<p className='cart__price__total'>
							${(getTotalPrice() + 5.99).toFixed(2)}
						</p>
					</div>
					<div className='cart__buttons'>
						<button
							className='cart__clear__button'
							onClick={() => clearCartList()}
						>
							Clear Cart
							<FaBoxOpen className='cart__clear__icon' />
						</button>
						<Link to='/checkout'>
							<button className='cart__checkout__button'>
								Go to Checkout
								<FaAngleRight className='cart__checkout__icon' />
							</button>
						</Link>
					</div>
				</>
			)}
		</section>
	);
}
