import './Footer.css';
import {
	RiWhatsappFill,
	RiInstagramFill,
	RiFacebookFill,
	RiTwitterFill,
	RiLinkedinBoxFill,
	RiGithubFill,
} from 'react-icons/ri';
import logo from '../../Images/3D Garage Logo no background.png';

export default function Footer() {
	const socials = [
		{
			id: 1,
			name: 'Instagram',
			link: 'https://www.instagram.com/',
		},
		{
			id: 2,
			name: 'Facebook',
			link: 'https://www.facebook.com/',
		},
		{
			id: 3,
			name: 'Twitter',
			link: 'https://twitter.com/',
		},
	];

	return (
		<footer
			className='footer'
			id='contact-us'
		>
			<div className='footer__container'>
				<img
					src={logo}
					alt='3D Garage logo'
					className='footer__logo'
				/>
				<section className='footer__newsletter'>
					<p className='footer__newsletter__subtitle'>
						Stay updated with the latest 3D auto parts!
					</p>
					<h3 className='footer__newsletter__title'>
						Subscribe to our newsletter
					</h3>
					<form className='footer__form'>
						<input
							type='email'
							required
							placeholder='email@gmail.com'
							className='footer__form__email'
						/>
						<button
							type='submit'
							className='footer__form__submit'
						>
							Subscribe
						</button>
					</form>
				</section>
				<section className='footer__contact'>
					<h3 className='footer__contact__title'>Contact Us</h3>
					<a
						href='/'
						className='footer__contact__phone'
					>
						<RiWhatsappFill className='footer__contact__icon' />
						+1 123-456-7890
					</a>
					<h3 className='footer__contact__title'>Follow Us</h3>
					<ul className='footer__contact__socials'>
						{socials.map((social) => {
							return (
								<li
									className='footer__contact__social'
									key={social.id}
								>
									<a href={social.link}>
										{social.name === 'Instagram' ? (
											<RiInstagramFill />
										) : social.name === 'Facebook' ? (
											<RiFacebookFill />
										) : (
											<RiTwitterFill />
										)}
									</a>
								</li>
							);
						})}
					</ul>
				</section>
			</div>
			<section className='footer__credits'>
				<p className='footer__credits__copyright'>
					© 2024 3D Garage. All rights reserved.
				</p>
				<div className='footer__credits__container'>
					<p>
						<a
							href='https://github.com/YourGitHubUsername' // Reemplaza con tu nombre de usuario de GitHub
							className='footer__credits__github'
						>
							<RiGithubFill className='footer__credits__icon' />
							matiparism
						</a>
					</p>
					<p>
						<a
							href='https://www.linkedin.com/in/your-linkedin-profile' // Reemplaza con tu perfil de LinkedIn
							className='footer__credits__github'
						>
							<RiLinkedinBoxFill className='footer__credits__icon' />
							Matias Paris
						</a>
					</p>
				</div>
			</section>
		</footer>
	);
}
