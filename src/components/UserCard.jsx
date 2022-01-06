import React, { useState, useEffect } from 'react';



export default function UserCard({ user }) {
	const { name, email, balance, transactions } = user;
	const [transactionsList, setTransactionsList] = useState([]);

	useEffect(() => {
		
		// setTransactionsList(user.transactions);
		return;
	}, []);

	// console.log(transactionsList)

	return (
		<div>
			<p>{name}</p>
			<p>{email}</p>
			<p>{balance}</p>
			
		</div>
	);
}
