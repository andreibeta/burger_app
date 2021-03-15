import React from 'react';
//import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className="Logo">
            <Logo />
        </div>
        <nav className="DesktopOnly">
        <NavigationItems isAuth= {props.isAuth}/>
        </nav>
    </header>
);


export default toolbar;