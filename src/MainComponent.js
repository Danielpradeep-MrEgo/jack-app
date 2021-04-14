import React, { useEffect, useState } from "react";
import "./MainComponent.css";
import logo from "./logo.png";
import logos from "./logos.png";
import logof from "./logof.png";
import { Button } from "@material-ui/core";
import Middle from "./Middle";
import { db } from "./firebase";
// import { useParams } from "react-router-dom";

function MainComponent() {
	const [lists, setLists] = useState([]);

	useEffect(() => {
		db.collection("uploads")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) =>
				setLists(snapshot.docs.map((doc) => doc.data()))
			);
	}, []);

	console.log(lists);
	return (
		<div className="mainComponent">
			<div className="mainComponent__image">
				<img src={logo} />
				{/* <h4>Creative studio</h4> */}
			</div>
			<div className="mainComponent__middle">
				<img src={logos} />

				<Middle />
			</div>

			{lists.map((list) => (
				<p>
					{/* <iframe>{list.video}</iframe> */}
					{/* <iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/tBTfHoxFa9o"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe> */}
					{/* <video src={list.video} type="video/mp4" /> */}
					<img src={list.imageUrl} />
					<h4>{list.name}</h4>
				</p>
			))}
		</div>
	);
}

export default MainComponent;
