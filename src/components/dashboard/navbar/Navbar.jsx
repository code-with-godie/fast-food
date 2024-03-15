import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import { useAppContext } from "../../../context/AppContext";
import search from '../../../assets/search.svg'
import app from '../../../assets/app.svg'
import notifications from '../../../assets/notifications.svg'
import expand from '../../../assets/expand.svg'
import settings from '../../../assets/settings.svg'
const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useAppContext();
  return (
    <div className="navbar">
      <div className="logo" onClick={()=> navigate('/')} >
        <img src="logo.svg" alt="" />
        <span>flesh Grub</span>
      </div>
      <div className="icons">
        <img src={search} alt="" className="icon" />
        <img src={app} alt="" className="icon" />
        <img src={expand} alt="" className="icon" />
        <div className="notification">
          <img src={notifications} alt="" />
          <span>0</span>
        </div>
        <div className="user">
          <img
            src={user?.profilePic}
            alt=""
          />
          <span style={{textTransform:'capitalize'}} > {user?.firstName} </span>
        </div>
        <img src={settings} alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
