import { useState } from 'react';
import './NavBar.css';
import CartWidget from './CarWidget';
import { FaUserAlt, FaTimes, FaBars } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../Images/3D Garage Logo no background.png';

function NavBar() {
	const [hiddenMenu, setHiddenMenu] = useState(true);
	const categories3D = [
		{ id: 1, name: 'category1' },
		{ id: 2, name: 'category2' },
		{ id: 3, name: 'category3' },
	];

	return (
		<nav className='nav__container'>
			<Link to='/'>
				<img
					src={logo}
					alt='Your Company Logo'
					className='nav__logo'
				/>
			</Link>
			<div
				className='nav__menu'
				id={hiddenMenu ? 'nav__hidden' : ''}
			>
				<ul className='nav__list'>
					<li className='nav__item'>
						<NavLink
							to='/3d/all'
							className='nav__link'
						>
							All 3D Products
						</NavLink>
					</li>
					{categories3D.length > 0 ? (
						categories3D.map((category) => (
							<li
								key={category.id}
								className='nav__item'
							>
								<NavLink
									to={`/3d/category/${category.name}`}
									className='nav__link'
								>
									{category.name.charAt(0).toUpperCase() +
										category.name.slice(1)}
								</NavLink>
							</li>
						))
					) : (
						<p>Loading...</p>
					)}
				</ul>
				<FaTimes
					className='nav__close__button'
					onClick={() => setHiddenMenu(!hiddenMenu)}
				/>
			</div>
			<div className='nav__buttons'>
				<Link to='/profile'>
					<FaUserAlt className='nav__profile__button' />
				</Link>
				<Link to='/cart'>
					<CartWidget />
				</Link>
				<FaBars
					className='nav__toggle__button'
					onClick={() => setHiddenMenu(!hiddenMenu)}
				/>
			</div>
		</nav>
	);
}

export default NavBar;
