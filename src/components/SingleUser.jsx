import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleUser, creditUser, debitUser } from '../utils/apicalls';
import '../styles/TableStyle.css';
import '../styles/SingleUserPageStyle.css';

export default function SingleUser() {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [transactionsList, setTransactionsList] = useState([]);
	const [amount, setAmount] = useState(0);
	const [error, setError] = useState(false);

	const handleSubmitCredit = event => {
		event.preventDefault();
		creditUser(id, amount).then(user => {
			setUser(user);
			setTransactionsList(user.transactions);
			setAmount(0);
		});
	};
	const handleSubmitDebit = event => {
		event.preventDefault();
		if (user.balance >= amount) {
			debitUser(id, amount).then(user => {
				setUser(user);
				setTransactionsList(user.transactions);
				setAmount(0);
			});
		} else {
			setError(true);
		}
	};
	useEffect(() => {
		let isMounted = true; // note mutable flag

		getSingleUser(id).then(data => {
			setUser(data);
			setTransactionsList(data.transactions);
		});

		return () => {
			isMounted = false;
		};
	}, [id]);
	if (error) {
		setTimeout(() => {
			setError(false);
		}, 3000);
	}
	return (
		<div className='UserContainer'>
			<img
				className='UserPageProfileImg'
				src={`https://api.multiavatar.com/${user.name}.png`}
				alt={`of ${user.name}`}
			/>
			<div className='Details'>
				<p className='UserPageName'>{user.name}</p>

				<p>
					balance: <span className='UserPageBalance'>£{user.balance}</span>
				</p>
				<div className='buttons'>
					<form>
						{error ? <div className='error'>Insufficient funds</div> : null}
						<input
							type='number'
							min='1'
							step='any'
							value={amount}
							onChange={event => setAmount(event.target.value)}
						/>
						<button name='Credit' className='btn' onClick={handleSubmitCredit}>
							Credit
						</button>
						<button name='Debit' className='btn' onClick={handleSubmitDebit}>
							Debit
						</button>
					</form>
				</div>
			</div>
			<div className='Table'>
				<p className='UserPageTableTitle'>Transactions</p>
				<table class='purpleHorizon'>
					<thead>
						<tr>
							<th>Transaction Id</th>
							<th>Amount</th>
							<th>Balance</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{transactionsList.map(transaction => {
							return (
								<tr key={transaction.id}>
									<td>{transaction.id}</td>
									<td>£{transaction.amount}</td>
									<td>£{transaction.balance}</td>
									<td>{transaction.type}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
