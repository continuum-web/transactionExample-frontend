import { Link } from 'react-router-dom';
import '../styles/UserCardStyle.css';

export default function UserCard({ user }) {
	const { name, email, balance, _id } = user;

	return (
		<div className="UserCard">
			<img src={`https://api.multiavatar.com/${user.name}.png`} alt={ `of ${name}`} className="ProfileImg"/>
			<p className="UserName">Name: {name}</p>
			<p>Email: {email}</p>
			<p>Balance: £{balance}</p>

			<Link className="UserLink" to={`/users/${_id}`}>Select User</Link>
		</div>
	);
}
