import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import SearchPage from "./search/searchPage";
import styles from "./AppBar.module.css";

export default function PrimarySearchAppBar() {
  const handleProfileMenuOpen = (event) => {};

  return (
    <div className={styles.grow}>
      <AppBar position="static">
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
    </div>
  );
}
