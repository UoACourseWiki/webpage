import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Avatar,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

import SearchPage from "./search/searchPage";
import styles from "./AppBar.module.css";
import { profilePath } from "./utils/URLPath";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

import Auth from "./account/Auth";

export default function PrimarySearchAppBar() {
  //  hide searchBar on homepage
  const location = useLocation();
  const hideSearchBar = location.pathname === "/";

  const history = useHistory();

  // Account Menu
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div className={styles.grow}>
      <AppBar color="default" position="static">
        <Toolbar>
          <Link href="/">
            <Avatar
              alt="CourseWiki"
              src="/topbarLogo.png"
              className={styles.avatar}
            />
          </Link>
          <Typography
            className={styles.title}
            variant="h6"
            color={"textPrimary"}
            noWrap
          >
            CourseWiki
          </Typography>
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
              color="action"
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
