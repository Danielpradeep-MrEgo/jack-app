import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
// import "firebase/auth";
// import "firebase/firestore";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
	const [state, dispatch] = useStateValue();

	const signIn = () => {
		auth.signInWithPopup(provider);
		// .then((result) => {
		// 	// console.log(result.user);

		// 	dispatch({
		// 		type: actionTypes.SET_USER,
		// 		user: result.user,
		// 	});
		// })
		// .catch((error) => alert(error.message));
	};
	return (
		<div className="login">
			<Button onClick={signIn}>sign</Button>
		</div>
	);
}

export default Login;
