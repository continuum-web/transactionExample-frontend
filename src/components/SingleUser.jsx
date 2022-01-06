import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleUser } from '../utils/apicalls';
import '../styles/TableStyle.css';

export default function SingleUser() {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [transactionsList, setTransactionsList] = useState([]);

	useEffect(() => {
		let isMounted = true; // note mutable flag

		getSingleUser(id).then(data => {
			console.log(data);
			setUser(data);
			setTransactionsList(data.transactions);
		});

		return () => {
			isMounted = false;
		};
	}, []);
	//amount: 50
	// balance: 1272;
	// id: 'f7439e50-fb2e-4810-91d2-9846d78e302a';
	// type: 'credit';
	console.log(transactionsList);
	return (
		<div>
			<p>Name: {user.name}</p>
			<p>Email: {user.email}</p>
			<p>balance: {user.balance}</p>
			<h4>Transactions</h4>
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
						console.log(transaction.id);
						return (
							<tr key={transaction.id}>
								<td>{transaction.id}</td>
								<td>{transaction.amount}</td>
								<td>{transaction.balance}</td>
								<td>{transaction.type}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
