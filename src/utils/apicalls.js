import axios from 'axios';

const transactionApi = axios.create({
	baseURL: 'https://transactionsexample.herokuapp.com/api'
	
});

export const getUsers = () => {
	return transactionApi.get('users').then(res => {
		return res.data;
	});
};

export const getSingleUser = id => {
	return transactionApi.get(`users/${id}`).then(res => {
		
		const user = res.data;
		
		return user;
	});
};

export const creditUser = (id, amount) => {
    return transactionApi.post(`users/${id}`, { type: 'credit', amount: amount }).then(res => {
        return res.data;
    });
};

export const debitUser = (id, amount) => {
	return transactionApi
		.post(`users/${id}`, { type: 'debit', amount: amount })
		.then(res => {
			
			return res.data;
		});
};