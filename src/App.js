import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
// import Header from './components/Header';
import NotFound from './components/NotFound';
import Sites from './features/Sites';
import User from './features/User';

import Header from './components/Header';
import Footer from './components/Footer/Footer';

function App() {

	const isHeader = useSelector(state => state.isHeader);

	return (
		<div className="App ">
			{!isHeader ? '' : <Header />}
			<Routes>
				<Route path="user/*" element={<User />} />

				<Route path="/*" element={<Sites />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
