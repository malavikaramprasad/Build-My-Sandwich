import React from 'react';
import classes from './Modal.css';
import Holder from '../../../hoc/Holder';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Holder>
        <Backdrop clicked={props.modalClosed} showBackdrop={props.showModal}/>
        <div className={classes.Modal} style={{
            transform:props.showModal ? 'translateY(0)': 'translateY(-100vh)',
            opacity:props.showModal? '1':'0'}}>
            {props.children}
        </div>
    </Holder>
);

export default modal;