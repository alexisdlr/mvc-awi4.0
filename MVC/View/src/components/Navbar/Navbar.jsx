import "./Navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import defaultPic from "../../assets/userPicDefault.png";
import { makeRequest } from "../../axios";
import SearchResults from "./SearchResults";

function Navbar() {
  const { toggle, darkMode } = useContext(DarkModeContext);

  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    makeRequest
      .get("/search?name=" + input)
      .then((res) => setResults(res.data));
    setSearchOpen(true);
    setInput("");
  };

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>BirdFace</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <DarkModeOutlinedIcon
            onClick={toggle}
            style={{ cursor: "pointer" }}
          />
        )}

        <GridViewOutlinedIcon />
        <div className="search">
          <input
            type="text"
            name="seach"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search..."
          />
          {searchOpen && <SearchResults results={results} />}
          <SearchOutlinedIcon onClick={handleClick} />
        </div>
      </div>
      <div className="right">
        <Person2OutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <Link
          to={"/profile/" + currentUser.id}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className="user">
            <img
              src={
                currentUser.profilePic === null
                  ? defaultPic
                  : currentUser.profilePic
              }
              alt="user"
            />
            <span>{currentUser.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
