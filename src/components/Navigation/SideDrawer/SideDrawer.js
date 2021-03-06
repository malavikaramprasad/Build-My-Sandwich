import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Holder from '../../../hoc/Holder/Holder';

const sideDrawer = (props) =>{

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open)
        attachedClasses = [classes.SideDrawer, classes.Open];
    return(
        <Holder>
            <Backdrop showBackdrop={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Holder>
    );
};

export default sideDrawer;