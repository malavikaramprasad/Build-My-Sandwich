import React from 'react';
import Holder from '../../../hoc/Holder';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}> <span style={{textTransform:'capitalize'}}> {igKey} </span> : {props.ingredients[igKey]}</li>
    });
    return (
        <Holder>
            <h3> Your Order </h3>
            <p> A delicious Sandwich with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> <strong> Total Price: {props.total.toFixed(2)} </strong></p>
            <p> Continue to Checkout?</p>
            <Button buttonType={'Danger'} clicked={props.onOrderCancel}> CANCEL </Button>
            <Button buttonType={'Success'} clicked={props.onOrderPurchase}> CONTINUE </Button>
        </Holder>
    )
};

export default orderSummary;

