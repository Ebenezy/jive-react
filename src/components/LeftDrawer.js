import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import jivelogo from '../../src/jivelogo.svg'

const drawStyles = theme => {
  return {
    drawerPaper: {
      width: theme.drawer.width,
      backgroundColor: "#192A4B",
      color: "white",
      borderRight: "0px",
      boxShadow:
        "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px"
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.drawer.miniWidth
    },
    logo: {
      width:50,
      height:50,
      marginTop:10,
     cursor: "pointer",
      // fontSize: 22,
      // color: "white",
      // // lineHeight: "64px",
      // height:'50%',
      // width:'50%',
      // fontWeight: 300,
      backgroundColor:'#192A4B',
      paddingLeft: 40,
    },
    
    avatarRootMini: {
      padding: "15px 0 10px 10px"
    },
    avatarIcon: {
      float: "left",
      display: "block",
      boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)"
    },
    avatarSpan: {
      paddingTop: 8,
      paddingLeft: 24,
      display: "block",
      color: "white",
      fontWeight: 300,
      textShadow: "1px 1px #444"
    },
    menuItem: {
      paddingTop:15,
      color: "white",
      fontSize: 14,
      fontFamily: "Ubuntu"
    
    }
  };
};

const LeftDrawer = props => {
  let { navDrawerOpen, classes, theme, handleChangeNavDrawer } = props;

  const drawerContent = onMenuClick => (
    <div>
      <div className={classes.logo}><img alt="" src={jivelogo}></img></div>
      <div
        className={classNames(
          classes.avatarRoot,
          !navDrawerOpen && classes.avatarRootMini
        )}
      >
        {/* <Avatar
          src="https://material-ui.com/static/images/uxceo-128.jpg"
          size={navDrawerOpen ? 48 : 32}
          classes={{ root: classes.avatarIcon }}
        /> */}
        {/* <span className={classes.avatarSpan}>{}</span> */}
      </div>
      {props.menus.map((menu, index) => (
        <Link key={index} to={menu.link} onClick={onMenuClick}>
          <MenuItem key={index} classes={{ root: classes.menuItem }}>
            <ListItemIcon style={{ color: "white" }}>{menu.icon}</ListItemIcon>
            <span style={{fontFamily:"Ubuntu"}}>{menu.text}</span>
          </MenuItem>
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      {/* Mobile screen */}
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={navDrawerOpen}
          onClose={handleChangeNavDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {/* should close drawer modal as well when click on menu */}
          {drawerContent(handleChangeNavDrawer)}
        </Drawer>
      </Hidden>

      {/* Desktop screen */}
      <Hidden smDown>
        <Drawer
          open={navDrawerOpen}
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !navDrawerOpen && classes.drawerPaperClose
            )
          }}
        >
          {drawerContent()}
        </Drawer>
      </Hidden>
    </div>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
  classes: PropTypes.object,
  theme: PropTypes.object,
  handleChangeNavDrawer: PropTypes.func
};

export default withStyles(drawStyles, { withTheme: true })(LeftDrawer);
