import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Icon, withTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    color: "white",
  }
}));

const Nav = ({history}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(isMobile)
  };

  const handleMenuClick = (pageUrl) => {
    history.push(pageUrl);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Vottron Classroom
          </Typography>
            <div className="navLinks">
              {isMobile ? (
              <>
              <IconButton 
                edge="start" 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuClick('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/schedule')}>Schedule</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/courses')}>Courses</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/students')}>Students</MenuItem>
              </Menu>
              </>)
              : (
                <>
                <ButtonGroup>
                  <Button className={classes.navLink} variant="text" onClick={() => history.push('/')}>Home</Button>
                  <Button className={classes.navLink} variant="text" onClick={() => history.push('/schedule')}>Schedule</Button>
                  <Button className={classes.navLink} variant="text" onClick={() => history.push('/courses')}>Classes</Button>
                  <Button className={classes.navLink} variant="text" onClick={() => history.push('/students')}>Students</Button>
                </ButtonGroup>
                </>
              )}
            
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Nav);
