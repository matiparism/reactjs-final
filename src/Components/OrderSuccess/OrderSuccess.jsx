import './OrderSuccess.css';
import { Link, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import logo from '../../Images/3D Garage Logo no background.png';

export default function OrderSuccess() {
	const { orderId } = useParams();

	return (
		<section className='success'>
			<h1 className='success__title'>Thank you!</h1>
			<div>
				<p className='success__text'>
					Your order ID is: <span className='bold'>{orderId}</span>
				</p>
				<p>Please check your email for further instructions.</p>
			</div>
			<img
				className='success__img'
				src={logo}
				alt='3D Model'
			/>
			<Link
				to='/'
				className='success__link'
			>
				<button className='success__button'>
					Go to Home
					<FaHome className='success__button__icon' />
				</button>
			</Link>
		</section>
	);
}
