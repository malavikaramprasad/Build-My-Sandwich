import React from 'react';
import burgerLogo from '../../asset/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Sandwich Logo"/>
    </div>
);

export default logo;