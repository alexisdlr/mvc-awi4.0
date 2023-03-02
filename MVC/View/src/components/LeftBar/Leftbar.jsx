import "./Leftbar.scss";
import Images from "../../assets/Images";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import defaultPic from '../../assets/userPicDefault.png'

function Leftbar() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={
                currentUser.profilePic === null ? defaultPic : currentUser.profilePic
              }
              alt="user"
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Images.Friends} alt="Friends" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Images.Groups} alt="Groups" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Images.Market} alt="Market" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Images.Events} alt="Events" />
            <span>Events</span>
          </div>
         
          <div className="item">
            <img src={Images.Gallery} alt="Gallery" />
            <span>Gallery</span>
          </div>
        </div>
        <hr />
        <div className="menu">
            <span>Your shortcuts</span>
            <div className="item">
              <img src={Images.Gaming} alt="Gaming" />
              <span>Gaming</span>
            </div>
            <div className="item">
              <img src={Images.Videos} alt="Videos" />
              <span>Videos</span>
            </div>
            <div className="item">
              <img src={Images.Tutorials} alt="Tutorials" />
              <span>Tutorials</span>
            </div>
          </div>
          <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Images.Watch} alt="Watch" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Images.Fund} alt="Fund" />
            <span>Fund</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
