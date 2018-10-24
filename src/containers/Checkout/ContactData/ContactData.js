import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
      name:'',
      email:'',
      address: {
          street:'',
          postalCode:''
      },
      loading: false
    };

    submitOrder = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Mal',
                address: {
                    street: '710 Foster Ave',
                    zipCode: '21344',
                    country: 'US'
                },
                email: 'xmss@bdhf.com'
            },
            deliveryMethod:'Standard'
        };

        axios.post('/orders.json', order)
            .then( res => {
                this.setState({loading:false});
                this.props.history.push('/')
            })
            .catch(err=> { this.setState({loading:false})})
    };

    render(){
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code"/>
            <Button buttonType="Success" clicked={this.submitOrder}> ORDER </Button>
        </form>);
        if(this.state.loading)
            form = <Spinner/>;
        return(
            <div className={classes.ContactData}>
                <h4> Enter your contact details</h4>
                {form}
            </div>
        );
    };
}


export default ContactData;