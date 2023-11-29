import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import navigationItems from './data/navigation';
import './scss/core.scss';
import './scss/default.scss';

function App() {
  	return <>
		<Navigation />
    	<div className='app'>
      		<Routes>
			  	{navigationItems.map((item, i) => <Route key={i} path={item.path} element={item.element()} />)}
			</Routes>
    	</div>
	</>
}

export default App
