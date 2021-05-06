import { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuList, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import SearchPage from "./search/searchPage";
import styles from "./AppBar.module.css";
import { profilePath } from "./utils/URLPath";
import { useHistory } from "react-router";
import { Cookies, useCookies } from "react-cookie";
import LoginButton from "./account/LoginButton";

export default function PrimarySearchAppBar() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleProfileMenuOpen = () => {
    setOpenMenu(true);
  };

  return (
    <div className={styles.grow}>
      <AppBar color="default" position="static">
        <Toolbar>
          <div className={styles.search}>
            <SearchPage />
          </div>
          <div className={styles.grow} />
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AccountMenu
        isMenuOpen={openMenu}
        closeMenu={() => {
          setOpenMenu(false);
        }}
      />
    </div>
  );
}

const AccountMenu = ({ isMenuOpen, closeMenu }) => {
  const [cookies, setCookie ,removeCookie] = useCookies(["user"])
  const history = useHistory();

  function handleClickProfile() {
    closeMenu();
    history.push(profilePath);
  }
  
  function handleClickLogout() {
    removeCookie("user", { path: "/"});
    window.location.reload();
  }

  // const menuNoLogin =   <Menu
  //                         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  //                         transformOrigin={{ vertical: "top", horizontal: "right" }}
  //                         open={isMenuOpen}
  //                         onClose={closeMenu}
  //                       > <LoginButton />
  //                       </Menu>
  // const menuLogin = <Menu
  //                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  //                     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //                     open={isMenuOpen}
  //                     onClose={closeMenu}
  //                     >
  //                       <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
  //                       <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
  //                   </Menu>

  // const dropMenu = () => cookies.user !== undefined ? menuLogin : menuNoLogin
  

  return (
    <Menu
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={closeMenu}
    >{ cookies.user !== undefined ?
      <>
      <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
      <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </>
      : <>
      <LoginButton />
      </>
      }
    </Menu>
  );
};
