import './ItemDetailContainer.css';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight, FaCertificate } from 'react-icons/fa';
import { useCartContext } from '../../Context/CartContext';

export default function ItemDetail({
	item: {
		id,
		img,
		name,
		description,
		price,
		parts,
		category,
		stock,
		isPremium,
		isCustomizable,
	},
}) {
	const { addToCart, isInCart } = useCartContext();

	function handleOnAdd(quantity) {
		addToCart({
			id,
			name,
			img,
			price,
			parts,
			isPremium,
			isCustomizable,
			stock,
			quantity,
		});
	}

	return (
		<section className='detail'>
			<img
				src={img}
				alt={`${name} part`}
				className='detail__img'
			/>
			<div>
				<div className='detail__description'>
					<div className='detail__description__title'>
						<h1 className='detail__title'>{name}</h1>
						{isPremium ? <FaCertificate className='detail__icon' /> : ''}
						{isCustomizable ? (
							<span className='customizable-label'>Customizable</span>
						) : (
							''
						)}
					</div>
					<div className='detail__information'>
						<p>{description}</p>
						<h3>Specifications</h3>
						<ul className='detail__information__specifications'>
							{parts ? (
								parts.map((part) => (
									<li
										key={part.id}
										className='detail__specifications'
									>
										<FaCertificate className='detail__specifications__icon' />
										{part.name}
									</li>
								))
							) : (
								<p>Loading...</p>
							)}
						</ul>
						<p>
							This {category} part is designed for various auto models and is
							made with high-quality materials for optimal performance.
						</p>
						<p>
							Order now to enhance your vehicle with the{' '}
							<span className='bold'>{name}</span>!
						</p>
					</div>
					<div className='detail__quantity'>
						<h2 className='detail__price'>
							${price ? price.toFixed(2) : <span>Loading...</span>}
						</h2>
						<p className='detail__pieces'>{parts.length} parts</p>
						<p className='detail__stock'>In stock: {stock}</p>
					</div>
				</div>
				{isInCart(id) ? (
					<Link to='/cart'>
						<button className='detail__cart__button'>
							Go to Cart
							<FaAngleRight className='detail__cart__icon' />
						</button>
					</Link>
				) : stock > 0 ? (
					<ItemCount
						stock={stock}
						onAdd={handleOnAdd}
					/>
				) : (
					<p className='detail__empty__stock'>
						This item is currently out of stock. Please check back later for
						availability.
					</p>
				)}
				<Link to='/all'>
					<button className='detail__home__button'>
						<FaAngleLeft className='detail__home__icon' />
						Browse Other Parts
					</button>
				</Link>
			</div>
		</section>
	);
}
