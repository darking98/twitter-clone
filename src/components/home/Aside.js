import React, { useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { asideItems } from "../../config/aside";
const Aside = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="aside-container">
      <div className="aside">
        <ul>
          {asideItems.map((element) => (
            <li>
              <Link to={element.href ? element.href : "#"}>
                {element.icon}
                <span>{element.text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="aside-profile">
          <div className="aside-profile-info">
            <img
              src={user && user.photoURL}
              alt=""
              height="48px"
              width="48px"
            />
            <div className="aside-profile-info-name">
              <h4>{user && user.displayName}</h4>
              <span>{`@${user && user.uid}`}</span>
            </div>
          </div>

          <div>
            <BsThreeDots />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
