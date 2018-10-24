import React from 'react';
import Sandwich from '../../Sandwich/Sandwich';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1> We hope the Sandwich tastes amazing!!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Sandwich ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutCancelled} buttonType={"Danger"} > CANCEL </Button>
            <Button clicked={props.checkoutContinued} buttonType={"Success"}> CONTINUE </Button>
        </div>
    );
};

export default checkoutSummary;