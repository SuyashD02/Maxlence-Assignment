import { useState } from "react";
import React from "react";
import Classes from "./Navbar.module.css";
import { Divider } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import logo from "../Assets/Blog.png";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const UserName = localStorage.getItem("displayName");
  const navigate = useNavigate();
  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLoginLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("displayName");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to log out: ", error.message);
      });
  };

  //   const handleOpenLogin= () => setOpenLogin(true);
  return (
    <div className={Classes.navbarEase}>
      <div className={Classes.navClickSection}>
        <div className={Classes.navContent}>
          <div className={Classes.navLogoSection}>
            <NavLink to="/dashboard">
              <img className={Classes.logoEase} src={logo} alt="logo Image" />
            </NavLink>
          </div>
          <div className={Classes.navRouteContent}>
            <div className={Classes.clickSection}>
              <Link className={Classes.linkSection} to={"/dashboard"}>
                <h3 className={Classes.clickFLIGHTSH3}>Blog</h3>
              </Link>
              <Divider orientation="vertical" style={{ height: "40%" }} />
              <Link className={Classes.linkSection} to={"/addBlog"}>
                <h3 className={Classes.clickHOTELSH3}>Add Blog</h3>
              </Link>
              <Divider orientation="vertical" style={{ height: "40%" }} />
              <Link className={Classes.linkSection} to={"/about"}>
                <h3 className={Classes.clickTRAINSH3}>About</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={Classes.navUser}>
        <div
          className={Classes.myAcount}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className={Classes.userIconNav}>
            <img
              className={Classes.iconMan}
              src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/590.jpg"
              alt="profile"
            />
          </div>
          <p className="text-[#fff] text-[18px]">{UserName}</p>
          <div className={Classes.navAcount}>
            {isDropdownOpen && (
              <div
                className={Classes.dropdownContent}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div className={Classes.accountBox}>
                  <Link to={`/profile/${UserName}`}>
                  <div className="mt-[20px]">
                  <div className={Classes.userIconNav}>
                    <img
                      className={Classes.iconMan}
                      src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/590.jpg"
                      alt="profile"
                    />
                  </div>
                  <div className={Classes.loginBtnSection}>{UserName}</div>
                  </div>
                  </Link>
                  <Divider className={Classes.dividerLogin} />
                  <div className={Classes.dropMyBookings}>
                    <ListItemButton onClick={handleLoginLogout}>
                      <p className={Classes.bookingP}>Log Out</p>
                    </ListItemButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
