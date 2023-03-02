import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import defaultPic from "../../assets/userPicDefault.png";
import moment from "moment";
import { makeRequest } from "../../axios";

import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
function Post({ post }) {
  const [commentsOpen, setCommentsOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });
  const queryClient = useQueryClient() 

  const mutation = useMutation((liked) => {
    console.log(liked)
    if (liked) return makeRequest.delete('/likes?postId=' + post.id)
    return makeRequest.post('/likes', {postId: post.id})
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likes'])
    },
  })


  const likePost = () => {
    mutation.mutate(data.includes(currentUser.id))
  }
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={post.profilePic === null ? defaultPic : post.profilePic}
              alt="user"
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./uploads/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" >
            {isLoading ? (
              ""
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{ color: "red" }}  onClick={likePost} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={likePost} />
            )}
            {isLoading ? "" : data.length} likes
          </div>
          <div className="item" onClick={() => setCommentsOpen(!commentsOpen)}>
            <TextsmsOutlinedIcon />
            Comment
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentsOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}

export default Post;
