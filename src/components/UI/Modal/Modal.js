import React, {Component} from 'react';
import classes from './Modal.css';
import Holder from '../../../hoc/Holder/Holder';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children;
    }

    render(){
        return(
            <Holder>
                <Backdrop clicked={this.props.modalClosed} showBackdrop={this.props.showModal}/>
                <div className={classes.Modal} style={{
                    transform:this.props.showModal ? 'translateY(0)': 'translateY(-100vh)',
                    opacity:this.props.showModal? '1':'0'}}>
                    {this.props.children}
                </div>
            </Holder>
        );
    }
}

export default Modal;