import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false)
  const [rating, setRating] = useState(0);
  
  
  useEffect(() => {
    fetch("http://ec2-13-60-66-108.eu-north-1.compute.amazonaws.com:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setRating(postInfo.rating);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    data.set("rating", rating);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://ec2-13-60-66-108.eu-north-1.compute.amazonaws.com:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
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
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
