import "./App.css";
import Header from "./Header";
import Login from "./Login";
import { BrowserRouter as Route, Router, Switch } from "react-router-dom";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { initialState } from "./reducer";
import MainComponent from "./MainComponent";
import Left from "./Left";
import Right from "./Right";

function App() {
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch({
					type: actionTypes.SET_USER,
					user: auth.user,
				});
			} else {
				dispatch({ user: initialState });
			}
		});
	}, []);
	const user = auth.currentUser;
	console.log(user);
	return (
		// <Router>
		// {/* <Switch> */}
		<div className="app">
			{!user ? (
				<Login />
			) : (
				// <Route path="/" exact>
				<div className="app">
					<Header />
					<div className="app__main">
						<Left />
						<MainComponent />
						<Right />
					</div>
				</div>
				// </Route>
			)}
		</div>
		// {/* </Switch> */}
		// </Router>
	);
}

export default App;
