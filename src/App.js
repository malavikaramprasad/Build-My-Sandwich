import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import SandwichBuilder from './containers/SandwichBuilder/SandwichBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Layout>
              <Switch>
                  <Route path="/checkout" component={Checkout} />
                  <Route path="/orders" component={Orders}/>
                  <Route path="/" exact component={SandwichBuilder}/>
              </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
