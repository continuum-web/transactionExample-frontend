import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleUser } from '../utils/apicalls';
import '../styles/TableStyle.css';
import '../styles/SingleUserPageStyle.css';

export default function SingleUser() {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [transactionsList, setTransactionsList] = useState([]);
	const [amount, setAmount] = useState(0);

	const handleSubmitCredit = event => {
		event.preventDefault();
		console.log('CREDIT')
	};
	const handleSubmitDebit = event => {
		event.preventDefault();
		console.log("DEBIT")
	 }
	useEffect(() => {
		let isMounted = true; // note mutable flag

		getSingleUser(id).then(data => {
			setUser(data);
			setTransactionsList(data.transactions);
		});

		return () => {
			isMounted = false;
		};
	}, []);

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
