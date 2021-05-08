import { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import SearchPage from "./search/searchPage";
import styles from "./AppBar.module.css";
import { profilePath } from "./utils/URLPath";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

import Auth from "./account/Auth";

export default function PrimarySearchAppBar() {
  const location = useLocation();
  //  hide searchBar on homepage
  const hideSearchBar = location.pathname === "/";

  const [openMenu, setOpenMenu] = useState(false);

  const handleProfileMenuOpen = () => {
    setOpenMenu(true);
  };

  return (
    <div className={styles.grow}>
      <AppBar color="default" position="static">
        <Toolbar>
          <div className={hideSearchBar ? styles.searchHide : styles.search}>
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
  const history = useHistory();

  function handleClickProfile() {
    closeMenu();
    history.push(profilePath);
  }

  const [status, text, action] = Auth();

  return (
    <Menu
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={closeMenu}
    >
      <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
      <MenuItem onClick={() => action(status)}>{text}</MenuItem>
    </Menu>
  );
};
