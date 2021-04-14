import { Avatar, Button } from "@material-ui/core";
import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function Header() {
	const user = auth.currentUser;
	const [{}, dispatch] = useStateValue();
	const signOut = () => {
		auth.signOut();
		window.location.reload(false);
	};

	return (
		<div className="header">
			<Avatar src={user.photoURL} style={{ cursor: "pointer" }} />
			<h4>Home</h4>
			<div className="header__search">
				<SearchIcon />
				<input type="text" placeholder="search" />
			</div>
			<Button
				style={{
					backgroundColor: "#28b5b5",
					textTransform: "inherit",
					height: "30px",
				}}
				onClick={signOut}
			>
				sign Out
			</Button>
		</div>
	);
}

export default Header;
