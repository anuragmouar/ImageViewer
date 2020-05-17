import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import profileImage from "../../assets/upgrad.svg"
import { MenuList } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import "./Header.css";

// This is custom style to override material-ui styles.
const styles = (theme => ({
    menuItems: {
        "text-decoration": "none",
        "color": "black",
        "text-decoration-underline": "none",
    },
    searchText: {
        "position": "relative",
        "width": "100%",
    },
    menuList: {
        "width": "150px",
        padding: "0px"

    }
}))

// This is header class.
class Header extends Component {
    
    constructor() {
        super();
        this.state = {
            isMenuOpen: false,
            isLoggedIn: true,
        };
    }

    // This method is called when profile button is clicked.
    openMenu = () => this.setState({
        ...this.state,
        isMenuOpen: !this.state.isMenuOpen
    })
    
    // This method is called when the profile icon is clicked.
    profileButtonClicked = (event) => {
        this.state.anchorEl ? this.setState({ anchorEl: null }) : this.setState({ anchorEl: event.currentTarget });
        this.openMenu();
    };
    
    // This method is called when text is entered into search-box.
    onSearchChangeHandler = (event) => {
        this.props.onSearchTextChange(event.target.value);
    }

    // This method is called when log-out is clicked from menu of profile-icon.
    onLogOutClicked = (event) => {
        sessionStorage.removeItem("access-token"); //Clearing access-token
        this.setState({
            isLoggedIn:false
        })  
    }

    // This method is called to redirect to login page.
    redirectToLogin = () => {
        if (!this.state.isLoggedIn) {
           return <Redirect to = "/"/>
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.redirectToLogin()}
                <header className="appHeader">
                    <a href='/home' id="appLogo">Image Viewer</a>
                    {this.props.showSearchBox ?
                        <span className="headerSearchBox">
                            <SearchIcon id="searchIcon"></SearchIcon>
                            <Input className={classes.searchText} placeholder="Search…" disableUnderline={true} onChange={this.onSearchChangeHandler} />
                        </span>
                        : <span className="headerSearchboxFalse" />
                    }
                    {this.props.showProfileIcon ?
                        <span>
                            <IconButton id="profileIcon" onClick={event => this.profileButtonClicked(event)}>
                                <img src={this.props.profile_picture} alt={profileImage} id="profilePicture" />
                            </IconButton>
                            <Menu id="profilMenu" anchorEl={this.state.anchorEl} open={this.state.isMenuOpen} onClose={this.profileButtonClicked}>
                                <MenuList className={classes.menuList}>
                                    {this.props.showMyAccount === true ?
                                    <div>
                                        <Link to={"/profile"} className={classes.menuItems} underline="none" color={"default"}>
                                            <MenuItem className={classes.menuItems} onClick={this.onMyAccountClicked} disableGutters={false}>My account</MenuItem>
                                        </Link>
                                    <div className="horizontalLine"> </div>
                                    </div>
                                    : ""
                                    }
                                    <MenuItem className="menuItems" onClick={this.onLogOutClicked}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </span>
                        : ""
                    }
                </header>
            </div>
        )
    }
}

export default withStyles(styles)(Header);