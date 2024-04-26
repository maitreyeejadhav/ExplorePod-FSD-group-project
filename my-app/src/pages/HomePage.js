import Post from "../Post";
import { useEffect, useState } from "react";
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://ec2-13-60-66-108.eu-north-1.compute.amazonaws.com:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
