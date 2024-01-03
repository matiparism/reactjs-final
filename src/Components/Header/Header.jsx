import './Header.css';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import logo from '../../Images/3D Garage Logo no background.png';

export default function Header() {
	return (
		<>
			<header
				className='header'
				id='home'
			>
				<img
					className='header__img'
					src={logo}
					alt='3D Garage Banner'
				/>
				<section className='header__text'>
					<h1 className='header__title'>Quality 3D Auto Parts</h1>
					<p className='header__description'>
						Explore our collection to find the perfect 3D-printed auto parts for
						your projects.
					</p>
					<p className='header__description'>
						Whether you need custom car accessories or replacement parts, we
						have you covered.
					</p>
					<Link to='/all'>
						<button className='header__button'>
							Explore Now
							<FaAngleRight className='header__button__icon' />
						</button>
					</Link>
				</section>
			</header>
			<img
				className='rice'
				src={logo}
				alt=''
			/>
		</>
	);
}
