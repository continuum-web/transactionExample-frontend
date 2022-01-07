import axios from 'axios';

const transactionApi = axios.create({
	baseURL: 'http://localhost:9000/api/',
});


export const getUsers = () => {
    return transactionApi.get('users').then((res) => {
        return res.data
    })
}

export const getSingleUser = (id) => {
    return transactionApi.get(`users/${id}`).then(res => {
        const user = res.data
        // { user: name, email, balance, transactions } = res.data
		return user
	});
};

