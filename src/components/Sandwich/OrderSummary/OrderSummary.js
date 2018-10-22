import React, {Component} from 'react';
import Holder from '../../../hoc/Holder/Holder';
import Button from '../../UI/Button/Button';

class OrderSummary  extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span
                    style={{textTransform: 'capitalize'}}> {igKey} </span> : {this.props.ingredients[igKey]}</li>
            });
        return (
            <Holder>
                <h3> Your Order </h3>
                <p> A delicious Sandwich with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong> Total Price: {this.props.total.toFixed(2)} </strong></p>
                <p> Continue to Checkout?</p>
                <Button buttonType={'Danger'} clicked={this.props.onOrderCancel}> CANCEL </Button>
                <Button buttonType={'Success'} clicked={this.props.onOrderPurchase}> CONTINUE </Button>
            </Holder>
        );
    }
}

export default OrderSummary;

