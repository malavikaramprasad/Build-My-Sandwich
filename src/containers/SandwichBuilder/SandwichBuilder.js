import React, {Component} from 'react';
import Holder from '../../hoc/Holder/Holder';
import Sandwich from '../../components/Sandwich/Sandwich'
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.7,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.8
    };

class SandwichBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 5,
        purchase: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        axios.get("https://build-my-sandwich.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error =>{
                this.setState({error:true});
            });
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice  = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchase(updatedIngredients);
    };

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0)
            return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction =  INGREDIENT_PRICES[type];
        const oldPrice  = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchase(updatedIngredients);
    };

    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
                .map(igKey => {
                    return ingredients[igKey]
                }).reduce((sum, el) => {
                    return sum + el;
            }, 0);
        this.setState({purchase: sum>0});
    };

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    };

    purchaseCancelled = () => {
        this.setState({purchasing:false})
    };

    purchaseContinue = () => {
        //alert('Continue');
        //
        const queryParam = [];
        for(let i in this.state.ingredients){
            queryParam.push(encodeURI(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParam.push('price='+ this.state.totalPrice);
        const queryString = queryParam.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?' + queryString
        });
    };

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }
        let orderSummaryEl = null;
        if(this.state.ingredients) {
            orderSummaryEl = <OrderSummary onOrderPurchase={this.purchaseContinue}
                                           onOrderCancel={this.purchaseCancelled}
                                           ingredients={this.state.ingredients}
                                           total={this.state.totalPrice}/>;
        }

        let sandwich = this.state.error? <p> Ingredients can't be loaded </p> : <Spinner/>;
        if(this.state.ingredients) {
            sandwich = (<Holder>
                <Sandwich ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredient}
                               purchasable={this.state.purchase} ordered={this.purchaseHandler}
                               ingredientRemoved={this.removeIngredient}
                               disabled={disableInfo} price={this.state.totalPrice}/>
            </Holder>);
        }
        if(this.state.loading){
            orderSummaryEl = <Spinner/>
        }

        return(
           <Holder>
               <Modal showModal={this.state.purchasing} modalClosed={this.purchaseCancelled}>
                   {orderSummaryEl}
               </Modal>
               {sandwich}
           </Holder>
        );
    }
}

export default withErrorHandler(SandwichBuilder, axios);