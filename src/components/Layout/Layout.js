import React, {Component} from 'react';
import Holder from '../../hoc/Holder';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state ={
        showSideDrawer: true
    };

    sideDrawerClosed = () => {
        this.setState({showSideDrawer:false})
    };

    drawerToggleClickedHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    };

    render(){
        return(
            <Holder>
                <Toolbar drawerToggleClicked={this.drawerToggleClickedHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosed}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Holder>
        )
    }
}

export default Layout;