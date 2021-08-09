import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const UserProfileForm = () => {
	const [files, setFiles] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState(null);

	const uploadImage = evt => {
		evt.preventDefault();
		// we are about to send this to the backend.
		console.log("This are the files", files);
		let body = new FormData();
		body.append("profile_image", files[0]);

		const options = {
			body,
			method: "POST"
		};

		fetch(`${process.env.BACKEND_URL}/api/me`, options)
			.then(resp => resp.json())
			.then(data => {
				alert("Yay!!! You have a new picture :) ");
				setAvatarUrl(data.avatarUrl);
			})
			.catch(error => console.error("ERRORRRRRR!!!", error));
	};

	return (
		<div className="jumbotron">
			<form onSubmit={uploadImage}>
				{avatarUrl && <img src={rigoImageUrl} />}
				<input type="file" onChange={e => setFiles(e.target.files)} />
				<button>Upload</button>
			</form>
		</div>
	);
};

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>

			<UserProfileForm />
			<div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
					Read documentation
				</a>
			</p>
		</div>
	);
};
