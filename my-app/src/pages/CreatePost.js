import "react-quill/dist/quill.snow.css";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [files, setFiles] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [rating, setRating] = useState(0);
	
	async function createNewPost(ev) {
		const data = new FormData();
		data.set("title", title);
		data.set("summary", summary);
		data.set("content", content);
		data.set("file", files[0]);
		data.set("rating", rating);
		ev.preventDefault();
		const response = await fetch("http://13.60.66.108:4000/post", {
			method: "POST",
			body: data,
			credentials: "include",
		});
		if (response.ok) {
			setRedirect(true);
		}
	}
	
	if (redirect) {
		return <Navigate to={"/"}/>;
	}
	return (
		<form onSubmit={createNewPost}>
			<div style={
				{
					marginTop: "5px",
					marginBottom: "5px",
					padding: "5px",
				}
			}>
				Write a Title:
			</div>
			<input
				type="title"
				placeholder={"Title"}
				value={title}
				onChange={(ev) => setTitle(ev.target.value)}
			/>
			<div style={
				{
					marginTop: "5px",
					marginBottom: "5px",
					padding: "5px",
				}
			}>
				Enter a Summary:
			</div>
			<input
				type="summary"
				placeholder={"Summary"}
				value={summary}
				onChange={(ev) => setSummary(ev.target.value)}
			/>
			<div style={
				{
					marginTop: "5px",
					marginBottom: "5px",
					padding: "5px",
				}
			}>
				Select a Cover Image:
			</div>
			<input type="file" onChange={(ev) => setFiles(ev.target.files)}/>
			{/* Input rating */}
			<div style={
				{
					marginTop: "5px",
					marginBottom: "5px",
					padding: "5px",
				}
			}>
				Enter Your Rating (1 - 5): {rating}
			</div>
			<input
				type="number"
				placeholder={"Rating"}
				max={5}
				min={0}
				value={rating}
				onChange={(ev) => setRating(parseInt(ev.target.value))}
			/>
			<Editor value={content} onChange={setContent}/>
			<button style={{marginTop: "5px"}}>Create post</button>
		</form>
	);
}
