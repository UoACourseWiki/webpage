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

  // Account Menu
  const [anchorEl, setAnchorEl] = useState(null);

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
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AccountMenu
        anchorEl={anchorEl}
        close={() => {
          setAnchorEl(null);
        }}
      />
    </div>
  );
}

const AccountMenu = ({ anchorEl, close }) => {
  const history = useHistory();

  function handleClickProfile() {
    close();
    history.push(profilePath);
  }

  const [status, text, action] = Auth();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={close}
    >
      <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
      <MenuItem onClick={() => action(status)}>{text}</MenuItem>
    </Menu>
  );
};
