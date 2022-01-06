import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SingleUser from './components/SingleUser';
import Users from './components/Users';

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route exact path='/' element={<Users />} />
				<Route exact path='/users/:id' element={<SingleUser/>} />
			</Routes>
		</div>
	);
}

export default App;
