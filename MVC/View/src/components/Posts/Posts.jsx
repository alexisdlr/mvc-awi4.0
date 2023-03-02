import Post from "../Post/Post";
import "./Posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

function Posts({userId}) {
  console.log(userId)
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
        makeRequest.get(userId === undefined ? '/posts' :"/posts?userId=" + userId).then((res) => {
        return res.data;
      }),
  })
  return (
    <div className="posts">
      {error
        ? "something went wrong"
        : isLoading
        ? "loading"
        : data.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default Posts;
