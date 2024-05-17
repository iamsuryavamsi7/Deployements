import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserList from './components/UserList'
import NavBar from './components/NavBar'

function App() {

	return (

		<>

			<NavBar />

			<BrowserRouter>
			
				<Routes>

					<Route index element={<UserList />} />
					<Route path='/' element={<UserList />}/>

				</Routes>

			</BrowserRouter>
		
		</>

	)

}

export default App
