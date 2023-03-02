import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import defaultPic from "../../assets/userPicDefault.png";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  const queryClient = useQueryClient() 

  const mutation = useMutation((newPost) => {
    return makeRequest.post('/posts', newPost)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
  })

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file)
      const res = await makeRequest.post('/upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    
    setInput(e.target.value);
  };
 

  const handleClick = async (e) => {
    e.preventDefault()
    let imgUrl = '';
    if(file) imgUrl = await upload()
     mutation.mutate({desc: input, img: imgUrl})
     setInput('')
     setFile(null)

  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={
              currentUser.profilePic === null
                ? defaultPic
                : currentUser.profilePic
            }
            alt="userpic"
          />
          <input
            type="text"
            name="desc"
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={handleChange}
            value={input}
          />
          </div>
          <div className="right">
            {file && <img src={URL.createObjectURL(file)} alt='' />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="image" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="map" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="friend" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick} >Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
