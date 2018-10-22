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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchase: false,
        purchasing: false,
        loading: false
    };

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddtion = INGREDIENT_PRICES[type];
        const oldPrice  = this.state.totalPrice;
        const newPrice = oldPrice + priceAddtion;

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
        this.setState({loading:true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Leah',
                address: {
                    street: '710 W Carpenter',
                    zipCode: '12345',
                    country: 'US'
                },
                email: 'test@test.com'
            },
            deliveryMethod:'standard'
        };
        axios.post('/orders.json', order)
            .then( response => {
                    console.log(response);
                    this.setState({loading:false, purchasing:false})
            })
            .catch(err => {
                console.log(err);
                this.setState({loading:false, purchasing:false})

            });
    };

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }
        let orderSummaryEl = <OrderSummary onOrderPurchase={this.purchaseContinue}
                                           onOrderCancel={this.purchaseCancelled}
                                           ingredients={this.state.ingredients}
                                           total={this.state.totalPrice}/>;
        if(this.state.loading){
            orderSummaryEl = <Spinner/>
        }
        return(
           <Holder>
               <Modal showModal={this.state.purchasing} modalClosed={this.purchaseCancelled}>
                   {orderSummaryEl}
               </Modal>
               <Sandwich ingredients={this.state.ingredients}/>
               <BuildControls ingredientAdded={this.addIngredient}
                         purchasable={this.state.purchase} ordered={this.purchaseHandler}
                         ingredientRemoved={this.removeIngredient}
                         disabled={disableInfo} price={this.state.totalPrice}/>
           </Holder>
        );
    }
}

export default withErrorHandler(SandwichBuilder, axios);